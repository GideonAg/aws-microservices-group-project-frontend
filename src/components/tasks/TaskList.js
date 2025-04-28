import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate, isAdmin = false }) => {
  return (
    <div className="flex flex-row flex-wrap w-full">
      {tasks.map((task) => (
        <TaskItem
          key={task.taskId}
          task={task}
          onUpdate={onUpdate}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default TaskList;
