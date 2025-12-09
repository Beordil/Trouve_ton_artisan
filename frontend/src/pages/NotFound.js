// Import du composant Link pour la navigation interne
// Import Link component for internal navigation
import { Link } from "react-router-dom";

// ===============================
// Page 404 - Page non trouvée
// ===============================
// 404 page - Not Found
function NotFound() {
  return (
    <main
      // Styles inline pour centrer le contenu verticalement et horizontalement
      // Inline styles to center content vertically and horizontally
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      {/* Image illustrative de la page 404 */}
      {/* Illustration image for the 404 page */}
      <img
        src="/assets/404.png"
        alt="Page non trouvée"
        style={{ maxWidth: "300px", marginBottom: "30px" }}
      />

      {/* Titre principal */}
      {/* Main title */}
      <h1>Page non trouvée</h1>

      {/* Message explicatif */}
      {/* Explanation message */}
      <p>
        La page que vous avez demandée n’existe pas ou a été déplacée.
      </p>

      {/* Lien pour retourner à la page d’accueil */}
      {/* Link to go back to the home page */}
      <Link to="/" style={{ marginTop: "20px", color: "#0074c7" }}>
        ← Retour à l’accueil
      </Link>
    </main>
  );
}

export default NotFound;
