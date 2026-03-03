const db = require("../config/db");

// ======================
// GET /medicamentos
// ======================
exports.getMedicamentos = (req, res) => {
  db.all(
    `SELECT * FROM medicamentos WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) {
        console.error("ERROR GET medicamentos:", err);
        return res.status(500).json({ error: "Error al obtener medicamentos" });
      }
      res.json(rows || []); // ✅ SIEMPRE ARRAY
    }
  );
};

// ======================
// GET /medicamentos/:id
// ======================
exports.getMedicamentoById = (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT * FROM medicamentos WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    (err, row) => {
      if (err) {
        console.error("ERROR GET medicamento by id:", err);
        return res.status(500).json({ error: "Error al obtener medicamento" });
      }
      if (!row) return res.status(404).json({ error: "No encontrado" });
      res.json(row);
    }
  );
};

// ======================
// POST /medicamentos
// ======================
exports.crearMedicamento = (req, res) => {
  const { nombre, dosis, categoria } = req.body;

  if (!nombre || !dosis || !categoria) {
    return res.status(400).json({ error: "Faltan datos (nombre, dosis, categoria)" });
  }

  db.run(
    `INSERT INTO medicamentos (user_id, nombre, dosis, categoria, estado)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.id, nombre, dosis, categoria, "pendiente"],
    function (err) {
      if (err) {
        console.error("ERROR POST medicamentos:", err);
        return res.status(500).json({ error: "Error al agregar medicamento" });
      }

      res.json({
        id: this.lastID,
        nombre,
        dosis,
        categoria,
        estado: "pendiente",
      });
    }
  );
};

// ======================
// PUT /medicamentos/:id
// ======================
exports.actualizarMedicamento = (req, res) => {
  const { id } = req.params;
  const { nombre, dosis, categoria } = req.body;

  db.run(
    `UPDATE medicamentos
     SET nombre = ?, dosis = ?, categoria = ?
     WHERE id = ? AND user_id = ?`,
    [nombre, dosis, categoria, id, req.user.id],
    function (err) {
      if (err) {
        console.error("ERROR PUT medicamentos:", err);
        return res.status(500).json({ error: "Error al editar" });
      }
      if (this.changes === 0) return res.status(404).json({ error: "No encontrado" });

      res.json({ message: "Actualizado correctamente" });
    }
  );
};

// ======================
// DELETE /medicamentos/:id
// ======================
exports.borrarMedicamento = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM medicamentos WHERE id = ? AND user_id = ?`,
    [id, req.user.id],
    function (err) {
      if (err) {
        console.error("ERROR DELETE medicamentos:", err);
        return res.status(500).json({ error: "Error al eliminar" });
      }
      if (this.changes === 0) return res.status(404).json({ error: "No encontrado" });

      res.json({ message: "Eliminado correctamente" });
    }
  );
};

// ======================
// PATCH /medicamentos/:id/estado
// body: { estado: "tomado" | "pendiente" }
// ======================
exports.marcarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadoNorm = String(estado || "").toLowerCase();
  if (!["tomado", "pendiente"].includes(estadoNorm)) {
    return res.status(400).json({ error: "Estado inválido (tomado|pendiente)" });
  }

  db.run(
    `UPDATE medicamentos SET estado = ?
     WHERE id = ? AND user_id = ?`,
    [estadoNorm, id, req.user.id],
    function (err) {
      if (err) {
        console.error("ERROR PATCH estado:", err);
        return res.status(500).json({ error: "Error al actualizar estado" });
      }
      if (this.changes === 0) return res.status(404).json({ error: "No encontrado" });

      res.json({ message: "Estado actualizado", id: Number(id), estado: estadoNorm });
    }
  );
};