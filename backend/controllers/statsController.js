const db = require("../config/db");

exports.getStats = (req, res) => {
  db.get(
    `
      SELECT
        SUM(estado = 'tomado') AS tomados,
        SUM(estado = 'pendiente') AS pendientes
      FROM medicamentos
      WHERE user_id = ?
    `,
    [req.user.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: "Error al obtener estadísticas" });

      res.json(row);
    }
  );
};
