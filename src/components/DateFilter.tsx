import React, { useState } from "react";

interface DateFilterProps {
  onFetchWithDates: (startDate: string, endDate: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFetchWithDates }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFetchWithDates = () => {
    onFetchWithDates(startDate, endDate);
  };

  return (
    <div className="mb-4 d-flex gap-2">
      <input
        type="date"
        className="form-control"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        className="form-control"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleFetchWithDates}>
        Buscar
      </button>
    </div>
  );
};

export default DateFilter;
