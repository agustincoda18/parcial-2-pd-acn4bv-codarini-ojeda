const express = require("express");
const fs = require("fs");
const cors = require("cors");
const validateMedicamento = require("./middleware/validateMedicamento");

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Leer base de datos (archivo JSON)
function leerDB() {
  const data = fs.readFileSync("./data.json", "utf8");
  return JSON.parse(data);
}

// Guardar en base de datos
function guardarDB(data) {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
}

// GET → listar medicamentos
app.get("/medicamentos", (req, res) => {
  const db = leerDB();
  res.json(db.medicamentos);
});

// POST → agregar medicamento
app.post("/medicamentos", validateMedicamento, (req, res) => {
  const db = leerDB();
  const nuevo = req.body;

  db.medicamentos.push(nuevo);
  guardarDB(db);

  res.status(201).json({
    message: "Medicamento agregado correctamente",
    data: nuevo
  });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
