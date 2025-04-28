import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllTasks } from "../../services/api";
import { Navigate } from "react-router-dom";
import {
  View,
  Heading,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
} from "@aws-amplify/ui-react";
import { format } from "date-fns";

const Reports = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getAllTasks();
        setTasks(allTasks?.data);
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <View className="p-6">
      <Heading level={2} className="mb-6">
        Task Reports
      </Heading>
      {error && (
        <Alert variation="error" className="mb-4">
          {error}
        </Alert>
      )}
      {loading ? (
        <p>Loading reports...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <Table highlightOnHover>
          <TableHead>
            <TableRow>
              <TableCell as="th">Name</TableCell>
              <TableCell as="th">Status</TableCell>
              <TableCell as="th">Assigned To</TableCell>
              <TableCell as="th">Deadline</TableCell>
              <TableCell as="th">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.assignedUserEmail}</TableCell>
                <TableCell>
                  {task.deadline
                    ? format(new Date(task.deadline), "PPp")
                    : "N/A"}
                </TableCell>
                <TableCell>{task.user_comment || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </View>
  );
};

export default Reports;
