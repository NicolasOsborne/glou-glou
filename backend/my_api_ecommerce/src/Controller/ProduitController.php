<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Entity\Produit;
use App\Repository\ProduitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProduitController extends AbstractController
{

    public function __construct()
    {
        // Chemin vers le dossier d'upload
        $this->uploadDir = 'uploads/images';
    }

    #[Route('/api/produit/create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        // Récupérer les données du formulaire


        $data = json_decode($request->getContent(), true);

       // dump($request->getContent());  // For JSON body
        //dump((float) $data['price']);  // For form-data
        //dump($request->files->get('imageProduit'));  // Check if file is uploaded

        $nom = $request->request->get('nameProduit');
        $description = $request->request->get('descriptionProduit');
        $prix = (float) $request->request->get('price');
        $imageFile = $request->files->get('imageProduit');
        $categorieId = (int) $request->request->get('categorie');
        $quantite = (int) $request->request->get('quantiteProduit');

    // Debugging: Dump values
    dump($nom, $description, $prix, $imageFile, $categorieId, $quantite);


        // $nom = $data['nameProduit'] ?? null;
        // $description = $data['descriptionProduit'] ?? null;
        // $prix = (float) $data['price'] ?? null;
        // $imageFile = $request->files->get('imageProduit') ?? null;
        // $categorieId = (int) $data['categorie'] ?? null;
        // $quantite = (int) $data['quantiteProduit'] ?? null;


        // Vérifier que toutes les données requises sont présentes
        if (empty($nom)|| empty($quantite) || empty($prix)  || empty($categorieId) || empty($description)) {
            return $this->json([
                'error' => 'Les champs nom, prix, image et categorie sont obligatoires.',
                'nom' => $nom,
                'description' => $description,
                'prix' => $prix,
                'imageFile' => $imageFile,
                'categorieId' => $categorieId


            ], Response::HTTP_BAD_REQUEST);
        }

        // Récupérer la catégorie
        $categorie = $em->getRepository(Categorie::class)->find($categorieId);

        // Vérifier si la catégorie existe
        if (!$categorie) {
            return $this->json([
                'error' => 'Catégorie non trouvée.'
            ], Response::HTTP_NOT_FOUND);
        }

        // Gérer l'upload de l'image
        $imagePath = $this->uploadImage($imageFile);

        // Créer et remplir l'objet Produit
        $produit = new Produit();
        $produit->setNameProduit($nom);
        $produit->setPrice($prix);
        $produit->setImageProduit($imagePath);
        $produit->setCategorie($categorie);
        $produit->setQuantiteProduit($quantite);
        $produit->setActiveProduit(1);
        $produit->setDescriptionProduit($description);
        $produit->setCreatedAt(new \DateTime());

        // Persister et sauvegarder en base de données
        $em->persist($produit);
        $em->flush();

        // Retourner une réponse avec le produit créé
        return $this->json($produit, Response::HTTP_CREATED);
    }

    // Méthode pour gérer l'upload de l'image
    private function uploadImage(UploadedFile $imageFile): string
    {
        $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
        $newFilename = uniqid() . '-' . $originalFilename . '.' . $imageFile->guessExtension();

        try {
            // Déplace le fichier vers le répertoire d'upload
            $imageFile->move($this->uploadDir, $newFilename);
        } catch (FileException $e) {
            // Gérer les erreurs d'upload (log, message, etc.)
            throw new \RuntimeException('Erreur lors de l\'upload de l\'image.');
        }

        return $this->uploadDir . '/' . $newFilename; // Retourner le chemin de l'image
    }


    #[Route('/api/produits', methods: ['GET'])]
    public function index(ProduitRepository $produitRepository): Response
    {
        // Récupérer tous les produits
        $produits = $produitRepository->findAll(['activeProduit' => 1]);

        // Sérialiser les données pour éviter les problèmes de circularité
        $data = [];
        foreach ($produits as $produit) {
            $data[] = [
                'id' => $produit->getId(),
                'nom' => $produit->getNameProduit(),
                'prix' => $produit->getPrice(),
                'quantite' => $produit->getQuantiteProduit(),
                'image' => $produit->getImageProduit(),
                "description" => $produit->getDescriptionProduit(),
                'categorie' => [
                    'id' => $produit->getCategorie()?->getId(),
                    'nameCategory' => $produit->getCategorie()?->getNameCategory(),
                ],
            ];
        }

        // Retourner les données sous forme de JSON
        return $this->json($data);
    }


    #[Route('/api/produit/update/{id}', methods: ['PUT'])]
    public function update(Request $request, ProduitRepository $produitRepository, EntityManagerInterface $em, int $id): Response
    {
        $produit = $produitRepository->find($id);

        // Vérifier si le produit existe
        if (!$produit) {
            return $this->json(['error' => 'Produit non trouvé.'], Response::HTTP_NOT_FOUND);
        }

        // Récupérer les données du formulaire
        // $data = json_decode($request->getContent(), true);
        // $nom = $data['nameProduit'] ?? null;
        // $description = $data['descriptionProduit'] ?? null;
        // $prix = $data['price'];
        // $quantite = $data['quantiteProduit'];
        // $categorieId = $data['categorie'];

        $nom = $request->request->get('nameProduit');
        $description = $request->request->get('descriptionProduit');
        $prix = (float)$request->request->get('price');
        $quantite = (int)$request->request->get('quantiteProduit');
        $categorieId = (int)$request->request->get('categorie');

        // Vérifier que toutes les données nécessaires sont présentes
        if (empty($nom) || empty($quantite) || empty($prix) || empty($categorieId) || empty($description)) {
            return $this->json([
                'error' => 'Les champs nom, prix, categorie et description sont obligatoires.'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Mettre à jour les propriétés du produit
        $produit->setNameProduit($nom);
        $produit->setPrice($prix);
        $produit->setDescriptionProduit($description);
        $produit->setQuantiteProduit($quantite);
        // Vérifier et mettre à jour la catégorie
        $categorie = $em->getRepository(Categorie::class)->find($categorieId);
        if (!$categorie) {
            return $this->json([
                'error' => 'Catégorie non trouvée.'
            ], Response::HTTP_NOT_FOUND);
        }
        $produit->setCategorie($categorie);

        // Gérer l'upload de l'image si le fichier a été fourni
        $imageFile = $request->files->get('imageProduit');
        if ($imageFile) {
            $imagePath = $this->uploadImage($imageFile);
            $produit->setImageProduit($imagePath);
        }

        // Persist et flush les changements
        $em->flush();

        // Retourner le produit mis à jour sous forme de JSON
        return $this->json($produit, Response::HTTP_OK);
    }



    #[Route('/api/produit/delete/{id}', methods: ['DELETE'])]
    public function delete(int $id, ProduitRepository $produitRepository, EntityManagerInterface $em): Response
    {
        // Récupérer la catégorie depuis la base de données par son id
        $produit = $produitRepository->find($id);
        if (!$produit) {
            return $this->json(['error' => 'Produit non trouvé.'], Response::HTTP_NOT_FOUND);
        }

        // Vérifier si la catégorie existe
        if (!$produit) {
            return $this->json([
                'error' => 'Produit non trouvée.'
            ], Response::HTTP_NOT_FOUND);
        }

        // Supprimer le produit
        $produit->setActiveProduit(0);
        // $em->remove($produit);
        $em->flush();

        // Retourner une réponse HTTP 204 No Content
        return $this->json("Bien supprimé le produit");
    }



    #[Route('/api/produits/filter', methods: ['GET'])]
    public function filter(Request $request, ProduitRepository $produitRepository): Response
    {
        // Récupérer les paramètres de filtrage
        $categorieId = $request->query->get('categorie');
        $prixMin = $request->query->get('prix_min');
        $prixMax = $request->query->get('prix_max');
        $nouveautes = $request->query->get('nouveautes'); // true or false
        $search = $request->query->get('search'); // mot-clé

        // Récupérer tous les produits
        $produits = $produitRepository->findAll();

        // Filtrage des produits
        if ($categorieId) {
            $produits = array_filter($produits, function($produit) use ($categorieId) {
                return $produit->getCategorie() && $produit->getCategorie()->getId() == $categorieId;
            });
        }

        if ($prixMin !== null) {
            $produits = array_filter($produits, function($produit) use ($prixMin) {
                return $produit->getPrice() >= $prixMin;
            });
        }

        if ($prixMax !== null) {
            $produits = array_filter($produits, function($produit) use ($prixMax) {
                return $produit->getPrice() <= $prixMax;
            });
        }

        if ($nouveautes) {
            $dateThreshold = new \DateTime('-30 days');
            $produits = array_filter($produits, function($produit) use ($dateThreshold) {
                return $produit->getCreatedAt() >= $dateThreshold;
            });
        }

        if ($search) {
            $produits = array_filter($produits, function($produit) use ($search) {
                return stripos($produit->getNameProduit(), $search) !== false ||
                    stripos($produit->getDescriptionProduit(), $search) !== false;
            });
        }

        // Sérialiser les données pour éviter les problèmes de circularité
        $data = [];
        foreach ($produits as $produit) {
            $data[] = [
                'id' => $produit->getId(),
                'nom' => $produit->getNameProduit(),
                'prix' => $produit->getPrice(),
                'quantite' => $produit->getQuantiteProduit(),
                'image' => $produit->getImageProduit(),
                'description' => $produit->getDescriptionProduit(),
                'categorie' => [
                    'id' => $produit->getCategorie()?->getId(),
                    'nameCategory' => $produit->getCategorie()?->getNameCategory(),
                ],
            ];
        }

        // Retourner les données filtrées sous forme de JSON
        return $this->json($data);
    }


}
