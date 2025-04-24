import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: !!localStorage.getItem("idToken"),
    role: localStorage.getItem("role") || null,
  });
  const [idToken, setIdToken] = useState(
    localStorage.getItem("idToken") || null
  );

  useEffect(() => {
    if (idToken && user.role) {
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("role", user.role);
    }
  }, [idToken, user.role]);

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
