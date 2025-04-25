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
        setTasks(res.data);
      } catch {
        setError("Failed to load tasks");
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid gap-4">
        {tasks.length === 0 && <p>No tasks assigned.</p>}
        {tasks.map((task) => (
          <div
            key={task.taskId}
            className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/tasks/${task.taskId}`)}
          >
            <h2 className="text-xl font-semibold">{task.name}</h2>
            <p className="text-sm text-gray-700">{task.description}</p>
            <p className="text-sm">
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
            <p className="text-sm">Status: {task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
