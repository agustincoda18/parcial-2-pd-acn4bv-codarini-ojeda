const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getMedicamentos,
  getMedicamentoById,
  crearMedicamento,
  actualizarMedicamento,
  borrarMedicamento,
  marcarEstado,
} = require("../controllers/medicamentosController");

router.get("/", auth, getMedicamentos);
router.get("/:id", auth, getMedicamentoById);
router.post("/", auth, crearMedicamento);
router.put("/:id", auth, actualizarMedicamento);
router.delete("/:id", auth, borrarMedicamento);
router.patch("/:id/estado", auth, marcarEstado);

module.exports = router;