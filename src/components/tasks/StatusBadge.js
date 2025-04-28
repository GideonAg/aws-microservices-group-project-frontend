import React from "react";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    open: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    expired: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
