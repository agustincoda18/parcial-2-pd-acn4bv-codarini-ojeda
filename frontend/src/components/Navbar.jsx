import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>💊 MedTrack</span>
        {isAuthenticated && (
          <>
            <Link to="/" style={styles.link}>Dashboard</Link>
            <Link to="/perfil" style={styles.link}>Perfil</Link>
          </>
        )}
      </div>

      {isAuthenticated && (
        <button style={styles.btn} onClick={logout}>
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: "#fff",
    padding: "10px 25px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: "18px"
  },
  link: {
    textDecoration: "none",
    color: "#333"
  },
  btn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
