const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) console.error(err);
  else console.log("Base de datos conectada");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  db.run(`
          CREATE TABLE IF NOT EXISTS tomas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        medicamento_id INTEGER NOT NULL,
        usuario_id INTEGER NOT NULL,
        fecha_hora TEXT NOT NULL,
        estado TEXT NOT NULL,
        FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id) ON DELETE CASCADE,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS medicamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      dosis TEXT,
      categoria TEXT,
      estado TEXT DEFAULT 'pendiente',
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES usuarios(id)
    )
  `);

  // ✅ Si la tabla medicamentos ya existía sin "estado", intentamos agregarla
  db.run(`ALTER TABLE medicamentos ADD COLUMN estado TEXT DEFAULT 'pendiente'`, (err) => {
    // Si ya existe la columna, SQLite tira error. Lo ignoramos.
  });
});

module.exports = db;