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
  const [status, setStatus] = useState(""); // For status editing
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
      setStatus(res.data.status); // Set the initial status from the fetched task
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
      setMessage("✅ Task successfully closed.");
      fetchTask();
    } catch (err) {
      console.log(err);
      setError("❌ Failed to close task.");
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
        status, // Include status in the update
      };

      await axios.put(`${API_URL}/tasks/${taskId}`, payload, {
        headers: getAuthHeader(),
      });

      setMessage("✅ Task updated successfully.");
      fetchTask();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update task.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!task) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">📝 Task Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-800">
        <div>
          <label className="font-semibold">Name</label>
          <p>{task.name}</p>
        </div>
        <div>
          <label className="font-semibold">Responsibility</label>
          <p>{task.responsibility}</p>
        </div>
        <div className="sm:col-span-2">
          <label className="font-semibold">Description</label>
          <p>{task.description}</p>
        </div>
        <div>
          <label className="font-semibold">Status</label>
          <p
            className={`inline-block px-2 py-1 rounded text-white ${
              task.status === "closed"
                ? "bg-gray-500"
                : task.status === "expired"
                ? "bg-red-500"
                : "bg-green-600"
            }`}
          >
            {task.status}
          </p>
        </div>

        {role === "admin" ? (
          <>
            <div>
              <label className="block font-semibold">Assigned To</label>
              <input
                type="email"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 mt-1 border rounded"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="sm:col-span-2 mt-2">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`px-4 py-2 rounded text-white ${
                  isUpdating ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isUpdating ? "Updating..." : "Update Task"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="font-semibold">Assigned To</label>
              <p>{assignedTo}</p>
            </div>
            <div>
              <label className="font-semibold">Deadline</label>
              <p>{deadline}</p>
            </div>
          </>
        )}
      </div>

      {role === "admin" && task.status !== "closed" && (
        <div className="mt-8">
          <label className="block font-semibold mb-1">Admin Comment</label>
          <textarea
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter comment before closing"
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

      {message && (
        <div className="mt-4 text-green-600 font-medium">{message}</div>
      )}
      {error && <div className="mt-4 text-red-500 font-medium">{error}</div>}
    </div>
  );
}
