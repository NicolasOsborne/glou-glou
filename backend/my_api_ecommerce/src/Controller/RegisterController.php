<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegisterController extends AbstractController
{

    #[Route('/api/register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
    {
        // Decode the JSON request content
        $data = json_decode($request->getContent(), true);

        // Validate required fields
        if (empty($data['email']) || empty($data['password']) || empty($data['nomUser'])) {
            return $this->json([
                'error' => 'Les champs email, mot de passe, et nom sont obligatoires.',
            ], Response::HTTP_BAD_REQUEST);
        }

        // Extract the data
        $email = $data['email'];
        $password = $data['password'];
        $name = $data['nomUser'];
        $role = $data['role'] ?? 'ROLE_CLIENT'; // Default to CLIENT if not specified

        // Create a new User entity
        $user = new User();
        $user->setEmail($email);
        $user->setNomUser($name);
        $user->setRoles([$role]);
        $user->setPassword($passwordHasher->hashPassword($user, $password));

        // Persist the user to the database
        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'User registered successfully'], Response::HTTP_CREATED);
    }
}
