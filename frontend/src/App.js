import { useEffect, useState } from "react";

function App() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/artisans")
      .then((res) => res.json())
      .then((data) => setArtisans(data))
      .catch((err) => console.error("Erreur API", err));
  }, []);

  return (
    <div>
      <h1>Liste des artisans</h1>
      <ul>
        {artisans.map((artisan) => (
          <li key={artisan.id_artisan}>
            <strong>{artisan.nom}</strong> — {artisan.specialite} ({artisan.categorie}) — {artisan.localisation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
