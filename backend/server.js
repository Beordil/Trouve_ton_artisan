const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trouve_ton_artisan",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur MySQL :", err);
  } else {
    console.log("✅ Connecté à la base MySQL");
  }
});

// ✅ ROUTE ARTISANS
app.get("/artisans", (req, res) => {
  const sql = `
    SELECT artisan.*, specialite.nom AS specialite, categorie.nom AS categorie
    FROM artisan
    JOIN specialite ON artisan.id_specialite = specialite.id_specialite
    JOIN categorie ON specialite.id_categorie = categorie.id_categorie
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ erreur: "Erreur serveur" });
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => {
  console.log("✅ Serveur lancé sur http://localhost:3001");
});
