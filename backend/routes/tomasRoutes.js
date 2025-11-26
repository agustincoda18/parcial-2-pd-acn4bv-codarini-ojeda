const express = require("express");
const router = express.Router();

const {
  registrarToma,
  obtenerHistorial,
  resumenTomas
} = require("../controllers/tomasController");

const authMiddleware = require("../middleware/authMiddleware");

// Registrar toma
router.post("/:id", authMiddleware, registrarToma);

// Listar historial
router.get("/", authMiddleware, obtenerHistorial);

// Resumen de tomas — NUEVO
router.get("/resumen", authMiddleware, resumenTomas);

module.exports = router;
