// src/components/admin/TasksDashboard.js
import React, { useState, useEffect, useContext } from "react";
import TaskList from "../tasks/TaskList";
import TaskForm from "../tasks/TaskForm";
import { getAllTasks } from "../../services/api";

const TasksDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      console.log(response.data);
      setTasks(response.data ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks Dashboard</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        {showForm ? "Cancel" : "Create Task"}
      </button>
      {showForm && <TaskForm onSuccess={fetchTasks} />}
      <TaskList tasks={tasks} onUpdate={fetchTasks} isAdmin />
    </div>
  );
};

export default TasksDashboard;
