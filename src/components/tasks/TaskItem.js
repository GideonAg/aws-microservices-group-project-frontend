import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
import { closeTask } from "../../services/api";

const TaskItem = ({ task, onUpdate, isAdmin }) => {
  const navigate = useNavigate();

  const handleClose = async () => {
    try {
      await closeTask(task.taskId, { adminComment: "Task closed" });
      onUpdate();
    } catch (error) {
      console.error("Failed to close task:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{task.name}</h3>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm">
          Deadline: {format(new Date(task.deadline), "PPp")}
        </p>
        <StatusBadge status={task.status} />
      </div>
      <div className="space-x-2">
        <button
          onClick={() => navigate(`/tasks/${task.taskId}`)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          View
        </button>
        {isAdmin && task.status === "expired" && (
          <button
            onClick={handleClose}
            className="bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
