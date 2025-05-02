import React from "react";

const StatusBadge = ({ status = "" }) => {
  const statusStyles = {
    open: "bg-blue-50 text-blue-600",
    completed: "bg-green-50 text-green-600",
    complete: "bg-green-50 text-green-600",
    expired: "bg-red-50 text-red-600",
  };

  const normalizedStatus = status.toLowerCase();
  const badgeStyle = statusStyles[normalizedStatus] || "bg-gray-100 text-gray-800";
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold w-fit ${badgeStyle}`}
    >
      {formattedStatus}
    </span>
  );
};

export default StatusBadge;
