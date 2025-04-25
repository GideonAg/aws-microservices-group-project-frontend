import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate("/admin/team")}
        >
          <h2 className="text-xl font-semibold">Team Management</h2>
          <p className="text-sm text-gray-600">Add or update team members</p>
        </div>
        <div
          className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate("/tasks/new")}
        >
          <h2 className="text-xl font-semibold">Create Task</h2>
          <p className="text-sm text-gray-600">Assign a new task to users</p>
        </div>
        <div
          className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate("/admin/reports")}
        >
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="text-sm text-gray-600">View task reports</p>
        </div>
      </div>
    </div>
  );
}
