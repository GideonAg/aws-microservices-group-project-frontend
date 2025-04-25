import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAuthHeader, getRole } from "../../services/auth";
import { format } from "date-fns";

export default function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://your-api.execute-api.region.amazonaws.com/dev";

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks/${taskId}`, {
        headers: getAuthHeader(),
      });
      setTask(res.data);
    } catch {
      setError("Failed to load task");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleClose = async () => {
    try {
      await axios.post(
        `${API_URL}/tasks/${taskId}/close`,
        { adminComment: comment },
        { headers: getAuthHeader() }
      );
      setMessage("Task successfully closed");
    } catch {
      setError("Failed to close task");
    }
  };

  if (!task) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {task.name}
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Responsibility:</strong> {task.responsibility}
        </p>
        <p>
          <strong>Assigned To:</strong> {task.assignedUserEmail}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Deadline:</strong>{" "}
          {format(new Date(task.deadline), "yyyy-MM-dd")}
        </p>
      </div>

      {getRole() === "admin" && task.status !== "closed" && (
        <div className="mt-6">
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Admin Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          <button
            onClick={handleClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close Task
          </button>
        </div>
      )}

      {message && <div className="text-green-600 mt-4">{message}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
