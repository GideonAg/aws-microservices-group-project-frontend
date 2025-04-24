// src/App.js
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/admin/Dashboard";
import TeamDashboard from "./components/team/Dashboard";
import TeamManagement from "./components/admin/TeamManagement";
import TasksDashboard from "./components/admin/TasksDashboard";
import MyTasks from "./components/team/MyTasks";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/team" element={<TeamManagement />} />
          <Route path="/admin/tasks" element={<TasksDashboard />} />
          <Route path="/team/dashboard" element={<TeamDashboard />} />
          <Route path="/team/tasks" element={<MyTasks />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
