import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeamDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        👥 Team Member Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="p-6 border rounded-lg shadow bg-white hover:bg-gray-50 transition cursor-pointer"
          onClick={() => navigate("/team/my-tasks")}
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-1">
            📋 My Tasks
          </h2>
          <p className="text-sm text-gray-600">
            View and manage the tasks assigned to you.
          </p>
        </div>
      </div>
    </div>
  );
}
