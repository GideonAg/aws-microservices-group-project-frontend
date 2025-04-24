// src/components/tasks/TaskDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getTaskById, updateTask } from "../../services/api";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const response = await getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      console.error("Failed to fetch task:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      status: task?.status || "open",
      user_comment: task?.user_comment || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      status: Yup.string().oneOf(["open", "completed"]).required("Required"),
      user_comment: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateTask(taskId, values);
        fetchTask();
      } catch (error) {
        console.error("Failed to update task:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{task.name}</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Deadline:</strong> {format(new Date(task.deadline), "PPp")}
        </p>
        <p>
          <strong>Responsibility:</strong> {task.responsibility}
        </p>
        <p>
          <strong>Assigned:</strong> {task.assignedUserEmail}
        </p>
        <StatusBadge status={task.status} />
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("status")}
            >
              <option value="open">Open</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea
              name="user_comment"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("user_comment")}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={formik.isSubmitting}
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetail;
