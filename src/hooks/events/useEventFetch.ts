import { useEvents } from "./useEvents";
import useTimezone from "../utils/useTimezone";

const useEventFetch = () => {
  const { fetchEvents } = useEvents();
  const { formatTimezoneOffset } = useTimezone();

  const handleFetchWithDates = (startDate: string, endDate: string) => {
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

    console.log("[DEBUG] startDate:", startDate, "->", startISO);
    console.log("[DEBUG] endDate:", endDate, "->", endISO);

    fetchEvents(startISO, endISO);
  };

  return { handleFetchWithDates };
};

export default useEventFetch;
