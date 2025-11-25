import React, { useEffect, useState } from "react";
import MedicamentoForm from "./components/MedicamentoForm";
import MedicamentoList from "./components/MedicamentoList";
import "./App.css";


function App() {
  const [medicamentos, setMedicamentos] = useState([]);

  // Obtener medicamentos desde el backend
  const fetchMedicamentos = async () => {
    const res = await fetch("http://localhost:3001/medicamentos");
    const data = await res.json();
    setMedicamentos(data);
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  // Agregar medicamento (POST)
  const agregarMedicamento = async (nuevo) => {
    await fetch("http://localhost:3001/medicamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo)
    });

    fetchMedicamentos();
  };

  return (
    <div className="app-container">
      <h1>💊 MedTrack - React</h1>

      <MedicamentoForm onAdd={agregarMedicamento} />
      <MedicamentoList medicamentos={medicamentos} />
    </div>
  );
}

export default App;
