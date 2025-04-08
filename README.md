# API du Système de Tickets

## Description
Ce projet est une API RESTful pour un système de gestion de tickets qui permet aux utilisateurs de soumettre des demandes d'assistance (tickets) et de suivre leur statut. L'API prend en charge trois types d'utilisateurs : utilisateurs réguliers, techniciens et administrateurs, chacun ayant des permissions différentes.

## Fonctionnalités
- Inscription et authentification des utilisateurs
- Création, récupération, mise à jour et suppression de tickets
- Contrôle d'accès basé sur les rôles pour les utilisateurs, techniciens et administrateurs
- Validation des données avec express-validator
- Stockage sécurisé des mots de passe avec bcrypt
- Authentification sécurisée avec JWT pour l'accès à l'API

## Technologies Utilisées
- Node.js
- Express.js
- SQLite3 (via Knex.js)
- JWT (JSON Web Tokens)
- bcrypt pour le hachage des mots de passe
- express-validator pour la validation des entrées

## Structure du Projet
```
ticket-system-api
├── src
│   ├── controllers          # Controllers for handling requests
│   ├── middlewares          # Middleware for authentication and validation
│   ├── models               # Database models
│   ├── routes               # API routes
│   ├── services             # Business logic
│   ├── utils                # Utility functions
│   └── app.js               # Main application file
├── database
│   └── migrations           # Database migration scripts
├── tests                    # HTTP request tests
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # NPM package configuration
├── knexfile.js              # Knex configuration
├── README.md                # Project documentation
└── server.js                # Server entry point
```

## Instructions de Configuration
1. Clonez le dépôt :
   ```
   git clone <repository-url>
   cd ticket-system-api
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Créez un fichier `.env` dans le répertoire racine et ajoutez vos variables d'environnement :
   ```
   DATABASE_URL=sqlite://path_to_your_database.db
   JWT_SECRET=your_jwt_secret
   ```

4. Exécutez les migrations de base de données pour configurer la base de données :
   ```
   npx knex migrate:latest --knexfile knexfile.js
   ```

5. Démarrez le serveur :
   ```
   node server.js
   ```

## Utilisation de l'API
Référez-vous au fichier `tests/request.http` pour des exemples d'interaction avec les points de terminaison de l'API.

## Licence
Ce projet est sous licence MIT.