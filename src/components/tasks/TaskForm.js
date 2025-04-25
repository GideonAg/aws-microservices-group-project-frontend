import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuthHeader } from "../../services/auth";
import { format } from "date-fns";

export default function TaskForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    responsibility: "",
    deadline: "",
    assignedUserEmail: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { taskId } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (taskId) {
      axios
        .get(`${API_URL}/tasks/${taskId}`, { headers: getAuthHeader() })
        .then((res) => {
          const {
            name,
            description,
            responsibility,
            deadline,
            assignedUserEmail,
          } = res.data;
          setFormData({
            name,
            description,
            responsibility,
            deadline: format(new Date(deadline), "yyyy-MM-dd"),
            assignedUserEmail,
          });
        })
        .catch(() => setError("Failed to fetch task"));
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const payload = {
        ...formData,
        deadline: new Date(formData.deadline).getTime(),
      };
      if (taskId) {
        await axios.put(`${API_URL}/tasks/${taskId}`, payload, {
          headers: getAuthHeader(),
        });
        setMessage("Task updated successfully");
      } else {
        await axios.post(`${API_URL}/tasks`, payload, {
          headers: getAuthHeader(),
        });
        setMessage("Task created successfully");
      }
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      setError("Failed to submit task");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {taskId ? "Edit Task" : "Create Task"}
      </h1>
      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="responsibility"
          placeholder="Responsibility"
          className="w-full p-2 border rounded"
          value={formData.responsibility}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="deadline"
          className="w-full p-2 border rounded"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="assignedUserEmail"
          placeholder="Assign to (User Email)"
          className="w-full p-2 border rounded"
          value={formData.assignedUserEmail}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {taskId ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
