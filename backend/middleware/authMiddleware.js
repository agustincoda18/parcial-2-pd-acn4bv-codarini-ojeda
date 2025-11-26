const jwt = require("jsonwebtoken");
const SECRET = "superClave123";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Token inválido" });

    req.user = user; // guarda { id, email }
    next();
  });
};
