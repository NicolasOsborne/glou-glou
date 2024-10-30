<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use App\Repository\ProduitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CategorieController extends AbstractController
{
    #[Route('/api/category/create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        $nom = $data['nameCategory'] ?? null;
        $description = $data['descriptionCategory'] ?? null;

        // Vérifier que les données requises sont bien présentes
        if (empty($nom) || empty($description)) {
            return $this->json([
                'error' => 'Les champs nom et description sont obligatoires.'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Créer et persister la nouvelle catégorie
        $categorie = new Categorie();
        $categorie->setNameCategory($nom);
        $categorie->setDescriptionCategory($description);
        $categorie->setActive(1);

        $em->persist($categorie);
        $em->flush();

        // Retourner la catégorie créée avec un code HTTP 201
        return $this->json($categorie, Response::HTTP_CREATED);
    }


    #[Route('/api/category', methods: ['GET'])]
    public function index(CategorieRepository $categorieRepository): Response
    {
        // Récupérer toutes les catégories
        $categories = $categorieRepository->findAll();

        // Si tu as besoin de sérialiser manuellement pour éviter des problèmes de circularité
        $data = [];
        foreach ($categories as $categorie) {
            $data[] = [
                'id' => $categorie->getId(),
                'nameCategory' => $categorie->getNameCategory(),
                'descriptionCategory' => $categorie->getDescriptionCategory(),
            ];
        }

        // Retourner les données sous forme de JSON
        return $this->json($data);
    }

    #[Route('/api/category/update/{id}', methods: ['PUT'])]
    public function update(Request $request, EntityManagerInterface $em, CategorieRepository $categorieRepository, int $id): Response
    {
        // Récupérer la catégorie depuis la base de données par son id
        $categorie = $categorieRepository->find($id);

        // Vérifier si la catégorie existe
        if (!$categorie) {
            return $this->json([
                'error' => 'Catégorie non trouvée.'
            ], Response::HTTP_NOT_FOUND);
        }


        // Récupérer les nouvelles valeurs du formulaire
        $data = json_decode($request->getContent(), true);
        $nom = $data['nameCategory'] ?? null;
        $description = $data['descriptionCategory'] ?? null;


        // Vérifier que les données ne sont pas vides
        if (empty($nom) || empty($description)) {
            return $this->json([
                'error' => 'Les champs nom et description sont obligatoires.'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Mettre à jour les valeurs de la catégorie
        $categorie->setNameCategory($nom);
        $categorie->setDescriptionCategory($description);
        $categorie->setActive(1);

        // Sauvegarder les modifications dans la base de données
        $em->flush();

        // Retourner la catégorie mise à jour
        return $this->json($categorie);
    }


    #[Route('/api/category/delete/{id}', methods: ['DELETE'])]
    public function delete(int $id, CategorieRepository $categorieRepository, ProduitRepository $produitRepository, EntityManagerInterface $em): Response
    {
        // Récupérer la catégorie depuis la base de données par son id
        $categorie = $categorieRepository->find($id);

        // Vérifier si la catégorie existe
        if (!$categorie) {
            return $this->json([
                'error' => 'Catégorie non trouvée.'
            ], Response::HTTP_NOT_FOUND);
        }

        // Vérifier si des produits sont associés à cette catégorie
        $produits = $produitRepository->findBy(['categorie' => $categorie]);

        if (!empty($produits)) {
            return $this->json([
                'error' => 'Cette catégorie est rattachée à des produits. Impossible de la supprimer.'
            ], Response::HTTP_CONFLICT); // 409 Conflict
        }

        // Supprimer la catégorie
        $categorie->setActive(0);
        // $em->remove($categorie); // Optionnel si vous souhaitez conserver les données
        $em->flush();

        // Retourner une réponse HTTP 204 No Content
        return $this->json("Bien supprimé la categorie");
    }





}
