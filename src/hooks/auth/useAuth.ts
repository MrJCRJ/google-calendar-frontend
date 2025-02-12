import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    console.log("Verificando autenticação...");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log("Token encontrado, usuário autenticado.");
      localStorage.setItem("token", token); // Armazena o token no localStorage
      setIsAuthenticated(true);
    } else {
      console.log("Nenhum token encontrado, usuário não autenticado.");
      setIsAuthenticated(false);
    }
  }, []);

  // Função para iniciar o login
  const handleLogin = () => {
    console.log("Iniciando processo de login...");
    window.location.href = "http://localhost:3002/auth/google";
  };

  // Função para fazer logout
  const handleLogout = () => {
    console.log("Fazendo logout...");
    localStorage.removeItem("token"); // Remove o token do localStorage
    setIsAuthenticated(false); // Atualiza o estado de autenticação
    window.location.href = "/"; // Redireciona para a página inicial
  };

  return { isAuthenticated, handleLogin, handleLogout };
};
