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
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 flex items-center justify-between shadow-lg">
      <h1
        className="text-2xl font-semibold cursor-pointer hover:text-gray-200 transition-all mx-auto"
        onClick={handleDashboardClick}
      >
        Task Management System
      </h1>
      <div className="flex space-x-4 mx-auto">
        <button
          onClick={handleDashboardClick}
          className="hover:text-gray-200 transition-all"
        >
          Task Dashboard
        </button>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="hover:text-gray-200 transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
