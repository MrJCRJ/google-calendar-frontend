import React, { useEffect } from "react";
import EventList from "./components/EventList";
import LoginButton from "./components/Auth/LoginButton";
import LogoutButton from "./components/Auth/LogoutButton";
import DateFilter from "./components/DateFilter";
import { useAuth } from "./hooks/auth/useAuth";
import useEventFetch from "./hooks/events/useEventFetch";
import { useEvents } from "./hooks/events/useEvents";

function App() {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const { events, fetchEvents } = useEvents();
  const { handleFetchWithDates } = useEventFetch();

  // Busca os eventos automaticamente quando o usuário autentica
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, fetchEvents]);

  // Log para depuração
  useEffect(() => {
    console.log("Eventos atualizados:", events);
  }, [events]);

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#1E1E2F",
        color: "#FFFFFF",
        padding: "2rem",
        borderRadius: "8px",
      }}
    >
      <h1 className="text-center mb-4">Eventos do Google Calendar</h1>

      {isAuthenticated ? (
        <div>
          <div className="d-flex justify-content-end mb-4">
            <LogoutButton onClick={handleLogout} />
          </div>

          {/* Filtros de data */}
          <DateFilter onFetchWithDates={handleFetchWithDates} />

          {/* Lista de eventos */}
          <EventList events={events} />
        </div>
      ) : (
        <div className="text-center">
          <LoginButton onClick={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
