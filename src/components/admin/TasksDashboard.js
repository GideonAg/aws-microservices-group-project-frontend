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
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Tasks Dashboard
      </h2>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow-md transition duration-300"
        >
          {showForm ? "Cancel" : "Create Task"}
        </button>
        <div className="text-sm text-gray-500">Total Tasks: {tasks.length}</div>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <TaskForm onSuccess={fetchTasks} />
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TaskList tasks={tasks} onUpdate={fetchTasks} isAdmin />
      </div>
    </div>
  );
};

export default TasksDashboard;
