import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null,
  });
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("idToken");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setIdToken(storedToken);
      setUser({ isAuthenticated: true, role: storedRole });
    }
  }, []);

  const login = (token) => {
    let role = "user";
    try {
      const decoded = jwtDecode(token);
      role = decoded["custom:role"] || decoded["role"] || "user";
    } catch (error) {
      console.error("Failed to decode idToken:", error);
    }

    setIdToken(token);
    setUser({ isAuthenticated: true, role });
    localStorage.setItem("idToken", token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setIdToken(null);
    setUser({ isAuthenticated: false, role: null });
    localStorage.removeItem("idToken");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, idToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
