# API E-Commerce Glou & Glou - Symfony

Bienvenue dans l'API E-commerce construite avec Symfony. Cette API permet de gérer un système de vente avec des fonctionnalités telles que la gestion des produits, des utilisateurs, des commandes, et plus encore.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- PHP >= 8.0
- [Composer](https://getcomposer.org/download/) version 2.7.9
- Symfony CLI version 5.10.2
- MySQL
- Git (optionnel mais recommandé)

## Installation

### 1. Cloner le dépôt

Clonez ce dépôt dans votre environnement local.

```bash
git clone https://github.com/votre-nom-utilisateur/my_api_ecommerce.git
cd my_api_ecommerce
```

### 2. Dépendances

Vérifiez que les dépendances sont bien installées, vous pouvez les installer en lançant les commandes suivantes :

```bash
- composer require api
- composer require symfony/security-bundle
- composer require lexik/jwt-authentication-bundle
- composer require symfony/orm-pack
- composer require symfony/maker-bundle
- composer require doctrine/doctrine-migrations-bundle
```

### 3. Créer la base de données

Vérifiez dans le fichier .env que vous avez bien remplacé votre identifiant et mot de passe phpMyAdmin, puis lancez la commande suivante pour créer la base de données :

```bash
- php bin/console doctrine:database:create
```

### 4. Lancer les migrations

Lancez les migrations des entités vers la base de données avec ces commandes :

```bash
- php bin/console doctrine:schema:update --force
```

ou

```bash
- php bin/console make:migration
- php bin/console doctrine:migrations:migrate
```

Enfin, démarrez le serveur local :

```bash
- symfony server:start
```
