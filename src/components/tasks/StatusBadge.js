import React from "react";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    open: "bg-blue-50 text-blue-600",
    completed: "bg-green-50 text-green-600",
    expired: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold w-fit ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
