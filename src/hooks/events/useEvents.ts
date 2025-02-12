import { useState, useCallback } from "react";
import { Event } from "../../types/eventTypes";
import { getClientTimeZone } from "../utils/dateUtils";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Timezone: clientTimeZone,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar eventos");
        }

        const data = await response.json();
        console.log("Eventos recebidos:", data);

        // Garante que o estado seja atualizado com um novo array
        setEvents([...data]); // Cria uma cópia do array
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
