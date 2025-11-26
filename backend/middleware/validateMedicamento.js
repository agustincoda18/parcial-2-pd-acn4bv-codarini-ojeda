module.exports = function (req, res, next) {
  const { nombre, dosis } = req.body;

  if (!nombre || !dosis) {
    return res.status(400).json({ error: "Campos obligatorios" });
  }

  next();
};
