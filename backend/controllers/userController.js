const db = require("../config/db");

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  db.get(
    "SELECT id, username, email FROM usuarios WHERE id = ?",
    [userId],
    (err, user) => {
      if (err) return res.status(500).json({ error: "Error en DB" });

      res.json(user);
    }
  );
};
