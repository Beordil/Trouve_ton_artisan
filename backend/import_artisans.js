// ===============================
// Import des modules nécessaires
// ===============================

// fs : permet de lire des fichiers depuis le système
// fs: allows reading files from the file system
const fs = require("fs");

// path : aide à construire des chemins compatibles tous OS
// path: helps build file paths that work on all operating systems
const path = require("path");

// csv-parser : transforme un fichier CSV en objets JavaScript
// csv-parser: converts a CSV file into JavaScript objects
const csv = require("csv-parser");

// mongoose : permet la connexion et l'interaction avec MongoDB
// mongoose: used to connect to and interact with MongoDB
const mongoose = require("mongoose");

// =====================================================
// URI de connexion MongoDB Atlas
// Doit être identique à celle utilisée dans server.js
// =====================================================
const MONGO_URI =
  "mongodb+srv://artisanUser:linkinpark02@cluster0.snrudpm.mongodb.net/trouve_ton_artisan?retryWrites=true&w=majority&appName=Cluster0";

// =======================
// Connexion à MongoDB
// =======================
// Establish connection to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas (import)"))
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err);
    process.exit(1); // arrêt du script en cas d'erreur critique
  });

// ===============================
// Définition du schéma Artisan
// ===============================
// Artisan schema definition
const artisanSchema = new mongoose.Schema({
  nom: String,            // Nom de l'entreprise ou de l'artisan
  specialite: String,     // Spécialité principale
  categorie: String,      // Catégorie d'artisanat
  localisation: String,   // Ville ou zone géographique
  note: Number,           // Note moyenne (0 à 5)
  description: String,    // Présentation de l'artisan
  email_contact: String,  // Email de contact
  site_web: String,       // Site internet
  top: {                  // Artisan mis en avant
    type: Boolean,
    default: false,
  },
});

// Création du modèle MongoDB
// MongoDB model creation
const Artisan = mongoose.model("Artisan", artisanSchema);

// =======================
// Lecture du fichier CSV
// =======================

// Chemin vers le fichier CSV à importer
// Path to the CSV file to import
const csvFilePath = path.join(__dirname, "artisan_import.csv");

// Tableau temporaire pour stocker les artisans
// Temporary array to store parsed artisans
const artisans = [];

// Lecture du CSV ligne par ligne
// Read CSV file row by row
fs.createReadStream(csvFilePath)
  .pipe(csv({ separator: "," }))

  // Traitement de chaque ligne du CSV
  // Process each CSV row
  .on("data", (row) => {
    // Conversion de la note (ex: "4,5" → 4.5)
    // Convert rating from string to number
    const rawNote = (row["Note"] || "").toString().replace(",", ".");
    const note = rawNote ? parseFloat(rawNote) : undefined;

    // Conversion du champ "Top" en booléen
    // Convert "Top" column to boolean
    const rawTop = (row["Top"] || "").toString().trim().toLowerCase();
    const top =
      rawTop === "true" ||
      rawTop === "1" ||
      rawTop === "oui" ||
      rawTop === "yes";

    // Création de l'objet artisan
    // Create artisan object from CSV row
    artisans.push({
      nom: row["Nom"] || "",
      specialite: row["Spécialité"] || "",
      categorie: row["Catégorie"] || "",
      localisation: row["Ville"] || "",
      note,
      description: row["A propos"] || "",
      email_contact: row["Email"] || "",
      site_web: row["Site Web"] || "",
      top,
    });
  })

  // Fin de lecture du CSV
  // CSV reading finished
  .on("end", async () => {
    console.log(`📄 CSV lu : ${artisans.length} lignes trouvées`);

    try {
      // Nettoyage de la collection avant import
      // Clear collection before importing (avoid duplicates)
      await Artisan.deleteMany({});
      console.log("🧹 Collection 'artisans' vidée");

      // Insertion de tous les artisans en une seule fois
      // Insert all artisans at once
      await Artisan.insertMany(artisans);
      console.log(`✅ ${artisans.length} artisans importés avec succès !`);
    } catch (err) {
      console.error("❌ Erreur pendant l'import :", err);
    } finally {
      // Fermeture propre de la connexion MongoDB
      // Properly close MongoDB connection
      await mongoose.connection.close();
      console.log("🔌 Connexion MongoDB fermée");
      process.exit(0);
    }
  })

  // Gestion des erreurs de lecture du CSV
  // Handle CSV reading errors
  .on("error", (err) => {
    console.error("❌ Erreur de lecture du CSV :", err);
  });
