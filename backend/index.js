const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const medicamentosRoutes = require("./routes/medicamentosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const tomasRoutes = require("./routes/tomasRoutes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/auth", authRoutes);
app.use("/medicamentos", medicamentosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/tomas", tomasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
