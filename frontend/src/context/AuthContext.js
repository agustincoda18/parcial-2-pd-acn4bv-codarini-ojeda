import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos almacenados cuando arranca la app
    useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);

    try {
        if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        }
    } catch (err) {
        console.error("Error al cargar usuario desde localStorage", err);

        // Limpia valores rotos
        localStorage.removeItem("user");
        setUser(null);
    }

    setLoading(false);
    }, []);


  const isAuthenticated = Boolean(token);

  function login(token, userData) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(token);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  }

  if (loading) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
