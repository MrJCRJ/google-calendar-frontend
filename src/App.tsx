import React, { useEffect, useState } from "react";
import EventList from "./components/EventList";

// Definindo o tipo para os eventos
interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  // Função para iniciar a autenticação
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  // Função para buscar os eventos
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  // Verifica se o usuário está autenticado e busca os eventos
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Se houver um token, o usuário está autenticado
      fetchEvents();
    }
  }, []);

  return (
    <div>
      <h1>Eventos do Google Calendar</h1>
      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <button onClick={handleLogin}>Login com Google</button>
      )}
    </div>
  );
}

export default App;
