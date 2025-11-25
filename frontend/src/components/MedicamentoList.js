import React from "react";

function MedicamentoList({ medicamentos }) {
  return (
    <div>
      <h2>Lista de Medicamentos</h2>

      {medicamentos.length === 0 && <p className="empty">No hay medicamentos aún</p>}

      <ul>
        {medicamentos.map((m, index) => (
          <li key={index}>
            {m.nombre} — {m.dosis}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicamentoList;
