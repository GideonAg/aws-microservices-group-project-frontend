import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
import { closeTask } from "../../services/api";

const TaskItem = ({ task, onUpdate, isAdmin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // State for the toast message

  const handleClose = async () => {
    setLoading(true);
    try {
      await closeTask(task.taskId, { adminComment: "Task closed" });
      setToastMessage("Task successfully closed!"); // Set success message
      setTimeout(() => setToastMessage(""), 5000); // Clear message after 5 seconds
      onUpdate();
    } catch (error) {
      console.error("Failed to close task:", error);
      setToastMessage("Failed to close task."); // Set error message
      setTimeout(() => setToastMessage(""), 5000); // Clear message after 5 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 bg-transparent p-2">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed top-20 right-4 bg-green-100 text-green-600 font-bold px-4 py-2 rounded z-50">
          {toastMessage}
        </div>
      )}
      
      <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between items-start gap-y-4">
        <div className="flex flex-col gap-y-5 w-full">
          <div className="h-20">
            <StatusBadge status={task.status} />
            <h3 className="text-lg font-bold">{task.name}</h3>
          </div>
          <div className="h-20 text-ellipsis">
            <p className="text-gray-600">{task.description}</p>
          </div>
          <p className="text-sm">
            Deadline: {format(new Date(task.deadline), "PPp")}
          </p>
          <div className="flex flex-row gap-x-2 items-center">
            <button
              onClick={() => navigate(`/tasks/${task.taskId}`)}
              className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
            >
              View
            </button>
            {isAdmin && task.status === "expired" && (
              <button
                onClick={handleClose}
                className="bg-red-500 text-white px-2 py-1 text-xs rounded flex items-center gap-x-1"
                disabled={loading}
              >
                {loading ? (
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
                ) : (
                  "Close"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
