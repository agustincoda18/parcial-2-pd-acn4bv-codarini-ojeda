const db = require("../config/db");

// Obtener medicamentos
exports.getMedicamentos = (req, res) => {
  db.all(
    `
    SELECT *
    FROM medicamentos
    WHERE user_id = ?
  `,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Error al obtener medicamentos" });
      res.json(rows);
    }
  );
};

// Crear medicamento
exports.crearMedicamento = (req, res) => {
  const { nombre, dosis, categoria } = req.body;

  db.run(
    `
    INSERT INTO medicamentos (user_id, nombre, dosis, categoria)
    VALUES (?, ?, ?, ?)
  `,
    [req.user.id, nombre, dosis, categoria],
    function (err) {
      if (err) {
        console.log("ERROR SQL:", err);
        return res.status(500).json({ error: "Error al agregar medicamento" });
      }

      res.json({ id: this.lastID, nombre, dosis, categoria, estado: "pendiente" });
    }
  );
};

// Editar medicamento
exports.actualizarMedicamento = (req, res) => {
  const { id } = req.params;
  const { nombre, dosis, categoria } = req.body;

  db.run(
    `
    UPDATE medicamentos
    SET nombre = ?, dosis = ?, categoria = ?
    WHERE id = ? AND user_id = ?
  `,
    [nombre, dosis, categoria, id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: "Error al editar" });
      res.json({ message: "Actualizado correctamente" });
    }
  );
};

exports.marcarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; // 'tomado' o 'pendiente'

  db.run(
    `UPDATE medicamentos SET estado = ? WHERE id = ? AND user_id = ?`,
    [estado, id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: "Error al actualizar estado" });
      res.json({ message: "Estado actualizado" });
    }
  );
};

// Eliminar medicamento
exports.borrarMedicamento = (req, res) => {
  const { id } = req.params;

  // Antes de borrar, obtener el nombre
  db.get(
    `
    SELECT nombre FROM medicamentos
    WHERE id = ? AND user_id = ?
  `,
    [id, req.user.id],
    (err, med) => {
      if (!med) return res.status(404).json({ error: "No encontrado" });

      db.run(
        `
        DELETE FROM medicamentos
        WHERE id = ? AND user_id = ?
      `,
        [id, req.user.id],
        function (err2) {
          if (err2) return res.status(500).json({ error: "Error al eliminar" });

          res.json({ message: "Eliminado correctamente" });
        }
      );
    }
  );
};
