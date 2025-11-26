const express = require("express");
const router = express.Router();

const {
  getCategorias,
  createCategoria
} = require("../controllers/categoriasController");

const authMiddleware = require("../middleware/authMiddleware");

// RUTAS PROTEGIDAS
router.get("/", authMiddleware, getCategorias);
router.post("/", authMiddleware, createCategoria);

module.exports = router;
