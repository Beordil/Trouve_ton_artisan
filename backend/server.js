const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// Port (prend la variable d'environnement si elle existe, sinon 3001)
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "trouve_ton_artisan",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur MySQL :", err.message);
    process.exit(1); // on arrête le serveur si la BDD ne répond pas
  } else {
    console.log("✅ Connecté à la base MySQL");
  }
});

// ✅ Route de test (pour vérifier que l’API répond)
app.get("/", (req, res) => {
  res.send("API TROUVE_TON_ARTISAN OK");
});

// ✅ 1) Toutes les catégories
app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categorie";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur /categories :", err);
      return res.status(500).json({ erreur: "Erreur serveur" });
    }
    res.json(results);
  });
});

// ✅ 2) Tous les artisans (avec spécialité + catégorie)
app.get("/artisans", (req, res) => {
  const sql = `
    SELECT 
      artisan.id_artisan,
      artisan.nom,
      artisan.note,
      artisan.localisation,
      artisan.email_contact,
      artisan.site_web,
      artisan.description,
      artisan.image_url,
      specialite.nom AS specialite,
      categorie.nom AS categorie
    FROM artisan
    JOIN specialite ON artisan.id_specialite = specialite.id_specialite
    JOIN categorie ON specialite.id_categorie = categorie.id_categorie
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur /artisans :", err);
      return res.status(500).json({ erreur: "Erreur serveur" });
    }
    res.json(results);
  });
});

// ✅ 3) Artisans par catégorie (ex: /artisans/categorie/Alimentation)
app.get("/artisans/categorie/:categorie", (req, res) => {
  const categorie = req.params.categorie;

  const sql = `
    SELECT 
      artisan.id_artisan,
      artisan.nom,
      artisan.note,
      artisan.localisation,
      artisan.email_contact,
      artisan.site_web,
      artisan.description,
      artisan.image_url,
      specialite.nom AS specialite,
      categorie.nom AS categorie
    FROM artisan
    JOIN specialite ON artisan.id_specialite = specialite.id_specialite
    JOIN categorie ON specialite.id_categorie = categorie.id_categorie
    WHERE categorie.nom = ?
  `;

  db.query(sql, [categorie], (err, results) => {
    if (err) {
      console.error("❌ Erreur /artisans/categorie :", err);
      return res.status(500).json({ erreur: "Erreur serveur" });
    }
    res.json(results);
  });
});

// ✅ 4) Détail d’un artisan (ex: /artisans/1)
app.get("/artisans/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT 
      artisan.id_artisan,
      artisan.nom,
      artisan.note,
      artisan.localisation,
      artisan.email_contact,
      artisan.site_web,
      artisan.description,
      artisan.image_url,
      specialite.nom AS specialite,
      categorie.nom AS categorie
    FROM artisan
    JOIN specialite ON artisan.id_specialite = specialite.id_specialite
    JOIN categorie ON specialite.id_categorie = categorie.id_categorie
    WHERE artisan.id_artisan = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur /artisans/:id :", err);
      return res.status(500).json({ erreur: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ erreur: "Artisan non trouvé" });
    }

    res.json(results[0]);
  });
});

// ✅ 5) Formulaire de contact (POST /contact)
app.post("/contact", (req, res) => {
  const { nom, email, objet, message, id_artisan } = req.body;

  if (!id_artisan || !message) {
    return res.status(400).json({ erreur: "Champs manquants" });
  }

  const sql = `
    INSERT INTO message_contact (nom, email, objet, message, id_artisan)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nom, email, objet, message, id_artisan], (err) => {
    if (err) {
      console.error("❌ Erreur /contact :", err);
      return res.status(500).json({ erreur: "Erreur serveur" });
    }
    res.json({ message: "✅ Message envoyé" });
  });
});

// 🚀 Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
