import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuthHeader, getRole } from "../../services/auth";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";
import { div } from "framer-motion/client";

export default function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(""); // State for toast message
  const [error, setError] = useState(""); // State for error message
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUserIsUpdating, setIsUserUpdating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [userComment, setUserComment] = useState("");
  const navigate = useNavigate();

  const role = getRole();
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks/${taskId}`, {
        headers: getAuthHeader(),
      });
      setTask(res.data);
      setName(res.data.name);
      setDescription(res.data.description);
      setResponsibility(res.data.responsibility);
      setAssignedTo(res.data.assignedUserEmail || "");

      // Format the deadline for the 'datetime-local' input
      const formattedDeadline = format(
        new Date(res.data.deadline),
        "yyyy-MM-dd'T'HH:mm"
      );
      setDeadline(formattedDeadline);

      setStatus(res.data.status);
      setUserComment(res.data.userComment || "");
    } catch {
      setError("Failed to load task");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleDeadlineChange = async (e) => {
    const selectedDeadline = new Date(e.target.value);
    const currentTime = new Date();

    if (selectedDeadline > currentTime) {
      // Use format that includes both date and time for 'datetime-local' input
      setDeadline(e.target.value);
    } else {
      setError("Deadline should be greater than the current date and time");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleClose = async () => {
    setIsClosing(true);
    try {
      await axios.post(
        `${API_URL}/tasks/${taskId}/close`,
        { adminComment: comment },
        { headers: getAuthHeader() }
      );
      setMessage("✅ Task successfully closed.");
      setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
      fetchTask();
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/team/dashboard");
        }
      }, 1000);
    } catch (err) {
      setError("❌ Failed to close task.");
      setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
    } finally {
      setIsClosing(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const payload = {
        name,
        description,
        responsibility,
        assignedUserEmail: assignedTo,
        deadline: new Date(deadline).getTime(),
        status,
      };
      console.log(payload.deadline, "DEADLINE");

      let response = await axios.put(`${API_URL}/tasks/${taskId}`, payload, {
        headers: getAuthHeader(),
      });

      if (response.status == 200) {
        setMessage("✅ Task updated successfully.");
        setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
        fetchTask();
        // Redirect based on role after a short delay
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/team/dashboard");
          }
        }, 1000);
      } else {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
      }
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!task)
    return (
      <div className="w-full flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
      {/* Toast Message */}
      {message && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow z-50">
          {error}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 border-b pb-2">📝 Task Details</h1>
      <div>
        <StatusBadge status={task.status} />
      </div>

      {/* Task Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-800">
        <div>
          <label className="block font-semibold">Name</label>
          {role === "admin" ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p>{task.name}</p>
          )}
        </div>

        {/* Responsibility Input or Display */}
        <div>
          <label className="block font-semibold">Responsibility</label>
          {role === "admin" ? (
            <input
              type="text"
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p>{task.responsibility}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold">Description</label>
          {role === "admin" ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              rows={3}
            />
          ) : (
            <p>{task.description}</p>
          )}
        </div>

        {/* Admin Specific Fields */}
        {role === "admin" && (
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
                type="datetime-local"
                value={deadline}
                onChange={handleDeadlineChange}
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div className="sm:col-span-2 mt-2">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`px-4 py-2 rounded text-white ${
                  isUpdating
                    ? "bg-[#FF5A00]/80"
                    : "bg-[#FF5A00] hover:bg-[#FF5A00]/80"
                }`}
              >
                {isUpdating ? (
                  <div className="flex flex-row gap-x-2 items-center">
                    Updating
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
                ) : (
                  "Update Task"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Close Task Button */}
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
            {isClosing ? (
              <div className="flex flex-row gap-x-2 items-center">
                Closing
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
            ) : (
              "Close Task"
            )}
          </button>
        </div>
      )}

      {/* User comment and status */}
      {role === "user" && task.status !== "closed" && (
        <div className="mt-8">
          <label className="block font-semibold mb-1">Your Comment</label>
          <textarea
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter a comment about the task"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />

          <label className="block font-semibold mb-1">Update Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="complete">Complete</option>
          </select>

          <button
            onClick={async () => {
              setIsUserUpdating(true);
              try {
                await axios.put(
                  `${API_URL}/tasks/${taskId}`,
                  { status: "complete", userComment: comment },
                  { headers: getAuthHeader() }
                );
                setMessage("✅ Task updated successfully.");
                setTimeout(() => setMessage(""), 5000);
                setComment("");
                fetchTask();
                setTimeout(() => {
                  if (role === "admin") {
                    navigate("/admin/dashboard");
                  } else {
                    navigate("/team/dashboard");
                  }
                }, 1000);
              } catch (err) {
                setError("❌ Failed to update task.");
                setTimeout(() => setError(""), 5000);
              } finally {
                setIsUserUpdating(false);
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isUserIsUpdating ? (
              <div className="flex flex-row gap-x-2 items-center">
                Updating
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
            ) : (
              "Submit Update"
            )}
          </button>
        </div>
      )}

      {/* User's completion comment */}
      {task.status === "closed" && userComment && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold text-gray-700 mb-2">
            💬 User's Completion Comment:
          </h2>
          <p className="text-gray-800 whitespace-pre-wrap">{userComment}</p>
        </div>
      )}
    </div>
  );
}
