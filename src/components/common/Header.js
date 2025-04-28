import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { getRole, getToken, logout as doLogout } from "../../services/auth";

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const role = getRole();
    const isAuthenticated = !!getToken();

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false); // close menu on nav
    };

    const handleLogout = () => {
        doLogout();
        navigate("/");
    };

    return (
        <header className="bg-[#FF5A00] text-white px-6 py-4 flex flex-wrap items-center justify-between shadow-lg">
            <div
                className="text-lg font-semibold cursor-pointer hover:text-gray-200 transition-all"
                onClick={() => handleNavigate("/dashboard")}
            >
                Task Management System
            </div>

            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>
            <nav
                className={`${
                    menuOpen ? "flex" : "hidden"
                } flex-col md:flex-row gap-4 items-start md:items-center mt-4 md:mt-0 md:gap-x-6 w-full md:w-auto`}
            >
                {role === "admin" && (
                    <>
                        <button onClick={() => handleNavigate("/admin/dashboard")}>Dashboard</button>
                        <button onClick={() => handleNavigate("/admin/team")}>Team Management</button>
                    </>
                )}

                {role === "user" && (
                    <>
                        <button onClick={() => handleNavigate("/team/dashboard")}>Dashboard</button>
                        <button onClick={() => handleNavigate("/team/my-tasks")}>My Tasks</button>
                    </>
                )}

                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="text-white hover:text-gray-300 transition-all"
                    >
                        Logout
                    </button>
                )}
            </nav>
        </header>

    );
};

export default Header;