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
    console.log("useEffect executado");
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, fetchEvents]); // fetchEvents está memoizada, então não causa renderizações desnecessárias

  return (
    <div>
      <h1>Eventos do Google Calendar</h1>
      {isAuthenticated ? (
        <div>
          <LogoutButton onClick={handleLogout} />
          <EventList events={events} />
        </div>
      ) : (
        <LoginButton onClick={handleLogin} />
      )}
    </div>
  );
}

export default App;
