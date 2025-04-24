import React, { useState, useEffect } from "react";
import TaskList from "../tasks/TaskList";
import { getAllTasks } from "../../services/api";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <TaskList tasks={tasks} onUpdate={fetchTasks} />
    </div>
  );
};

export default MyTasks;
