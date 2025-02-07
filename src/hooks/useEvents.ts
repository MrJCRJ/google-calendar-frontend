import { useState, useCallback } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Função para buscar os eventos (memoizada com useCallback)
  const fetchEvents = useCallback(async () => {
    console.log("Buscando eventos...");
    try {
      const response = await fetch("http://localhost:3002/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Envia o token no cabeçalho
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
      }
      const data = await response.json();
      console.log("Eventos recebidos:", data);
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }, []); // Dependências vazias: a função só é recriada se as dependências mudarem

  return { events, fetchEvents };
};
