import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuthHeader } from "../../services/auth";
import { format } from "date-fns";

export default function TaskForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    responsibility: "",
    deadline: "",
    assignedUserEmail: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
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
    if(name == "deadline") {
      const selectedDeadline = new Date(value);
      const currentTime = new Date();
      
      if (selectedDeadline > currentTime) {
        // Use format that includes both date and time for 'datetime-local' input
        setFormData((prev) => ({ ...prev, [name]: value }));
      } else {
        setError("Deadline should be greater than the current date and time");
        setTimeout(() => setError(""), 5000);
      }
    }
    else {
      
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      setIsCreating(true);
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

      if(onSuccess) {
        onSuccess();
      }
      if(onClose) {
        onClose();
      }
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      setError("❌ Failed to submit task " + err);
    }
    finally{
      setIsCreating(false);
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
          <label className="block font-bold mb-1 text-xs">Task Name</label>
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
          <label className="block font-bold mb-1 text-xs">Description</label>
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
          <label className="block font-bold mb-1 text-xs">Responsibility</label>
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
          <label className="block font-bold mb-1 text-xs">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            className="w-full p-2 border rounded"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1 text-xs">
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
          className="w-full bg-[#FF5A00] text-white py-2 rounded hover:bg-[#FF5A00]/80 transition"
        >
          {isCreating ? (
            <div className="flex flex-row gap-x-2 items-center justify-center">
                Creating
                <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                ></path>
              </svg>
            </div>
          ) : "Create Task"}
        </button>
      </form>
    </div>
  );
}
