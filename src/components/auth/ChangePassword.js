import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { changePassword } from "../../services/auth";
import { View, Heading, Button, TextField, Alert } from "@aws-amplify/ui-react";
import { useNavigate, Navigate } from "react-router-dom";

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(oldPassword, newPassword);
      setSuccess("Password changed successfully");
      setError("");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setError(err.message || "Failed to change password");
      setSuccess("");
    }
  };

  return (
    <View className="p-6 max-w-md mx-auto">
      <Heading level={3} className="mb-6">
        Change Password
      </Heading>
      {error && (
        <Alert variation="error" className="mb-4">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variation="success" className="mb-4">
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Current Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button type="submit" variation="primary" className="w-full">
          Change Password
        </Button>
      </form>
      <Button
        variation="link"
        onClick={() => navigate("/profile")}
        className="mt-4"
      >
        Back to Profile
      </Button>
    </View>
  );
};

export default ChangePassword;
