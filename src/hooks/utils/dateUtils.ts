export const getClientTimeZone = (): string => {
  const offset = new Date().getTimezoneOffset(); // Offset em minutos
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? "+" : "-"; // Inverte o sinal
  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};
