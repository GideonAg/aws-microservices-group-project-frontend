// src/components/auth/Login.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import { login, setAuthToken } from "../../services/api";

const Login = () => {
  const { login: setAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated && user.role) {
      const targetPath =
        user.role === "admin" ? "/admin/dashboard" : "/team/dashboard";
      if (window.location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
  }, [user.isAuthenticated, user.role, navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await login(values);
        const { idToken } = response.data;
        setAuthToken(idToken);
        setAuth(idToken);
      } catch (error) {
        console.log(error);
        setErrors({ general: "Invalid credentials" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          {formik.errors.general && (
            <p className="text-red-500 text-sm mb-4">{formik.errors.general}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={formik.isSubmitting}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
