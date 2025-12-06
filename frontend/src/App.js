import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    // Appel à ton backend
    fetch("http://localhost:3001/artisans")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des artisans");
        }
        return response.json();
      })
      .then((data) => {
        setArtisans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger les artisans");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="App">
        <p>Chargement des artisans...</p>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="App">
        <p>{erreur}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>TROUVE TON ARTISAN</h1>
        <p>Liste des artisans (test de connexion API)</p>
      </header>

      <main>
        {artisans.length === 0 ? (
          <p>Aucun artisan trouvé.</p>
        ) : (
          <ul className="artisan-list">
            {artisans.map((artisan) => (
              <li key={artisan.id_artisan} className="artisan-card">
                <h2>{artisan.nom}</h2>
                <p>
                  <strong>Catégorie :</strong> {artisan.categorie} <br />
                  <strong>Spécialité :</strong> {artisan.specialite}
                </p>
                <p>
                  <strong>Localisation :</strong> {artisan.localisation}
                </p>
                {artisan.note && (
                  <p>
                    <strong>Note :</strong> {artisan.note} / 5
                  </p>
                )}
                {artisan.site_web && (
                  <p>
                    <a
                      href={artisan.site_web}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voir le site web
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
