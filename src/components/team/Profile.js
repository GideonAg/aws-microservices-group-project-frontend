import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { View, Heading, Card, Text, Button } from "@aws-amplify/ui-react";
import { useNavigate, Navigate } from "react-router-dom";

const Profile = () => {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <View className="p-6 max-w-md mx-auto">
      <Heading level={2} className="mb-6">
        My Profile
      </Heading>
      <Card>
        <Text>
          <strong>Email:</strong> {user.username}
        </Text>
        <Text>
          <strong>First Name:</strong> {user.attributes?.given_name || "N/A"}
        </Text>
        <Text>
          <strong>Last Name:</strong> {user.attributes?.family_name || "N/A"}
        </Text>
        <Text>
          <strong>Role:</strong> {role}
        </Text>
        <Button
          variation="primary"
          onClick={() => navigate("/change-password")}
          className="mt-4"
        >
          Change Password
        </Button>
      </Card>
    </View>
  );
};

export default Profile;
