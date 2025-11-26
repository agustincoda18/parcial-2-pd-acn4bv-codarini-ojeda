const db = require("../config/db");

// GET /categorias
exports.getCategorias = (req, res) => {
  db.all("SELECT * FROM categorias", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener categorías" });
    res.json(rows);
  });
};

// POST /categorias
exports.createCategoria = (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  db.run(
    "INSERT INTO categorias (nombre) VALUES (?)",
    [nombre],
    function (err) {
      if (err) return res.status(500).json({ error: "Error al crear categoría" });

      res.status(201).json({
        id: this.lastID,
        nombre
      });
    }
  );
};
