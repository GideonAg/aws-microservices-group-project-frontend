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
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const role = getRole();
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks/${taskId}`, {
        headers: getAuthHeader(),
      });
      setTask(res.data);
      setAssignedTo(res.data.assignedUserEmail || "");
      setDeadline(format(new Date(res.data.deadline), "yyyy-MM-dd"));
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
      fetchTask();
    } catch (err) {
      console.log(err);
      setError("Failed to close task");
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const payload = {
        name: task.name,
        description: task.description,
        email: assignedTo,
        deadline: new Date(deadline).getTime(),
      };

      await axios.put(`${API_URL}/tasks/${taskId}`, payload, {
        headers: getAuthHeader(),
      });

      setMessage("Task updated successfully");
      fetchTask();
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!task) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>

      <div className="space-y-3">
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
          <strong>Status:</strong> {task.status}
        </p>

        {role === "admin" ? (
          <>
            <div>
              <label className="block font-semibold">Assigned To</label>
              <input
                type="email"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isUpdating ? "Updating..." : "Update Task"}
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Assigned To:</strong> {assignedTo}
            </p>
            <p>
              <strong>Deadline:</strong> {deadline}
            </p>
          </>
        )}
      </div>

      {role === "admin" && task.status !== "closed" && (
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
