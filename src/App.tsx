import React, { useEffect } from "react";
import EventList from "./components/EventList";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./hooks/useAuth";
import { useEvents } from "./hooks/useEvents";

function App() {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const { events, fetchEvents } = useEvents();

  // Busca os eventos quando o usuário está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, fetchEvents]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Eventos do Google Calendar</h1>
      {isAuthenticated ? (
        <div>
          <div className="d-flex justify-content-end mb-4">
            <LogoutButton onClick={handleLogout} />
          </div>
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
