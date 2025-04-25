import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DashboardRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const idToken = params.get("id_token");
    const accessToken = params.get("access_token");

    if (idToken && accessToken) {
      try {
        const decoded = jwtDecode(idToken);
        const role = decoded["custom:role"] || decoded["role"] || "user";

        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("role", role);

        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/team/dashboard");
          }
        }, 100);
      } catch (err) {
        console.error("Failed to decode token:", err);
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }
  }, [navigate]);

  return <p className="p-4 text-center">Redirecting to dashboard...</p>;
};

export default DashboardRedirect;
