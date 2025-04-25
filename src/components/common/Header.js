import React from "react";
import { useNavigate } from "react-router-dom";
import { getRole, getToken, logout as doLogout } from "../../services/auth";

const Header = () => {
  const navigate = useNavigate();
  const role = getRole();
  const isAuthenticated = !!getToken();

  const handleDashboardClick = () => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "user") {
      navigate("/team/dashboard");
    } else {
      navigate("/unauthorized");
    }
  };

  const handleLogout = () => {
    doLogout();
    navigate("/");
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={handleDashboardClick}
      >
        Task Management System
      </h1>
      <div className="flex space-x-4">
        <button onClick={handleDashboardClick} className="hover:underline">
          Task Dashboard
        </button>
        {isAuthenticated && (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
