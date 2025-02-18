import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-danger btn-sm" // Classes do Bootstrap
    >
      <FaSignOutAlt />
      Logout
    </button>
  );
};

export default LogoutButton;
