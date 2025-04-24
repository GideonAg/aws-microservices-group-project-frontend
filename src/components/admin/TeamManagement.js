import React, { useState } from "react";
import UserForm from "./UserForm";

const TeamManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSuccess = () => {
    setShowForm(false);
    setSuccessMessage("User created successfully");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Team Management</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        {showForm ? "Cancel" : "Add Team Member"}
      </button>

      {showForm && <UserForm onSuccess={handleSuccess} />}
    </div>
  );
};

export default TeamManagement;
