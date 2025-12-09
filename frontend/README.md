# 🛠️ TROUVE TON ARTISAN

## 🇫🇷 Présentation du projet

**TROUVE TON ARTISAN** est une application web permettant de rechercher et contacter des artisans locaux, classés par catégorie (bâtiment, services, alimentation, fabrication).

Le projet repose sur une architecture **full-stack** moderne :
- **Frontend** : React
- **Backend** : Node.js / Express
- **Base de données** : MongoDB Atlas

Les données sont chargées automatiquement depuis un fichier CSV et exploitées via une API REST.

---

## 🇬🇧 Project overview

**TROUVE TON ARTISAN** is a web application designed to help users find and contact local artisans, categorized by activity (construction, services, food, manufacturing).

The project is built with a modern **full-stack** architecture:
- **Frontend**: React
- **Backend**: Node.js / Express
- **Database**: MongoDB Atlas

Data is automatically imported from a CSV file and exposed through a REST API.

---

## 🧱 Architecture du projet

TROUVE_TON_ARTISAN
│
├── backend
│ ├── server.js # API Express + MongoDB
│ ├── import_artisans.js # Script d'import CSV → MongoDB
│ ├── artisan_import.csv # Données artisans
│ ├── .env # Variables d’environnement
│ └── package.json
│
├── frontend
│ ├── public # Fichiers publics
│ ├── src
│ │ ├── assets # Images et polices (Graphik)
│ │ ├── pages # Pages React
│ │ ├── App.js # Routage et logique principale
│ │ └── App.css # Styles globaux
│ └── package.json
│
└── README.md


---

## ⚙️ Technologies utilisées

### Frontend
- React (CRA)
- React Router
- CSS responsive (Flexbox / Grid)
- Police locale **Graphik** (via `@font-face`)

### Backend
- Node.js
- Express
- Mongoose
- MongoDB Atlas
- CORS
- Dotenv

---

## 📦 Import des données

Les artisans sont importés automatiquement depuis un fichier CSV via le script :

```bash
node import_artisans.js

Ce script :

    lit le fichier CSV

    transforme les données

    vide la collection existante

    insère les nouveaux artisans dans MongoDB

🔌 API – Principales routes
Méthode	Route	Description
GET	/api/artisans	Liste tous les artisans
GET	/api/artisans?categorie=	Filtrage par catégorie
GET	/api/artisans/:id	Détails d’un artisan
POST	/api/contact	Simulation formulaire de contact
🎨 Design & UX

    Interface inspirée d’une maquette Figma

    Police Graphik intégrée localement

    Design responsive (desktop / tablette / mobile)

    Parcours utilisateur simple en 3 étapes :

        Choix de la catégorie

        Sélection d’un artisan

        Consultation / contact

🚀 Lancer le projet en local
Prérequis

    Node.js ≥ 18

    NPM

    Compte MongoDB Atlas

Backend

cd backend
npm install
node server.js

Frontend

cd frontend
npm install
npm start

Application accessible sur :
http://localhost:3000
🔐 Variables d’environnement

Un fichier .env est nécessaire dans le dossier backend :

MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/trouve_ton_artisan

✅ Fonctionnalités principales

    Affichage des artisans par catégorie

    Fiche artisan détaillée

    Carte de localisation (Google Maps)

    Formulaire de contact simulé

    Gestion des erreurs (404, chargement, API)

🎓 Objectifs pédagogiques

Ce projet permet de valider les compétences suivantes :

    Architecture client / serveur

    Consommation d’API REST

    Gestion d’une base de données NoSQL

    Intégration d’une maquette graphique

    Responsive design

    Organisation d’un projet full-stack

    Documentation technique

👤 Delbart Julien - Beordil

Projet réalisé dans un cadre pédagogique.
📄 Licence

Projet à usage pédagogique uniquement.