import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeamDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Team Member Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate("/team/my-tasks")}
        >
          <h2 className="text-xl font-semibold">My Tasks</h2>
          <p className="text-sm text-gray-600">View and manage your tasks</p>
        </div>
      </div>
    </div>
  );
}
