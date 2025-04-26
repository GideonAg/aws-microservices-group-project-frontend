import React, { useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../../services/auth";

export default function TeamManagement() {
  const [formData, setFormData] = useState({
    email: "",
    role: "user",
    firstName: "",
    lastName: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      await axios.post(`${API_URL}/users`, formData, {
        headers: getAuthHeader(),
      });
      setMessage("✅ User successfully created.");
      setFormData({ email: "", role: "user", firstName: "", lastName: "" });
    } catch (err) {
      setError("❌ Failed to create user.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">
        👤 Create Team Member
      </h1>

      {message && (
        <div className="text-green-600 font-medium bg-green-50 border border-green-200 rounded p-2 mb-4">
          {message}
        </div>
      )}
      {error && (
        <div className="text-red-600 font-medium bg-red-50 border border-red-200 rounded p-2 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-sm mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            className="w-full p-2 border rounded"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            className="w-full p-2 border rounded"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
