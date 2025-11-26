const express = require("express");
const { marcarEstado } = require("../controllers/medicamentosController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getMedicamentos,
  crearMedicamento,
  actualizarMedicamento,
  borrarMedicamento,
} = require("../controllers/medicamentosController");

router.get("/", auth, getMedicamentos);
router.post("/", auth, crearMedicamento);
router.put("/:id", auth, actualizarMedicamento);
router.delete("/:id", auth, borrarMedicamento);
router.patch("/:id/estado", auth, marcarEstado);

module.exports = router;
