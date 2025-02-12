import React from "react";

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-danger btn-sm" // Classes do Bootstrap
    >
      Logout
    </button>
  );
};

export default LogoutButton;
