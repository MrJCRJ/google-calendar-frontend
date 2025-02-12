import { useState, useCallback } from "react";
import { Event } from "../../types/eventTypes"; // Importe a interface Event de um arquivo separado
import { getClientTimeZone } from "../utils/dateUtils"; // Mova a lógica de fuso horário para um utilitário

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar eventos com intervalo de datas opcional
  const fetchEvents = useCallback(
    async (startDate?: string, endDate?: string) => {
      console.log(
        `Buscando eventos de ${startDate || "∞"} a ${endDate || "∞"}...`
      );

      setLoading(true);
      setError(null);

      try {
        // Validação das datas
        if (startDate && isNaN(new Date(startDate).getTime())) {
          throw new Error("Data de início inválida.");
        }
        if (endDate && isNaN(new Date(endDate).getTime())) {
          throw new Error("Data de fim inválida.");
        }

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
        setError(
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao buscar eventos."
        );
      } finally {
        setLoading(false);
      }
    },
    [] // Dependências vazias: a função só é recriada se as dependências mudarem
  );

  return { events, fetchEvents, loading, error };
};
