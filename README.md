# MedTrack — Gestor de Medicamentos

MedTrack es una aplicación web simple y eficiente para gestionar medicamentos, ver su estado (tomado/pendiente), editar información y administrar tu perfil.  
Construido con **React + Node.js + SQLite**, pensado para ser liviano, rápido y fácil de usar.

---

## Funcionalidades

### ✅ Panel de Medicamentos
- Agregar medicamentos con **nombre, dosis y categoría**
- Editar medicamentos
- Eliminar medicamentos
- Cambiar estado: **Tomado / Pendiente**
- Estado visible con colores e íconos

### 👤 Perfil
- Se muestra el usuario logueado y su email
- Vista limpia y moderna

### 🔐 Autenticación
- Registro de usuario
- Login con token JWT
- Protección de rutas del backend con middleware

---

## 🛠️ Tecnologías utilizadas

### **Frontend**
- React
- React Router
- Hooks (useState, useEffect)
- CSS custom

### **Backend**
- Node.js + Express
- SQLite3
- JWT (Token)
- bcrypt (hash de contraseñas)
