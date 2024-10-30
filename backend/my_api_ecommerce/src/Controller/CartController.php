<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\CartItem;
use App\Entity\Historique;
use App\Repository\ProduitRepository;
use App\Repository\CartRepository;
use App\Repository\HistoriqueRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CartController extends AbstractController
{
    #[Route('/api/cart/add/{id}', methods: ['POST'])]
    public function addToCart(int $id, ProduitRepository $produitRepository, EntityManagerInterface $em): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Utilisateur par authentifié.'], Response::HTTP_UNAUTHORIZED);
        }

        $produit = $produitRepository->find($id);

        if (!$produit) {
            return $this->json(['error' => 'Le produit n\'est pas trouvé  .'], Response::HTTP_NOT_FOUND);
        }

        // Vérifier la disponibilité du produit
        if ($produit->getQuantiteProduit() <= 0) {
            return $this->json(['error' => 'Ce produit est en rupture de stock.'], Response::HTTP_BAD_REQUEST);
        }

        // Vérifier la disponibilité du produit
        if ($produit->getActiveProduit() == 0) {
            return $this->json(['error' => 'Ce produit n\'est plus en vente.'], Response::HTTP_BAD_REQUEST);
        }

        // Find or create the user's cart
        $cart = $em->getRepository(Cart::class)->findOneBy(['user' => $user]) ?? new Cart();
        $cart->setUser($user);
        $cart->setStatutCommande( "En cours");
        $cart->setCreatedAt(new \DateTime());

        // Create or update cart item
        $cartItem = new CartItem();
        $cartItem->setProduit($produit);
        $cartItem->setQuantity(1); // Default quantity is 1
        $cart->addCartItem($cartItem);

        $em->persist($cart);
        $em->persist($cartItem);
        $em->flush();

        return $this->json(['message' => 'Le produit ajouté au panier.'], Response::HTTP_CREATED);
    }


    #[Route('/api/cart/validate', methods: ['POST'])]
    public function validateOrder(EntityManagerInterface $em, HistoriqueRepository $historique): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'User not authenticated.'], Response::HTTP_UNAUTHORIZED);
        }

        $cart = $em->getRepository(Cart::class)->findOneBy(['user' => $user]);

        if (!$cart) {
            return $this->json(['error' => 'Cart not found.'], Response::HTTP_NOT_FOUND);
        }

        foreach ($cart->getCartItems() as $cartItem) {
        $produit = $cartItem->getProduit();
        $produit->setQuantiteProduit($produit->getQuantiteProduit() - $cartItem->getQuantity());

        // Create a new instance of Historique for each cart item
        $historique = new Historique();
        $historique->setCartItemId($cartItem->getId());
        $historique->setCartId($cart->getId());
        $historique->setProduitId($produit->getId());
        $historique->setQuantity($cartItem->getQuantity());

        // Persist the historique entity
        $em->persist($historique);

        // Remove the cart item
        $em->remove($cartItem);
    }

        $cart->setStatutCommande("Valide");
        $cart->setCreatedAt(new \DateTime());
      
      //  $em->remove($cart); // Clear the cart
        $em->flush();

        return $this->json(['message' => 'Commande valide et suppression du panier.'], Response::HTTP_OK);
    }


    #[Route('/api/cart', methods: ['GET'])]
    public function getCart(EntityManagerInterface $em): Response
    {
        $user = $this->getUser ();

        if (!$user) {
            return $this->json(['error' => 'User  not authenticated.'], Response::HTTP_UNAUTHORIZED);
        }

        $cart = $em->getRepository(Cart::class)->findOneBy(['user' => $user]);

        if (!$cart) {
            return $this->json(['cartItems' => []], Response::HTTP_OK);
        }

        $cartItems = [];
        foreach ($cart->getCartItems() as $cartItem) {
            $produit = $cartItem->getProduit();
            $cartItems[] = [
                'id' => $cartItem->getId(),
                'produit' => [
                    'id' => $produit->getId(),
                    'nom' => $produit->getNameProduit(),
                    'prix' => $produit->getPrice(),
                    'image' => $produit->getImageProduit(),
                    'categorie' => [
                        'id' => $produit->getCategorie()?->getId(),
                        'nameCategory' => $produit->getCategorie()?->getNameCategory(),
                ],
                ],
                'quantity' => $cartItem->getQuantity(),
            ];
        }

        return $this->json(['cartItems' => $cartItems], Response::HTTP_OK);
    }



    #[Route('/api/history', methods: ['GET'])]
    public function history(CartRepository $cartRepository): Response
    {
        // Récupérer toutes les historiques
        $historiques = $cartRepository->findAll();

        // Si tu as besoin de sérialiser manuellement pour éviter des problèmes de circularité
        $data = [];
        // foreach ($historiques as $historique) {
        //     $data[] = [
        //         'id' => $historique->getId(),
        //         'user' => $historique->getUser(),
        //         'cartItems' => $historique->getCartItems(),
        //         'StatutCommande' => $historique->getStatutCommande(),
        //         'DateCommande' => $historique->getCreatedAt(),
        //     ];
        // }
        foreach ($historiques as $historique) {
            $user = $historique->getUser ();
            $data[] = [
                'id' => $historique->getId(),
                'user' => $user ? ['id' => $user->getId(), 'nomUser' => $user->getNomUser()] : null,
                'cartItems' => array_map(fn($item) => [
                    'id' => $item->getId(),
                    'produit' => $item->getProduit()->getId(),
                    'quantity' => $item->getQuantity(),
                ], $historique->getCartItems()->toArray()),
                'StatutCommande' => $historique->getStatutCommande(),
                'DateCommande' => $historique->getCreatedAt(),
            ];
        }

        // Retourner les données sous forme de JSON
        return $this->json($data);
    }

}