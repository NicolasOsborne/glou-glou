<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class LoginController extends AbstractController
{
    #[Route('/api/login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // Get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // Last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
        $user = $this->getUser();

        // Vérifier si l'utilisateur est authentifié
        if ($this->getUser()) {
            return $this->json([
                'message' => 'Connexion réussie.',
                'username' => $this->getUser()->getUsername(),// Récupérer le nom d'utilisateur de l'utilisateur authentifié
            ], Response::HTTP_OK);
        }

        return $this->json([
            'last_username' => $lastUsername,
            'error' => $error ? 'Nom d\'utilisateur ou mot de passe incorrect.' : null,  // Message d'erreur plus générique
        ], $error ? Response::HTTP_UNAUTHORIZED : Response::HTTP_OK);
    }
}
