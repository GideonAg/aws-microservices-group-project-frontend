import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthHeader } from "../../services/auth";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks`, {
          headers: getAuthHeader(),
        });
        setTasks(res.data?.data || []);
      } catch {
        setError("Failed to load tasks");
      }
    };
    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "closed":
        return "bg-gray-600";
      case "expired":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      case "active":
      default:
        return "bg-green-600";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">🗂️ My Tasks</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {tasks.length === 0 ? (
        <p className="text-gray-600">You don't have any assigned tasks.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.taskId}
              className="p-5 border rounded-lg shadow-md bg-white hover:bg-gray-50 cursor-pointer transition"
              onClick={() => navigate(`/tasks/${task.taskId}`)}
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-blue-700">
                  {task.name}
                </h2>
                <span
                  className={`text-white text-xs px-2 py-1 rounded ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{task.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                📅 Deadline:{" "}
                <span className="font-medium">
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
