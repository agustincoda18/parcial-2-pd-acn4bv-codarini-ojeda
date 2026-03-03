import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./MedicamentoDetalle.css";

export default function MedicamentoDetalle() {
  const { id } = useParams();
  const [med, setMed] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/medicamentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMed(data);
    };

    cargar();
  }, [id]);

  if (!med) return <p className="container">Cargando...</p>;
  if (med?.error) return <p className="container">Error: {med.error}</p>;

  return (
    <div className="container">
      <h2>🔎 Detalle del medicamento</h2>

      <div className="card">
        <p><b>Nombre:</b> {med.nombre}</p>
        <p><b>Dosis:</b> {med.dosis}</p>
        <p><b>Categoría:</b> {med.categoria}</p>
        <p><b>Estado:</b> {med.estado}</p>
      </div>

      <Link to="/" className="back-link">← Volver</Link>
    </div>
  );
}