import React from "react";

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary btn-lg" // Classes do Bootstrap
    >
      Login com Google
    </button>
  );
};

export default LoginButton;
