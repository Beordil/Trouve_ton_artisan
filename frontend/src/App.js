import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";

/* ========= CONFIG DES CATEGORIES ========= */

const CATEGORY_CONFIG = {
  alimentation: {
    label: "Alimentation",
    description: "Boulanger, boucher, chocolatier, traiteur...",
  },
  batiment: {
    label: "Bâtiment",
    description: "Plombier, électricien, menuisier, chauffagiste...",
  },
  fabrication: {
    label: "Fabrication",
    description: "Ferronnier, bijoutier, couturier...",
  },
  services: {
    label: "Services",
    description: "Coiffeur, toiletteur, fleuriste, webdesigner...",
  },
};

/* ========= FONCTION UTILITAIRE : ETOILES ========= */

function renderStars(note) {
  if (note === null || note === undefined) return null;
  const max = 5;
  const rounded = Math.round(Number(note));

  return (
    <span className="stars" aria-label={`Note ${note} sur 5`}>
      {Array.from({ length: max }, (_, index) => (
        <span key={index}>{index < rounded ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

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
            <Route path="/categorie/:slug" element={<CategoryPage />} />

            {/* Pages légales */}
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route
              path="/donnees-personnelles"
              element={<DonneesPersonnelles />}
            />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/accessibilite" element={<Accessibilite />} />

            {/* 404 */}
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
    <footer className="bg-light border-top mt-5 py-3">
      <div className="container text-center small text-muted">
        <div className="mb-2">
          <Link to="/mentions-legales" className="me-3">
            Mentions légales
          </Link>
          <Link to="/donnees-personnelles" className="me-3">
            Données personnelles
          </Link>
          <Link to="/cookies" className="me-3">
            Cookies
          </Link>
          <Link to="/accessibilite">Accessibilité</Link>
        </div>
        <div>TROUVE_TON_ARTISAN – Projet de devoir</div>
      </div>
    </footer>
  );
}

/* ========= PAGE ACCUEIL ========= */

function HomePage() {
  const [featuredArtisans, setFeaturedArtisans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/artisans")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des artisans");
        }
        return response.json();
      })
      .then((data) => {
        const featuredNames = [
          "Ernest Carignan",
          "Au pain chaud",
          "C'est sup'hair",
        ];

        let selected = data.filter((a) => featuredNames.includes(a.nom));

        if (selected.length === 0) {
          selected = data.slice(0, 3);
        }

        setFeaturedArtisans(selected);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero text-center mb-5">
        <h1 className="hero-title mb-3">Bienvenue sur TROUVE TON ARTISAN</h1>
        <p className="hero-subtitle">
          Trouvez facilement un artisan près de chez vous, classé par catégorie
          et spécialité.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Link className="btn btn-primary" to="/artisans">
            Voir tous les artisans
          </Link>
        </div>
      </section>

      {/* Étapes */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Comment trouver mon artisan ?</h2>
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="step-card h-100">
              <div className="step-number">1</div>
              <h3 className="step-title">Choisissez une catégorie</h3>
              <p className="step-text">
                Alimentation, Bâtiment, Fabrication ou Services selon votre
                besoin.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="step-card h-100">
              <div className="step-number">2</div>
              <h3 className="step-title">Sélectionnez une spécialité</h3>
              <p className="step-text">
                Boulanger, plombier, coiffeur… Filtrez les artisans par métier.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="step-card h-100">
              <div className="step-number">3</div>
              <h3 className="step-title">Choisissez un artisan</h3>
              <p className="step-text">
                Consultez sa fiche, sa note, sa localisation et ses
                informations.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="step-card h-100">
              <div className="step-number">4</div>
              <h3 className="step-title">Contactez-le</h3>
              <p className="step-text">
                Envoyez un message grâce au formulaire de contact de la fiche
                artisan. Une réponse vous sera apportée sous 48h.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artisans du mois */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Les artisans du mois</h2>
        {featuredArtisans.length === 0 ? (
          <p className="text-center text-muted">
            Les artisans du mois ne sont pas disponibles pour le moment.
          </p>
        ) : (
          <div className="row g-3">
            {featuredArtisans.map((artisan) => (
              <div key={artisan.id_artisan} className="col-12 col-md-4">
                <div className="artisan-card h-100">
                  <h3 className="mb-2">{artisan.nom}</h3>
                  <p>
                    <strong>Note :</strong> {artisan.note} / 5{" "}
                    {renderStars(artisan.note)}
                  </p>
                  <p>
                    <strong>Spécialité :</strong> {artisan.specialite}
                    <br />
                    <strong>Localisation :</strong> {artisan.localisation}
                  </p>
                  <Link
                    to={`/artisan/${artisan.id_artisan}`}
                    className="btn btn-sm btn-outline-primary mt-2"
                  >
                    Voir la fiche
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Catégories */}
      <section>
        <h2 className="text-center mb-4">Les catégories d’artisans</h2>
        <div className="row g-3">
          {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
            <div key={slug} className="col-12 col-md-6 col-lg-3">
              <Link to={`/categorie/${slug}`} className="category-card h-100">
                <h3 className="category-title">{cat.label}</h3>
                <p className="category-text">{cat.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
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
                  <strong>Note :</strong> {artisan.note} / 5{" "}
                  {renderStars(artisan.note)}
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

/* ========= PAGE CATEGORIE ========= */

function CategoryPage() {
  const { slug } = useParams();
  const config = CATEGORY_CONFIG[slug?.toLowerCase()];
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!config) {
      setErreur("Catégorie inconnue");
      setLoading(false);
      return;
    }

    const nomCategorie = config.label;

    fetch(
      `http://localhost:3001/artisans/categorie/${encodeURIComponent(
        nomCategorie
      )}`
    )
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
  }, [slug, config]);

  if (loading) {
    return <p>Chargement des artisans...</p>;
  }

  if (!config) {
    return (
      <div>
        <h1>Catégorie inconnue</h1>
        <p>La catégorie demandée n’existe pas.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  if (erreur) {
    return <p>{erreur}</p>;
  }

  return (
    <div>
      <h1 className="mb-3">Catégorie : {config.label}</h1>
      <p className="mb-4 text-muted">
        Artisans de la catégorie {config.label.toLowerCase()}.
      </p>

      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé dans cette catégorie.</p>
      ) : (
        <ul className="artisan-list">
          {artisans.map((artisan) => (
            <li key={artisan.id_artisan} className="artisan-card">
              <h2>{artisan.nom}</h2>
              <p>
                <strong>Spécialité :</strong> {artisan.specialite}
              </p>
              <p>
                <strong>Localisation :</strong> {artisan.localisation}
              </p>
              {artisan.note && (
                <p>
                  <strong>Note :</strong> {artisan.note} / 5{" "}
                  {renderStars(artisan.note)}
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

      <Link to="/" className="btn btn-secondary mt-4">
        ⬅ Retour à l’accueil
      </Link>
    </div>
  );
}

/* ========= PAGE FICHE ARTISAN (détaillée + formulaire de contact) ========= */

function ArtisanDetailPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Charger les infos de l'artisan
  useEffect(() => {
    setLoading(true);
    setErreur(null);

    fetch(`http://localhost:3001/artisans/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement de l'artisan");
        }
        return response.json();
      })
      .then((data) => {
        setArtisan(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger la fiche artisan");
        setLoading(false);
      });
  }, [id]);

  // Gestion des champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envoi du formulaire de contact
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErreur(null);

    if (!formData.message.trim()) {
      setErreur("Le message est obligatoire.");
      return;
    }

    setSending(true);

    fetch("http://localhost:3001/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        id_artisan: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du message");
        }
        return response.json();
      })
      .then(() => {
        setSending(false);
        setSuccessMessage("Votre message a bien été envoyé.");
        setFormData({
          nom: "",
          email: "",
          objet: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setSending(false);
        setErreur("Une erreur est survenue lors de l'envoi du message.");
      });
  };

  if (loading) {
    return <p>Chargement de la fiche artisan...</p>;
  }

  if (erreur && !artisan) {
    return (
      <div>
        <p>{erreur}</p>
        <Link to="/artisans" className="btn btn-secondary mt-3">
          ⬅ Retour à la liste
        </Link>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div>
        <p>Artisan introuvable.</p>
        <Link to="/artisans" className="btn btn-secondary mt-3">
          ⬅ Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {/* Colonne infos artisan */}
      <div className="col-12 col-lg-6">
        <h1 className="mb-3">{artisan.nom}</h1>
        <p>
          <strong>Catégorie :</strong> {artisan.categorie}
          <br />
          <strong>Spécialité :</strong> {artisan.specialite}
          <br />
          <strong>Localisation :</strong> {artisan.localisation}
          <br />
          {artisan.note && (
            <>
              <strong>Note :</strong> {artisan.note} / 5{" "}
              {renderStars(artisan.note)}
              <br />
            </>
          )}
        </p>

        {artisan.description && (
          <p className="mt-3">
            <strong>À propos :</strong>
            <br />
            {artisan.description}
          </p>
        )}

        {artisan.site_web && (
          <p className="mt-2">
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary btn-sm"
            >
              Visiter le site web
            </a>
          </p>
        )}

        <Link to="/artisans" className="btn btn-secondary mt-3">
          ⬅ Retour à la liste
        </Link>
      </div>

      {/* Colonne formulaire de contact */}
      <div className="col-12 col-lg-6">
        <h2>Contacter cet artisan</h2>
        <p className="text-muted">
          Remplissez le formulaire ci-dessous pour envoyer un message à cet
          artisan.
        </p>

        {erreur && <div className="alert alert-danger">{erreur}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="nom">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              className="form-control"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="vous@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="objet">
              Objet
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              className="form-control"
              value={formData.objet}
              onChange={handleChange}
              placeholder="Demande d'information"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={sending}
          >
            {sending ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ========= PAGES LEGALES ========= */

function MentionsLegales() {
  return (
    <div>
      <h1>Mentions légales</h1>
      <p>
        Ce site est un projet réalisé dans le cadre d’un devoir pédagogique.
      </p>
      <p>
        Éditeur : Étudiant(e) – Projet de formation.
        <br />
        Hébergement : Localhost.
      </p>
      <p>Les informations présentées sur ce site sont fictives.</p>
    </div>
  );
}

function DonneesPersonnelles() {
  return (
    <div>
      <h1>Données personnelles</h1>
      <p>
        Les données collectées via le formulaire de contact sont uniquement
        utilisées dans un cadre pédagogique.
      </p>
      <p>
        Aucune donnée n’est transmise à des tiers et aucune exploitation
        commerciale n’est réalisée.
      </p>
    </div>
  );
}

function CookiesPage() {
  return (
    <div>
      <h1>Cookies</h1>
      <p>Ce site n’utilise pas de cookies de suivi ou de publicité.</p>
      <p>
        Des cookies techniques peuvent être utilisés pour le bon
        fonctionnement de l’application.
      </p>
    </div>
  );
}

function Accessibilite() {
  return (
    <div>
      <h1>Accessibilité</h1>
      <p>
        Ce site s’efforce de respecter les principes d’accessibilité numérique.
      </p>
      <p>
        L’interface est utilisable avec un lecteur d’écran et une navigation au
        clavier.
      </p>
    </div>
  );
}

/* ========= PAGE 404 ========= */

function NotFoundPage() {
  return (
    <div className="text-center">
      <img
        src="/logo192.png"
        alt="Page non trouvée"
        className="notfound-image"
      />
      <h1>Page non trouvée</h1>
      <p>La page que vous avez demandée n’existe pas ou plus.</p>
      <Link to="/" className="btn btn-primary">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default App;
