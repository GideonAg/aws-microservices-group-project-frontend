// src/components/tasks/TaskForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createTask } from "../../services/api";

const TaskForm = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      responsibility: "",
      deadline: "",
      assignedUserEmail: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      responsibility: Yup.string().required("Required"),
      deadline: Yup.date().required("Required"),
      assignedUserEmail: Yup.string()
        .email("Invalid email")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await createTask({
          ...values,
          deadline: new Date(values.deadline).getTime(),
        });
        onSuccess();
      } catch (error) {
        setErrors({ general: "Failed to create task" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Create Task</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Task Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Responsibility</label>
          <input
            type="text"
            name="responsibility"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("responsibility")}
          />
          {formik.touched.responsibility && formik.errors.responsibility && (
            <p className="text-red-500 text-sm">
              {formik.errors.responsibility}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("deadline")}
          />
          {formik.touched.deadline && formik.errors.deadline && (
            <p className="text-red-500 text-sm">{formik.errors.deadline}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Assigned User Email</label>
          <input
            type="email"
            name="assignedUserEmail"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("assignedUserEmail")}
          />
          {formik.touched.assignedUserEmail &&
            formik.errors.assignedUserEmail && (
              <p className="text-red-500 text-sm">
                {formik.errors.assignedUserEmail}
              </p>
            )}
        </div>
        {formik.errors.general && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.general}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={formik.isSubmitting}
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
