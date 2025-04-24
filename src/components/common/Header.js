import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <nav>
          {user ? (
            <>
              <Link to="/team/dashboard" className="mr-4 hover:underline">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
