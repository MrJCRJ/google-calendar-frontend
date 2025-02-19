import React, { useEffect, useState, useCallback } from "react";
import EventList from "./components/EventList";
import LoginButton from "./components/Auth/LoginButton";
import LogoutButton from "./components/Auth/LogoutButton";
import ThemeToggle from "./components/UI/ThemeToggle";
import EventFilter from "./components/EventList/EventFilter";
import { useAuth } from "./hooks/auth/useAuth";
import { useEvents } from "./hooks/events/useEvents";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useDarkMode } from "./hooks/useDarkMode";
import { formatTimezoneOffset } from "./hooks/useTimezone";
import "./App.css";

const App: React.FC = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const { events, fetchEvents, loading, error } = useEvents();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (isAuthenticated) fetchEvents();
  }, [isAuthenticated, fetchEvents]);

  const handleFetchWithDates = useCallback(() => {
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
              <ThemeToggle
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </Col>
            <Col xs="auto">
              <LogoutButton onClick={handleLogout} />
            </Col>
          </Row>

          <EventFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleFetchWithDates={handleFetchWithDates}
          />

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
