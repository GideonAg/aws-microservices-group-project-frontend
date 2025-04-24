// src/components/admin/UserForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../../services/api";

const UserForm = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      role: "user",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      role: Yup.string().oneOf(["user", "admin"]).required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await createUser(values);
        onSuccess();
      } catch (error) {
        setErrors({ general: error.message || "Failed to create user" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Add Team Member</h3>
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
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>
        {formik.errors.general && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.general}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={formik.isSubmitting}
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
