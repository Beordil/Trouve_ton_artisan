import React, { useEffect, useState } from "react";

function App() {
  // 1) On prépare des "états" pour gérer les données, le chargement et les erreurs
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2) useEffect = ce code se lance UNE FOIS au chargement de la page
  useEffect(() => {
    // On appelle notre API backend
    fetch("http://localhost:3001/artisans")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des artisans");
        }
        return response.json();
      })
      .then((data) => {
        // On stocke les artisans dans le state
        setArtisans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // [] = on exécute ce code une seule fois au chargement

  // 3) Affichage si ça charge encore
  if (loading) {
    return <p>Chargement des artisans...</p>;
  }

  // 4) Affichage si erreur
  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // 5) Affichage normal si tout va bien
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
