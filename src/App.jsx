import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AuthGuard from "./components/AuthGuard";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SharedEvent from "./pages/SharedEvent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/shared/:slug" element={<SharedEvent />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <AuthGuard>
                        <Dashboard />
                      </AuthGuard>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
