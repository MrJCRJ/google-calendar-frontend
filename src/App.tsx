import React, { useEffect, useState } from "react";
import EventList from "./components/EventList";
import LoginButton from "./components/Auth/LoginButton";
import LogoutButton from "./components/Auth/LogoutButton";
import { useAuth } from "./hooks/auth/useAuth";
import { useEvents } from "./hooks/events/useEvents";
import { FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./App.css";

function App() {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const { events, fetchEvents, loading, error } = useEvents();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, fetchEvents]);

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
    <div
      className="container mt-5"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <h1 className="text-center mb-4">Eventos do Google Calendar</h1>

      {isAuthenticated ? (
        <div>
          <div className="d-flex justify-content-end mb-4">
            <LogoutButton onClick={handleLogout} />
          </div>

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
            <button
              className="btn"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "10px 20px",
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onClick={handleFetchWithDates}
            >
              <FaSearch />
              Buscar
            </button>
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
