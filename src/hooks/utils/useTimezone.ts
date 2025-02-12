const useTimezone = () => {
  const formatTimezoneOffset = (offset: number): string => {
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? "+" : "-";
    return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  return { formatTimezoneOffset };
};

export default useTimezone;
