import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./App.css";

/* ========= CONFIG CATEGORIES ========= */

const CATEGORY_CONFIG = {
  batiment: {
    label: "Bâtiment",
    apiLabel: "Bâtiment",
    description: "Les artisans du bâtiment en région Auvergne-Rhône-Alpes.",
  },
  services: {
    label: "Services",
    apiLabel: "Services",
    description: "Les artisans de services près de chez vous.",
  },
  alimentation: {
    label: "Alimentation",
    apiLabel: "Alimentation",
    description: "Les artisans de bouche : boulanger, boucher, chocolatier…",
  },
  fabrication: {
    label: "Fabrication",
    apiLabel: "Fabrication",
    description: "Les artisans de fabrication : ferronnier, bijoutier, couturier…",
  },
};

/* ========= ETOILES ========= */

function renderStars(note) {
  if (note === null || note === undefined) return null;
  const rounded = Math.round(Number(note));

  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (i < rounded ? "★" : "☆"))}
    </span>
  );
}

/* ========= APP ========= */

export default function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorie/:slug" element={<CategoryPage />} />
            <Route path="/artisan/:id" element={<ArtisanDetailPage />} />
            <Route path="/recherche" element={<SearchResultsPage />} />

            {/* Pages légales "vides" */}
            <Route
              path="/mentions-legales"
              element={<LegalPage title="Mentions légales" />}
            />
            <Route
              path="/donnees-personnelles"
              element={<LegalPage title="Données personnelles" />}
            />
            <Route
              path="/accessibilite"
              element={<LegalPage title="Accessibilité" />}
            />
            <Route path="/cookies" element={<LegalPage title="Cookies" />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <SiteFooter />
      </div>
    </Router>
  );
}

/* ========= HEADER ========= */

function SiteHeader() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    navigate(`/recherche?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="main-header">
      <div className="header-inner">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Trouve ton artisan" className="site-logo" />
        </Link>

        <nav className="category-nav">
          <Link to="/categorie/batiment" className="category-link">
            Bâtiment
          </Link>
          <Link to="/categorie/services" className="category-link">
            Services
          </Link>
          <Link to="/categorie/alimentation" className="category-link">
            Alimentation
          </Link>
          <Link to="/categorie/fabrication" className="category-link">
            Fabrication
          </Link>
        </nav>

        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>
    </header>
  );
}

/* ========= FOOTER ========= */

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-address">
          <p>101 cours Charlemagne</p>
          <p>69269 Lyon Cedex 02</p>
          <p>+33 (0)4 26 73 40 00</p>
        </div>

        <div className="footer-links-centered">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/donnees-personnelles">Données personnelles</Link>
          <Link to="/accessibilite">Accessibilité</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

/* ========= PAGE ACCUEIL ========= */

function Home() {
  const navigate = useNavigate();

  // tous les artisans (pour la droite + les menus déroulants)
  const [allArtisans, setAllArtisans] = useState([]);
  // artisans du mois (colonne de droite)
  const [featuredArtisans, setFeaturedArtisans] = useState([]);

  // états des menus déroulants
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const [selectedArtisanId, setSelectedArtisanId] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/artisans")
      .then((res) => res.json())
      .then((data) => {
        setAllArtisans(data);
        setFeaturedArtisans(data.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  // liste des catégories à afficher dans le select
  const categoryOptions = Object.entries(CATEGORY_CONFIG).map(
    ([slug, cfg]) => ({
      slug,
      label: cfg.label,
    })
  );

  // artisans filtrés par catégorie sélectionnée
  const artisansForSelectedCategory = allArtisans.filter(
    (a) => slugFromCategorie(a.categorie) === selectedCategorySlug
  );

  const handleCategoryChange = (e) => {
    const slug = e.target.value;
    setSelectedCategorySlug(slug);
    setSelectedArtisanId(""); // on reset l’artisan quand la catégorie change
  };

  const handleArtisanChange = (e) => {
    setSelectedArtisanId(e.target.value);
  };

  const handleGoToArtisan = () => {
    if (!selectedArtisanId) return;
    navigate(`/artisan/${selectedArtisanId}`);
  };

  return (
    <section className="home-section">
      <div className="home-wrapper">
        <div className="home-grid">
          {/* GAUCHE */}
          <div className="home-left">
            <h1>Bienvenue sur TROUVE TON ARTISAN</h1>
            <p>
              Trouvez facilement un artisan près de chez vous, classé par
              catégorie.
            </p>

            <Link to="/categorie/batiment" className="primary-btn">
              Voir tous les artisans
            </Link>

            <h2>Comment trouver mon artisan ?</h2>

            <div className="steps">
              {/* Étape 1 */}
              <div>
                <span>1</span>
                <div>
                  <strong>Choisir la catégorie d’artisanat</strong>
                  <p>Sélectionnez la catégorie dans le menu.</p>

                  <div className="steps-controls">
                    <select
                      className="steps-select"
                      value={selectedCategorySlug}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Choisir une catégorie…</option>
                      {categoryOptions.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Étape 2 */}
              <div>
                <span>2</span>
                <div>
                  <strong>Choisir un artisan</strong>
                  <p>Consultez les fiches, notes et localisations.</p>

                  <div className="steps-controls">
                    <select
                      className="steps-select"
                      value={selectedArtisanId}
                      onChange={handleArtisanChange}
                      disabled={!selectedCategorySlug}
                    >
                      <option value="">
                        {selectedCategorySlug
                          ? "Choisir un artisan…"
                          : "Choisissez d’abord une catégorie"}
                      </option>
                      {artisansForSelectedCategory.map((a) => (
                        <option key={a.id_artisan} value={a.id_artisan}>
                          {a.nom} – {a.localisation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Étape 3 */}
              <div>
                <span>3</span>
                <div>
                  <strong>Le contacter</strong>
                  <p>Utilisez le formulaire de contact.</p>

                  <div className="steps-controls">
                    <button
                      type="button"
                      className="steps-button"
                      onClick={handleGoToArtisan}
                      disabled={!selectedArtisanId}
                    >
                      Contacter cet artisan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DROITE */}
          <div className="home-right">
            <h2>Les artisans du mois</h2>

            {featuredArtisans.map((a) => (
              <div key={a.id_artisan} className="artisan-card">
                <strong>{a.nom}</strong>
                <p>{a.specialite}</p>
                <p>{a.localisation}</p>
                <p>
                  {a.note} / 5 {renderStars(a.note)}
                </p>
                <Link
                  to={`/artisan/${a.id_artisan}`}
                  className="artisan-card-link-btn"
                >
                  Voir la fiche
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========= PAGE CATEGORIE ========= */

function CategoryPage() {
  const { slug } = useParams();
  const config = CATEGORY_CONFIG[slug];
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!config) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErreur(null);

    fetch(
      `http://localhost:3001/artisans/categorie/${encodeURIComponent(
        config.apiLabel
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des artisans");
        return res.json();
      })
      .then((data) => {
        setArtisans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger les artisans.");
        setLoading(false);
      });
  }, [config]);

  if (!config) {
    return (
      <section className="category-section">
        <div className="category-wrapper">
          <h1>Catégorie inconnue</h1>
          <p>La catégorie demandée n’existe pas.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="category-section">
      <div className="category-wrapper">
        <h1 className="category-title">
          <span className="category-title-line" />
          <span className="category-title-text">{config.label}</span>
          <span className="category-title-line" />
        </h1>
        <p className="category-subtitle">{config.description}</p>

        {loading && <p>Chargement des artisans...</p>}
        {erreur && <p className="category-error">{erreur}</p>}

        {!loading && !erreur && artisans.length === 0 && (
          <p>Aucun artisan trouvé pour cette catégorie.</p>
        )}

        {!loading && !erreur && artisans.length > 0 && (
          <div className="category-grid">
            {artisans.map((a) => (
              <article key={a.id_artisan} className="category-card">
                <h2 className="category-card-name">{a.nom}</h2>
                <p className="category-card-specialite">{a.specialite}</p>
                <p className="category-card-ville">{a.localisation}</p>
                {a.note && (
                  <p className="category-card-note">
                    {a.note} / 5 {renderStars(a.note)}
                  </p>
                )}

                <Link
                  to={`/artisan/${a.id_artisan}`}
                  className="category-card-btn"
                >
                  Contacter cet artisan
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ========= PAGE FICHE ARTISAN + CONTACT + MAP ========= */

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

  useEffect(() => {
    setLoading(true);
    setErreur(null);

    fetch(`http://localhost:3001/artisans/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de l'artisan");
        return res.json();
      })
      .then((data) => {
        setArtisan(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger la fiche artisan.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErreur(null);

    if (!formData.message.trim()) {
      setErreur("Le message est obligatoire.");
      return;
    }

    setSending(true);

    fetch("http://localhost:3001/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        id_artisan: id,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'envoi du message");
        return res.json();
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
    return (
      <section className="artisan-section">
        <div className="artisan-wrapper">
          <p>Chargement de la fiche artisan...</p>
        </div>
      </section>
    );
  }

  if (!artisan) {
    return (
      <section className="artisan-section">
        <div className="artisan-wrapper">
          <p>{erreur || "Artisan introuvable."}</p>
        </div>
      </section>
    );
  }

  const mapSrc =
    artisan.localisation &&
    `https://www.google.com/maps?q=${encodeURIComponent(
      artisan.localisation
    )}&output=embed`;

  return (
    <section className="artisan-section">
      <div className="artisan-wrapper">
        <div className="artisan-grid">
          {/* Infos artisan */}
          <div className="artisan-info-card">
            <h1>{artisan.nom}</h1>
            <p className="artisan-info-meta">
              <strong>Catégorie :</strong> {artisan.categorie}
              <br />
              <strong>Spécialité :</strong> {artisan.specialite}
              <br />
              <strong>Localisation :</strong> {artisan.localisation}
              <br />
              {artisan.email_contact && (
                <>
                  <strong>Email :</strong> {artisan.email_contact}
                  <br />
                </>
              )}
              {artisan.note && (
                <>
                  <strong>Note :</strong> {artisan.note} / 5{" "}
                  {renderStars(artisan.note)}
                </>
              )}
            </p>

            {artisan.description && (
              <p className="artisan-info-description">
                {artisan.description}
              </p>
            )}

            {artisan.site_web && (
              <p>
                <a
                  href={artisan.site_web}
                  target="_blank"
                  rel="noreferrer"
                  className="artisan-site-link"
                >
                  Visiter le site web
                </a>
              </p>
            )}

            {/* Bloc Google Maps */}
            {mapSrc && (
              <div className="artisan-map-block">
                <h3>Localisation sur la carte</h3>
                <div className="artisan-map-wrapper">
                  <iframe
                    title={`Carte de ${artisan.localisation}`}
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}

            <p className="artisan-back-link">
              <Link to={`/categorie/${slugFromCategorie(artisan.categorie)}`}>
                ← Retour à la catégorie
              </Link>
            </p>
          </div>

          {/* Formulaire de contact */}
          <div className="artisan-contact-card">
            <h2>Contacter cet artisan</h2>
            <p className="artisan-contact-help">
              Remplissez le formulaire ci-dessous, votre message sera transmis à
              l’artisan.
            </p>

            {erreur && <div className="form-error">{erreur}</div>}
            {successMessage && (
              <div className="form-success">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="objet">Objet</label>
                <input
                  id="objet"
                  name="objet"
                  type="text"
                  value={formData.objet}
                  onChange={handleChange}
                  placeholder="Demande d'information"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message"
                  required
                />
              </div>

              <button type="submit" className="primary-btn" disabled={sending}>
                {sending ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========= PAGE RESULTATS DE RECHERCHE ========= */

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }

    setLoading(true);
    setErreur(null);

    fetch(
      `http://localhost:3001/artisans/recherche?q=${encodeURIComponent(q)}`
    )
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors du chargement des résultats");
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger les résultats de recherche.");
        setLoading(false);
      });
  }, [q]);

  return (
    <section className="category-section">
      <div className="category-wrapper">
        <h1 className="category-title">
          <span className="category-title-line" />
          <span className="category-title-text">Résultats de recherche</span>
          <span className="category-title-line" />
        </h1>

        {q ? (
          <p className="category-subtitle">
            Résultats pour{" "}
            <span className="search-query-highlight">“{q}”</span>
          </p>
        ) : (
          <p className="category-subtitle">
            Saisissez un nom d’artisan dans la barre de recherche.
          </p>
        )}

        {loading && <p>Chargement des résultats...</p>}
        {erreur && <p className="category-error">{erreur}</p>}

        {!loading && !erreur && q && results.length === 0 && (
          <p>Aucun artisan ne correspond à votre recherche.</p>
        )}

        {!loading && !erreur && results.length > 0 && (
          <div className="category-grid">
            {results.map((a) => (
              <article key={a.id_artisan} className="category-card">
                <h2 className="category-card-name">{a.nom}</h2>
                <p className="category-card-specialite">{a.specialite}</p>
                <p className="category-card-ville">{a.localisation}</p>
                {a.note && (
                  <p className="category-card-note">
                    {a.note} / 5 {renderStars(a.note)}
                  </p>
                )}

                <Link
                  to={`/artisan/${a.id_artisan}`}
                  className="category-card-btn"
                >
                  Voir la fiche
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* petit utilitaire pour retrouver le slug depuis la catégorie */
function slugFromCategorie(cat) {
  if (!cat) return "batiment";
  const lower = cat.toLowerCase();
  if (lower.includes("bâtiment") || lower.includes("batiment")) return "batiment";
  if (lower.includes("service")) return "services";
  if (lower.includes("alimentation")) return "alimentation";
  if (lower.includes("fabrication")) return "fabrication";
  return "batiment";
}

/* ========= PAGE LEGALE GENERIQUE ========= */

function LegalPage({ title }) {
  return (
    <section className="category-section">
      <div className="category-wrapper">
        <h1 className="category-title">
          <span className="category-title-line" />
          <span className="category-title-text">{title}</span>
          <span className="category-title-line" />
        </h1>
        <p className="category-subtitle">
          Page en construction – ce contenu sera fourni ultérieurement par un
          cabinet spécialisé.
        </p>
      </div>
    </section>
  );
}

/* ========= 404 ========= */

function NotFound() {
  return (
    <section className="category-section">
      <div className="category-wrapper">
        <h1>Page non trouvée</h1>
        <p>La page que vous cherchez n’existe pas.</p>
      </div>
    </section>
  );
}
