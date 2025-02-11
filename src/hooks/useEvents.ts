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

  // Função para obter o fuso horário do cliente no formato '-03:00'
  const getClientTimeZone = (): string => {
    const offset = new Date().getTimezoneOffset(); // Offset em minutos
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? "+" : "-"; // Inverte o sinal
    return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

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

        // Obtém o fuso horário do cliente
        const clientTimeZone = getClientTimeZone();

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Envia o token no cabeçalho
            Timezone: clientTimeZone, // Envia o fuso horário no cabeçalho
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
