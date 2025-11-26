const db = require("../config/db");

// POST /tomas/:id → registrar toma
exports.registrarToma = (req, res) => {
  const medicamentoId = req.params.id;
  const fecha = new Date().toISOString();
  const estado = "tomado";

  db.run(
    `
    INSERT INTO tomas (medicamento_id, usuario_id, fecha_hora, estado)
    VALUES (?, ?, ?, ?)
    `,
    [medicamentoId, req.user.id, fecha, estado],
    function (err) {
      if (err) return res.status(500).json({ error: "Error al registrar la toma" });

      res.status(201).json({
        id: this.lastID,
        medicamento_id: medicamentoId,
        fecha_hora: fecha,
        estado,
      });
    }
  );
};

// GET /tomas → historial
exports.obtenerHistorial = (req, res) => {
  db.all(
    `
    SELECT tomas.*, medicamentos.nombre AS medicamento
    FROM tomas
    JOIN medicamentos ON tomas.medicamento_id = medicamentos.id
    WHERE tomas.usuario_id = ?
    ORDER BY tomas.fecha_hora DESC
    `,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Error al obtener historial" });

      res.json(rows);
    }
  );
};

exports.resumenTomas = (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT estado FROM tomas WHERE usuario_id = ?`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Error al obtener resumen" });

      const total = rows.length;
      const tomadas = rows.filter(t => t.estado === "tomado").length;
      const pendientes = rows.filter(t => t.estado === "pendiente").length;

      res.json({ total, tomadas, pendientes });
    }
  );
};
