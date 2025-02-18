import React, { useEffect, useState } from "react";
import EventList from "./components/EventList";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./hooks/useAuth";
import { useEvents } from "./hooks/useEvents";
import { FaSearch } from "react-icons/fa";
import { Container, Button, Form, Row, Col } from "react-bootstrap"; // Importe componentes do Bootstrap
import "./App.css";

function App() {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const { events, fetchEvents, loading, error } = useEvents();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Aplica o tema ao carregar ou alterar o modo
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  // Busca os eventos ao autenticar
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, fetchEvents]);

  // Função para buscar eventos com intervalo de datas
  const handleFetchWithDates = () => {
    const clientTimeZoneOffset = new Date().getTimezoneOffset();
    const clientTimeZone = formatTimezoneOffset(clientTimeZoneOffset);
    const startISO = startDate
      ? new Date(startDate).toISOString().slice(0, -1) + clientTimeZone
      : undefined;
    let endISO;
    if (endDate) {
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999);
      endISO = end.toISOString().slice(0, -1) + clientTimeZone;
    }
    fetchEvents(startISO, endISO);
  };

  // Formata o offset do fuso horário
  const formatTimezoneOffset = (offset: number): string => {
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? "+" : "-";
    return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Container className="container-theme mt-5">
      <h1 className="text-center mb-4">Eventos do Google Calendar</h1>

      {isAuthenticated ? (
        <div>
          <Row className="justify-content-end mb-4 gap-2">
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? "Modo Claro" : "Modo Escuro"}
              </Button>
            </Col>
            <Col xs="auto">
              <LogoutButton onClick={handleLogout} />
            </Col>
          </Row>

          <Row className="mb-4 gap-2">
            <Col>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleFetchWithDates}>
                <FaSearch />
                Buscar
              </Button>
            </Col>
          </Row>

          <EventList events={events} />
        </div>
      ) : (
        <div className="text-center">
          <LoginButton onClick={handleLogin} />
        </div>
      )}
    </Container>
  );
}

export default App;
