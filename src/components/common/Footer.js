import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-center py-6 mt-12 text-sm text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} Task Management System. All rights
        reserved.
      </p>
      <p className="text-xs mt-2">Made with ❤️ by AWS group project Team ONE</p>
    </footer>
  );
};

export default Footer;
