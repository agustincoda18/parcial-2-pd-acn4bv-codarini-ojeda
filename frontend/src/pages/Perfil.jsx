import "./Perfil.css";

export default function Perfil() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">👤 Mi Perfil</h1>

      <div className="perfil-card">
        <div className="perfil-row">
          <span className="perfil-label">Usuario:</span>
          <span className="perfil-value">{user?.username}</span>
        </div>

        <div className="perfil-row">
          <span className="perfil-label">Email:</span>
          <span className="perfil-value">{user?.email}</span>
        </div>
      </div>
    </div>
  );
}
