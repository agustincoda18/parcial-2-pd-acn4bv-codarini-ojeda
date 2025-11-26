const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "superClave123";

// -------------------------------
// REGISTRO
// -------------------------------
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Error al encriptar" });

    db.run(
      "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
      function (err) {
        if (err) return res.status(400).json({ error: "Email ya existe" });

        res.json({
          message: "Usuario registrado",
          user: {
            id: this.lastID,
            username,
            email
          }
        });
      }
    );
  });
};

// -------------------------------
// LOGIN
// -------------------------------
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
    if (!user) return res.status(404).json({ error: "No existe" });

    bcrypt.compare(password, user.password, (err, ok) => {
      if (!ok) return res.status(403).json({ error: "Contraseña incorrecta" });

      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        SECRET,
        { expiresIn: "2h" }
      );

      res.json({
        message: "Login exitoso",
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        }
      });
    });
  });
};

