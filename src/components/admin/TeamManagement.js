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
      setMessage("User successfully created");
      setFormData({ email: "", role: "user", firstName: "", lastName: "" });
    } catch (err) {
      setError("Failed to create user");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Team Member</h1>
      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
