import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import MedicamentoDetalle from "./pages/MedicamentoDetalle";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout><Dashboard /></Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Layout><Perfil /></Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/medicamentos/:id"
            element={
              <PrivateRoute>
                <Layout><MedicamentoDetalle /></Layout>
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
