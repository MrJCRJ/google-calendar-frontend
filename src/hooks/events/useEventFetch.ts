import { useEvents } from "./useEvents";
import useTimezone from "../utils/useTimezone";

const useEventFetch = () => {
  const { fetchEvents } = useEvents();
  const { formatTimezoneOffset } = useTimezone();

  const handleFetchWithDates = async (startDate: string, endDate: string) => {
    try {
      // Validação das datas
      if (!startDate || !endDate) {
        console.error("Datas de início e fim são obrigatórias.");
        return;
      }

      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        console.error("Datas inválidas.");
        return;
      }

      // Obtém o fuso horário do cliente
      const clientTimeZoneOffset = new Date().getTimezoneOffset();
      const clientTimeZone = formatTimezoneOffset(clientTimeZoneOffset);

      // Formata a data de início
      const startISO = startDateObj.toISOString().slice(0, -1) + clientTimeZone;

      // Formata a data de fim (final do dia)
      const endDateEndOfDay = new Date(endDateObj);
      endDateEndOfDay.setUTCHours(23, 59, 59, 999);
      const endISO =
        endDateEndOfDay.toISOString().slice(0, -1) + clientTimeZone;

      // Logs para depuração
      console.log("[DEBUG] startDate:", startDate, "->", startISO);
      console.log("[DEBUG] endDate:", endDate, "->", endISO);

      // Chama a função para buscar os eventos
      await fetchEvents(startISO, endISO);
    } catch (error) {
      console.error("Erro ao buscar eventos com filtro de datas:", error);
    }
  };

  return { handleFetchWithDates };
};

export default useEventFetch;
