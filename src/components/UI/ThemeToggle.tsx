import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Button } from "react-bootstrap";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <Button variant="secondary" onClick={toggleDarkMode}>
      {isDarkMode ? <FaSun /> : <FaMoon />}{" "}
      {isDarkMode ? "Modo Claro" : "Modo Escuro"}
    </Button>
  );
};

export default ThemeToggle;
