CODE CHALLENGE PLATFORM


Comment fonctionne l’application

Une fois inscrit, l’utilisateur peut parcourir une liste de défis techniques, chacun ayant un niveau de difficulté.
Il peut ensuite soumettre ses solutions et accumuler des points en fonction de ses réussites.

Toutes les informations sont sauvegardées afin de permettre un suivi de progression et un classement entre utilisateurs.

L’objectif principal est d’encourager la pratique régulière et l’amélioration continue des compétences en développement.

Technologies utilisées

Le projet repose sur des outils modernes et largement utilisés :

Interface utilisateur développée avec React

Serveur construit autour d’une API REST

Authentification sécurisée

Base de données relationnelle pour stocker les informations

Ces choix techniques permettent d’obtenir une application stable, évolutive et proche des standards du développement web actuel.

Mise en place du projet
Prérequis

Pour faire fonctionner l’application en local, il est nécessaire d’avoir :

Node.js installé sur la machine

React pour la partie frontend

Un gestionnaire de paquets comme npm ou yarn

Un serveur SQL opérationnel (ex. MariaDB)

Un environnement de développement adapté

Installation

Le projet se compose de deux parties : le backend et le frontend.

Backend

Récupérer le code source du backend :

git clone <URL_DU_PROJET_BACKEND>
cd backend


Installer les dépendances :

npm install
ou avec yarn
yarn install


Créer une base de données MariaDB pour l’application.

Configurer les paramètres de connexion dans les variables d’environnement (.env) :
Exemple :

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=code_challenge


Lancer le serveur backend :

npm start
npm run dev

Frontend

Récupérer le code source du frontend :

git clone <URL_DU_PROJET_FRONTEND>
cd frontend


Installer les dépendances :

npm install
yarn install


Lancer l’application frontend :

npm start
yarn start


L’application sera accessible par défaut à l’adresse :

http://localhost:5173

Pistes d’amélioration

Cette première version pose des bases solides, mais de nombreuses évolutions sont possibles :

Exécuter automatiquement le code soumis

Prendre en charge d’autres langages de programmation

Ajouter des tests et validations plus avancées

Améliorer l’interface graphique
