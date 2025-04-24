import React, { useState } from "react";
import { forgotPassword, confirmForgotPassword } from "../../services/auth";
import { View, Heading, Button, TextField, Alert } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("request"); // 'request' or 'confirm'
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSuccess("Password reset code sent to your email");
      setError("");
      setStep("confirm");
    } catch (err) {
      setError(err.message || "Failed to send reset code");
      setSuccess("");
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmForgotPassword(email, code, newPassword);
      setSuccess("Password reset successfully");
      setError("");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
      setSuccess("");
    }
  };

  return (
    <View className="p-6 max-w-md mx-auto">
      <Heading level={3} className="mb-6">
        Forgot Password
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
      {step === "request" ? (
        <form onSubmit={handleRequest} className="space-y-4">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variation="primary" className="w-full">
            Send Reset Code
          </Button>
        </form>
      ) : (
        <form onSubmit={handleConfirm} className="space-y-4">
          <TextField label="Email" type="email" value={email} disabled />
          <TextField
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
            Reset Password
          </Button>
        </form>
      )}
      <Button
        variation="link"
        onClick={() => navigate("/login")}
        className="mt-4"
      >
        Back to Login
      </Button>
    </View>
  );
};

export default ForgotPassword;
