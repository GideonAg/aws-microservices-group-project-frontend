import React from "react";
import { useNavigate } from "react-router-dom";
import TasksDashboard from "./TasksDashboard";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        Admin Dashboard
      </h1>

      <div className="flex flex-col w-full">
        <TasksDashboard />
        {/* <div
          className="p-6 bg-white border rounded-lg shadow hover:bg-gray-50 cursor-pointer transition"
          onClick={() => navigate("/admin/team")}
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-1">
            👥 Team Management
          </h2>
          <p className="text-sm text-gray-600">Add or update team members.</p>
        </div>

        <div
          className="p-6 bg-white border rounded-lg shadow hover:bg-gray-50 cursor-pointer transition"
          onClick={() => navigate("/tasks/new")}
        >
          <h2 className="text-xl font-semibold text-green-700 mb-1">
            📝 Create Task
          </h2>
          <p className="text-sm text-gray-600">Assign a new task to users.</p>
        </div>

        <div
          className="p-6 bg-white border rounded-lg shadow hover:bg-gray-50 cursor-pointer transition"
          onClick={() => navigate("/admin/reports")}
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-1">
            📊 Reports
          </h2>
          <p className="text-sm text-gray-600">
            View task performance reports.
          </p>
        </div> */}
      </div>
    </div>
  );
}
