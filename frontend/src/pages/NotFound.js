import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main
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
      {/* Image */}
      <img
        src="/assets/404.png"
        alt="Page non trouvée"
        style={{ maxWidth: "300px", marginBottom: "30px" }}
      />

      {/* Texte */}
      <h1>Page non trouvée</h1>
      <p>
        La page que vous avez demandée n’existe pas ou a été déplacée.
      </p>

      {/* Retour accueil */}
      <Link to="/" style={{ marginTop: "20px", color: "#0074c7" }}>
        ← Retour à l’accueil
      </Link>
    </main>
  );
}

export default NotFound;
