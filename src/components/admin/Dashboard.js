import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { View, Heading, Card, Button } from "@aws-amplify/ui-react";

const AdminDashboard = () => {
  const { user, role } = useContext(AuthContext);

  if (role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <View className="p-6">
      <Heading level={2} className="mb-6">
        Admin Dashboard
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Heading level={4}>Team Management</Heading>
          <p className="my-2">Manage team members and onboard new users.</p>
          <Link to="/admin/team">
            <Button variation="primary">Go to Team Management</Button>
          </Link>
        </Card>
        <Card>
          <Heading level={4}>Tasks</Heading>
          <p className="my-2">Create, assign, and monitor tasks.</p>
          <Link to="/admin/tasks">
            <Button variation="primary">Go to Tasks Dashboard</Button>
          </Link>
        </Card>
        <Card>
          <Heading level={4}>Reports</Heading>
          <p className="my-2">View task and team performance reports.</p>
          <Link to="/admin/reports">
            <Button variation="primary">View Reports</Button>
          </Link>
        </Card>
      </div>
    </View>
  );
};

export default AdminDashboard;
