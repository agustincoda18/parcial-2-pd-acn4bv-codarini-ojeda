const express = require("express");
const router = express.Router();

const { registrarToma, obtenerHistorial } = require("../controllers/tomasController");
const authMiddleware = require("../middleware/authMiddleware");

// Registrar toma
router.post("/:id", authMiddleware, registrarToma);

// Listar historial
router.get("/", authMiddleware, obtenerHistorial);

module.exports = router;
