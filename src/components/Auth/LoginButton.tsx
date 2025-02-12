import React from "react";
import { FaGoogle } from "react-icons/fa";

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-primary btn-lg">
      <FaGoogle className="me-2" /> Login com Google
    </button>
  );
};

export default LoginButton;
