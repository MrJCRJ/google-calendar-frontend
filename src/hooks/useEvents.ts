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

  // Função para buscar eventos com intervalo de datas opcional
  const fetchEvents = useCallback(
    async (startDate?: string, endDate?: string) => {
      console.log(
        `Buscando eventos de ${startDate || "∞"} a ${endDate || "∞"}...`
      );

      try {
        // Monta a URL com os parâmetros de data se fornecidos
        const queryParams = new URLSearchParams();
        if (startDate) queryParams.append("startDate", startDate);
        if (endDate) queryParams.append("endDate", endDate);

        const url = `http://localhost:3002/events?${queryParams.toString()}`;

        const response = await fetch(url, {
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
    },
    [] // Dependências vazias: a função só é recriada se as dependências mudarem
  );

  return { events, fetchEvents };
};
