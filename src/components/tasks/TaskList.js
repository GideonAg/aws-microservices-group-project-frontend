import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate, isAdmin = false }) => {
  return (
    <div className="space-y-4">
      {console.log(tasks)}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default TaskList;
