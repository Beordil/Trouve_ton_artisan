// 1) On importe les outils
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

// 2) On crée le serveur
const app = express();

// 3) On autorise le frontend à parler au backend
app.use(cors());

// 4) On autorise le JSON
app.use(express.json());

// 5) Connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        
  password: "",       
  database: "trouve_ton_artisan"
});

// 6) Test de la connexion à la base
db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion à la base :", err);
  } else {
    console.log("✅ Connecté à la base MySQL !");
  }
});

// 7) Route de test
app.get("/", (req, res) => {
  res.send("✅ Serveur Trouve Ton Artisan en ligne !");
});

// 8) Démarrer le serveur
const PORT = 3001;
app.listen(PORT, () => {
  console.log("✅ Serveur démarré sur le port " + PORT);
});
app.get("/", (req, res) => {
  res.send("✅ Serveur Trouve Ton Artisan en ligne !");
});
// 9) Route pour récupérer tous les artisans
app.get("/artisans", (req, res) => {
  const sql = `
    SELECT 
      a.id_artisan,
      a.nom,
      a.note,
      a.localisation,
      a.email_contact,
      a.site_web,
      a.description,
      a.image_url,
      s.nom AS specialite,
      c.nom AS categorie
    FROM artisan a
    JOIN specialite s ON a.id_specialite = s.id_specialite
    JOIN categorie c ON s.id_categorie = c.id_categorie;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la récupération des artisans :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    // On renvoie la liste des artisans au format JSON
    res.json(results);
  });
});
