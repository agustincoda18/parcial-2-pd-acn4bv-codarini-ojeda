module.exports = function validateMedicamento(req, res, next) {
  const { nombre, dosis } = req.body;

  if (!nombre || !dosis) {
    return res.status(400).json({
      error: "El medicamento debe tener 'nombre' y 'dosis'."
    });
  }

  next();
};
