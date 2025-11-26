import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [categoria, setCategoria] = useState("");
  const [botonesBloqueados, setBotonesBloqueados] = useState([]);

  const [editando, setEditando] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDosis, setEditDosis] = useState("");
  const [editCategoria, setEditCategoria] = useState("");

  // ======================
  // CARGAR MEDICAMENTOS
  // ======================

// 🟩 AGREGADO — Estado para el resumen de tomas
const [resumen, setResumen] = useState({
  total: 0,
  tomadas: 0,
  pendientes: 0
});

// 🟩 AGREGADO — Traer resumen de tomas desde backend
const fetchResumen = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3001/tomas/resumen", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  setResumen(data);
};


  const fetchMedicamentos = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/medicamentos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMedicamentos(data);
  };


    useEffect(() => {
      fetchMedicamentos();
      fetchResumen();   
    }, []);


  // ======================
  // AGREGAR MEDICAMENTO
  // ======================
  const agregarMedicamento = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3001/medicamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, dosis, categoria }),
    });

    setNombre("");
    setDosis("");
    setCategoria("");

    fetchMedicamentos();
  };

  // ======================
  // CAMBIAR ESTADO
  // ======================
const registrarToma = async (id) => {
  const token = localStorage.getItem("token");

  
  setBotonesBloqueados(prev => [...prev, id]);

  await fetch(`http://localhost:3001/tomas/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });

  fetchMedicamentos();
  fetchResumen();
};

  // ======================
  // ELIMINAR MEDICAMENTO
  // ======================
const eliminarMedicamento = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:3001/medicamentos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  fetchMedicamentos();
  fetchResumen(); 
};


  // ======================
  // EDITAR
  // ======================
  const abrirEditor = (m) => {
    setEditando(m.id);
    setEditNombre(m.nombre);
    setEditDosis(m.dosis);
    setEditCategoria(m.categoria);
  };

  const guardarEdicion = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3001/medicamentos/${editando}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: editNombre,
        dosis: editDosis,
        categoria: editCategoria,
      }),
    });

    setEditando(null);
    fetchMedicamentos();
  };

  return (
    <div className="dash">
      <h1>💊 Panel de Medicamentoss</h1>



      {/* FORM */}
      <div className="form-row">
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input placeholder="Dosis" value={dosis} onChange={(e) => setDosis(e.target.value)} />

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Categoría</option>
          <option value="Antibiótico">Antibiótico</option>
          <option value="Analgésico">Analgésico</option>
          <option value="Vitaminas">Vitaminas</option>
        </select>

        <button onClick={agregarMedicamento}>Agregar</button>
      </div>

      {/* TABLA */}
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dosis</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {medicamentos.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.dosis}</td>
              <td>{m.categoria}</td>

              <td>
                {m.estado === "Tomado" ? (
                  <span className="estado tomado">✔ Tomado</span>
                ) : (
                  <span className="estado pendiente">⏳ Pendiente</span>
                )}
              </td>

              <td>
               <button
                    className="btn-tomado"
                    disabled={botonesBloqueados.includes(m.id)}
                    onClick={() => registrarToma(m.id)}
                  >
                    ✓ Tomado
                  </button>
                  <button
                    className="btn-pendiente"
                    onClick={() => cambiarEstado(m.id, "pendiente")}
                  >
                    ⏳ Pendiente
                  </button>


              
                <button className="btn-edit" onClick={() => abrirEditor(m)}>✏️</button>
                <button className="btn-delete" onClick={() => eliminarMedicamento(m.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {editando && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Editar medicación</h3>

            <input value={editNombre} onChange={(e) => setEditNombre(e.target.value)} />
            <input value={editDosis} onChange={(e) => setEditDosis(e.target.value)} />

            <select value={editCategoria} onChange={(e) => setEditCategoria(e.target.value)}>
              <option value="Antibiótico">Antibiótico</option>
              <option value="Analgésico">Analgésico</option>
              <option value="Vitaminas">Vitaminas</option>
            </select>

            <button className="btn-save" onClick={guardarEdicion}>Guardar</button>
            <button className="btn-cancel" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        </div>
      )}
    
    
    
           
    <div className="resumen-tomas">
      <h2>📊 Resumen de Tomas</h2>
      <p><strong>Total:</strong> {resumen.total}</p>
      <p><strong>Tomadas:</strong> {resumen.tomadas}</p>
      <p><strong>Pendientes:</strong> {resumen.pendientes}</p>
    </div>
    
    
    
    
    </div>
  );
}
