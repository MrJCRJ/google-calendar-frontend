import React, { useEffect, useState, useCallback } from "react";
import EventList from "./components/EventList";
import LoginButton from "./components/Auth/LoginButton";
import LogoutButton from "./components/Auth/LogoutButton";
import { useAuth } from "./hooks/auth/useAuth";
import { useEvents } from "./hooks/events/useEvents";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./App.css";

const App: React.FC = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const { events, fetchEvents, loading, error } = useEvents();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Alterna o tema e salva a preferência do usuário
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  // Aplica o tema ao carregar
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // Busca eventos automaticamente quando o usuário está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, fetchEvents]);

  // Busca eventos dentro do intervalo de datas informado
  const handleFetchWithDates = useCallback(() => {
    const formatTimezoneOffset = (offset: number): string => {
      const sign = offset <= 0 ? "+" : "-";
      const hours = Math.floor(Math.abs(offset) / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
      return `${sign}${hours}:${minutes}`;
    };

    const clientTimeZoneOffset = new Date().getTimezoneOffset();
    const clientTimeZone = formatTimezoneOffset(clientTimeZoneOffset);

    const startISO = startDate
      ? new Date(startDate).toISOString().slice(0, -1) + clientTimeZone
      : undefined;

    const endISO = endDate
      ? new Date(`${endDate}T23:59:59.999Z`).toISOString().slice(0, -1) +
        clientTimeZone
      : undefined;

    fetchEvents(startISO, endISO);
  }, [startDate, endDate, fetchEvents]);

  return (
    <Container className="container-theme mt-5">
      <h1 className="text-center mb-4">Eventos do Google Calendar</h1>

      {isAuthenticated ? (
        <>
          <Row className="justify-content-between align-items-center mb-4">
            <Col xs="auto">
              <Button variant="secondary" onClick={toggleDarkMode}>
                {isDarkMode ? <FaSun /> : <FaMoon />}{" "}
                {isDarkMode ? "Modo Claro" : "Modo Escuro"}
              </Button>
            </Col>
            <Col xs="auto">
              <LogoutButton onClick={handleLogout} />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={5}>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
            <Col md={5}>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
            <Col md="auto">
              <Button variant="primary" onClick={handleFetchWithDates}>
                <FaSearch /> Buscar
              </Button>
            </Col>
          </Row>

          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" role="status" />
            </div>
          )}

          {error && (
            <Alert variant="danger">Erro ao carregar eventos: {error}</Alert>
          )}

          <EventList events={events} />
        </>
      ) : (
        <div className="text-center">
          <LoginButton onClick={handleLogin} />
        </div>
      )}
    </Container>
  );
};

export default App;
