import React, { useEffect, useState } from "react";

function App() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtisans() {
      try {
        const response = await fetch("http://localhost:3001/artisans");
        if (!response.ok) {
          throw new Error("Réponse serveur non valide");
        }
        const data = await response.json();
        console.log("✅ Données reçues depuis l'API :", data);
        setArtisans(data);
      } catch (err) {
        console.error("❌ Erreur API :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArtisans();
  }, []);

  if (loading) {
    return <p>Chargement des artisans...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Liste des artisans</h1>

      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        <ul>
          {artisans.map((artisan) => (
            <li key={artisan.id_artisan}>
              <strong>{artisan.nom}</strong> — {artisan.specialite} (
              {artisan.categorie}) — {artisan.localisation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
