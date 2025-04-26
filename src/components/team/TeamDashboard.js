import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { View, Heading, Card, Button } from "@aws-amplify/ui-react";
import { useNavigate, Navigate } from "react-router-dom";

const TeamDashboard = () => {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <View className="p-6">
      <Heading level={2} className="mb-6">
        Team Dashboard
      </Heading>
      <Card>
        <Heading level={4}>My Tasks</Heading>
        <p className="my-2">View and manage your assigned tasks.</p>
        <Button variation="primary" onClick={() => navigate("/tasks")}>
          Go to My Tasks
        </Button>
      </Card>
      <Card className="mt-4">
        <Heading level={4}>Profile</Heading>
        <p className="my-2">View and update your profile information.</p>
        <Button variation="primary" onClick={() => navigate("/profile")}>
          Go to Profile
        </Button>
      </Card>
    </View>
  );
};

export default TeamDashboard;
