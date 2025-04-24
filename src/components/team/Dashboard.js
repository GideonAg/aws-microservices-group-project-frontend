// src/components/team/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Team Member Dashboard</h2>
      <p className="mb-4">Welcome to your task management dashboard.</p>
      <Link
        to="/team/tasks"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        View My Tasks
      </Link>
    </div>
  );
};

export default Dashboard;
