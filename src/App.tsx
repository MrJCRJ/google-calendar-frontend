import React, { useEffect, useState } from "react";
import EventList from "./components/EventList";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./hooks/useAuth";
import { useEvents } from "./hooks/useEvents";

function App() {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const { events, fetchEvents } = useEvents();

  // Estados para armazenar as datas do filtro
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Busca os eventos automaticamente quando o usuário autentica
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, fetchEvents]);

  // Função para buscar eventos com o intervalo escolhido
  const handleFetchWithDates = () => {
    const startISO = startDate ? new Date(startDate).toISOString() : undefined;

    let endISO;
    if (endDate) {
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999); // Agora, garantindo que é UTC direto
      endISO = end.toISOString();
    }

    // Log para depuração
    console.log("[DEBUG] startDate:", startDate, "->", startISO);
    console.log("[DEBUG] endDate:", endDate, "->", endISO);

    fetchEvents(startISO, endISO);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Eventos do Google Calendar</h1>

      {isAuthenticated ? (
        <div>
          <div className="d-flex justify-content-end mb-4">
            <LogoutButton onClick={handleLogout} />
          </div>

          {/* Filtros de data */}
          <div className="mb-4 d-flex gap-2">
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleFetchWithDates}>
              Buscar
            </button>
          </div>

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
