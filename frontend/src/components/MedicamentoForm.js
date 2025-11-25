import React, { useState } from "react";

function MedicamentoForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !dosis) return alert("Completa todos los campos");

    const nuevo = { nombre, dosis };
    onAdd(nuevo);
    setNombre("");
    setDosis("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dosis"
        value={dosis}
        onChange={(e) => setDosis(e.target.value)}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}

export default MedicamentoForm;
