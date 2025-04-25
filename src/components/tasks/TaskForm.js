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
        setMessage("✅ Task updated successfully");
      } else {
        await axios.post(`${API_URL}/tasks`, payload, {
          headers: getAuthHeader(),
        });
        setMessage("✅ Task created successfully");
      }
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      setError("❌ Failed to submit task");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        {taskId ? "✏️ Edit Task" : "📝 Create Task"}
      </h1>

      {message && (
        <div className="text-green-600 bg-green-50 border border-green-200 p-2 rounded mb-4">
          {message}
        </div>
      )}
      {error && (
        <div className="text-red-500 bg-red-50 border border-red-200 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Task Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter task name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            className="w-full p-2 border rounded"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Responsibility</label>
          <input
            type="text"
            name="responsibility"
            placeholder="e.g. Finance Department"
            className="w-full p-2 border rounded"
            value={formData.responsibility}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            className="w-full p-2 border rounded"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Assign to (User Email)
          </label>
          <input
            type="email"
            name="assignedUserEmail"
            placeholder="user@example.com"
            className="w-full p-2 border rounded"
            value={formData.assignedUserEmail}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {taskId ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
