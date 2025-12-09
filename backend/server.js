// ===============================
// Import des dépendances principales
// ===============================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// ===============================
// Chargement des variables d'environnement (.env)
// ===============================

// On force dotenv à utiliser le fichier .env situé dans le dossier backend
// Force dotenv to use the .env file in the backend folder
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

// Petit log de debug pour vérifier que MONGO_URI est bien lue
// Small debug log to check that MONGO_URI is loaded
console.log("DEBUG MONGO_URI =", process.env.MONGO_URI);

// ===============================
// Initialisation de l'application
// ===============================

const app = express();

app.use(
  cors({
    origin: "*", // CORS ouvert (ok pour un projet pédagogique)
  })
);

app.use(express.json());

// Port dynamique (Render / Railway) ou 3001 en local
const PORT = process.env.PORT || 3001;

// ===============================
// Connexion à MongoDB Atlas
// ===============================

// On récupère l'URI MongoDB depuis les variables d'environnement
const MONGO_URI = process.env.MONGO_URI;

// Sécurité : on vérifie que MONGO_URI existe bien
if (!MONGO_URI) {
  console.error("❌ MONGO_URI non définie dans les variables d'environnement");
  process.exit(1);
}

// Connexion à MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err);
    process.exit(1);
  });

// ===============================
// Schéma et modèle Artisan
// ===============================

const artisanSchema = new mongoose.Schema({
  nom: String,
  specialite: String,
  categorie: String,
  localisation: String,
  note: Number,
  description: String,
  email_contact: String,
  site_web: String,
  top: {
    type: Boolean,
    default: false,
  },
});

const Artisan = mongoose.model("Artisan", artisanSchema);

// ===============================
// Routes API
// ===============================

// Route de test
app.get("/", (req, res) => {
  res.send("✅ API TROUVE TON ARTISAN - Backend opérationnel");
});

// Liste des artisans (avec filtres optionnels)
app.get("/api/artisans", async (req, res) => {
  try {
    const { categorie, localisation } = req.query;
    const filtre = {};

    if (categorie) filtre.categorie = categorie;
    if (localisation) filtre.localisation = localisation;

    const artisans = await Artisan.find(filtre);
    res.json(artisans);
  } catch (err) {
    console.error("Erreur GET /api/artisans :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Détail d'un artisan
app.get("/api/artisans/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (err) {
    console.error("Erreur GET /api/artisans/:id :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Création d’un artisan (optionnel)
app.post("/api/artisans", async (req, res) => {
  try {
    const artisan = new Artisan(req.body);
    await artisan.save();
    res.status(201).json(artisan);
  } catch (err) {
    console.error("Erreur POST /api/artisans :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Simulation formulaire de contact
app.post("/api/contact", (req, res) => {
  console.log("📩 Nouveau contact :", req.body);
  res.json({
    message: "Message reçu avec succès (simulation côté serveur).",
  });
});

// ===============================
// Lancement du serveur
// ===============================

app.listen(PORT, () => {
  console.log(`🚀 Backend lancé sur le port ${PORT}`);
});
