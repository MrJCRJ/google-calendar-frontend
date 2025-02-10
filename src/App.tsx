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
    // Obtém o fuso horário do cliente (ex: -03:00 para Brasília)
    const clientTimeZoneOffset = new Date().getTimezoneOffset(); // Em minutos
    const clientTimeZone = formatTimezoneOffset(clientTimeZoneOffset); // Formata para -03:00

    // Converte startDate para o formato com fuso horário do cliente
    const startISO = startDate
      ? new Date(startDate).toISOString().slice(0, -1) + clientTimeZone
      : undefined;

    // Converte endDate para o formato com fuso horário do cliente
    let endISO;
    if (endDate) {
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999); // Define o horário final do dia
      endISO = end.toISOString().slice(0, -1) + clientTimeZone;
    }

    // Log para depuração
    console.log("[DEBUG] startDate:", startDate, "->", startISO);
    console.log("[DEBUG] endDate:", endDate, "->", endISO);

    fetchEvents(startISO, endISO);
  };

  // Função para formatar o offset do fuso horário (ex: -180 -> "-03:00")
  const formatTimezoneOffset = (offset: number): string => {
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? "+" : "-"; // Inverte o sinal porque getTimezoneOffset retorna valores negativos para fusos positivos
    return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
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
