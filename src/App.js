import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
// import Dashboard from "./components/shared/Dashboard";
import AdminDashboard from "./components/admin/Dashboard";
import TeamDashboard from "./components/team/Dashboard";
import MyTasks from "./components/team/MyTasks";
import TaskForm from "./components/tasks/TaskForm";
import TaskDetail from "./components/tasks/TaskDetail";
import TeamManagement from "./components/admin/TeamManagement";
import Reports from "./components/admin/Reports";
import TasksDashboard from "./components/admin/TasksDashboard";
import { getRole, getToken } from "./services/auth";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const role = getRole();
  if (!role || !getToken()) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
  return <Component />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/unauthorized"
          element={
            <div className="p-4 text-red-500 text-center">
              Unauthorized Access
            </div>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute element={AdminDashboard} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/admin/team"
          element={
            <PrivateRoute element={TeamManagement} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PrivateRoute element={TasksDashboard} allowedRoles={["admin"]} />
          }
        />

        {/* Team member routes */}
        <Route
          path="/team/dashboard"
          element={
            <PrivateRoute element={TeamDashboard} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/team/my-tasks"
          element={<PrivateRoute element={MyTasks} allowedRoles={["user"]} />}
        />

        <Route
          path="/tasks/new"
          element={<PrivateRoute element={TaskForm} allowedRoles={["admin"]} />}
        />
        <Route
          path="/tasks/:taskId/edit"
          element={<PrivateRoute element={TaskForm} allowedRoles={["admin"]} />}
        />
        <Route
          path="/tasks/:taskId"
          element={
            <PrivateRoute
              element={TaskDetail}
              allowedRoles={["admin", "user"]}
            />
          }
        />

        {/* Shared */}
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={Dashboard}
              allowedRoles={["admin", "user"]}
            />
          }
        /> */}
      </Routes>
    </Router>
  );
}
