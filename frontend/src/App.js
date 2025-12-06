import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";

/* ========= COMPOSANT PRINCIPAL ========= */

function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artisans" element={<ArtisanListPage />} />
            <Route path="/artisan/:id" element={<ArtisanDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <SiteFooter />
      </div>
    </Router>
  );
}

/* ========= HEADER ========= */

function SiteHeader() {
  return (
    <header className="bg-light border-bottom mb-4">
      <nav className="navbar navbar-expand container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          Trouve ton artisan
        </Link>
        <div className="ms-auto d-flex gap-3">
          <Link className="nav-link" to="/">
            Accueil
          </Link>
          <Link className="nav-link" to="/artisans">
            Artisans
          </Link>
        </div>
      </nav>
    </header>
  );
}

/* ========= FOOTER ========= */

function SiteFooter() {
  return (
    <footer className="bg-light border-top mt-4 py-3">
      <div className="container text-center small text-muted">
        TROUVE_TON_ARTISAN – Projet de devoir
      </div>
    </footer>
  );
}

/* ========= PAGE ACCUEIL (simple pour l’instant) ========= */

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="mb-3">Bienvenue sur TROUVE TON ARTISAN</h1>
      <p className="lead">
        Cette application permet de consulter des artisans classés par catégorie
        et spécialité.
      </p>
      <p>
        Pour l’instant, vous pouvez déjà voir la liste complète des artisans en
        cliquant sur le menu <strong>Artisans</strong>.
      </p>
      <Link className="btn btn-primary mt-3" to="/artisans">
        Voir la liste des artisans
      </Link>
    </div>
  );
}

/* ========= PAGE LISTE DES ARTISANS ========= */

function ArtisanListPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
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
    return <p>Chargement des artisans...</p>;
  }

  if (erreur) {
    return <p>{erreur}</p>;
  }

  return (
    <div>
      <h1 className="mb-3">Trouve ton artisan</h1>
      <p className="mb-4 text-muted">
        Liste des artisans (connexion API opérationnelle)
      </p>

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
              <div className="d-flex flex-column gap-1">
                {artisan.site_web && (
                  <a
                    href={artisan.site_web}
                    target="_blank"
                    rel="noreferrer"
                    className="link-primary"
                  >
                    Voir le site web
                  </a>
                )}
                <Link
                  to={`/artisan/${artisan.id_artisan}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Voir la fiche
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ========= PAGE FICHE ARTISAN (placeholder) ========= */

function ArtisanDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Fiche artisan n°{id}</h1>
      <p>
        Ici on affichera toutes les informations détaillées de l’artisan, ainsi
        que le formulaire de contact (on le fera dans les prochaines étapes).
      </p>
      <Link to="/artisans" className="btn btn-secondary mt-3">
        ⬅ Retour à la liste
      </Link>
    </div>
  );
}

/* ========= PAGE 404 ========= */

function NotFoundPage() {
  return (
    <div className="text-center">
      <h1>404</h1>
      <p>Page introuvable.</p>
      <Link to="/" className="btn btn-primary">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default App;
