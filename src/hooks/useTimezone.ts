export const formatTimezoneOffset = (offset: number): string => {
  const sign = offset <= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
};

export const useTimezone = (): string => {
  const clientTimeZoneOffset = new Date().getTimezoneOffset();
  return formatTimezoneOffset(clientTimeZoneOffset);
};
