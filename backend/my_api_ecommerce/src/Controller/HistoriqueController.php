<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;
use Symfony\Component\HttpFoundation\JsonResponse;

class HistoriqueController extends AbstractController
{
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    
    #[Route('/api/historique', methods: ['GET'])]
    
    public function afficherHistoriqueCommandes(): JsonResponse
    {
        try {
            // Exécution de la procédure stockée
            $stmt = $this->connection->executeQuery('CALL afficher_historique_commandes()');
            $result = $stmt->fetchAllAssociative();
           
            return new JsonResponse($result);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/top-products', methods: ['GET'])]
    public function getTopProducts(): JsonResponse
    {
        try {
            // Exécution de la procédure stockée
            $stmt = $this->connection->executeQuery('CALL get_top_products()');
            $result = $stmt->fetchAllAssociative();
        
            return new JsonResponse($result);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/total-product-sold/{productId}', methods: ['GET'])]
    public function getTotalProductSold(int $productId): JsonResponse
    {
        try {
            // Exécution de la procédure stockée
            $stmt = $this->connection->executeQuery('CALL calculer_total_produit(:productId)', [
                'productId' => $productId,
            ]);
            $result = $stmt->fetchAssociative();
            
            // Return the total quantity if found, or 0 if not
            return new JsonResponse([
                'total_quantity' => $result['total_quantity'] ?? 0,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }
}
