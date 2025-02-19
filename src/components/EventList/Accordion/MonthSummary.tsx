import React from "react";
import { differenceInMinutes, parseISO } from "date-fns";
import { CalendarEvent } from "../../../types/eventTypes";

interface MonthSummaryProps {
  days: {
    [day: string]: CalendarEvent[];
  };
}

const MonthSummary: React.FC<MonthSummaryProps> = ({ days }) => {
  const eventDurations: Record<string, number> = {};

  // Calcula o tempo total gasto por nome de evento
  Object.values(days).forEach((dayEvents) => {
    dayEvents.forEach((event) => {
      if (event.start && event.end) {
        const start = parseISO(event.start);
        const end = parseISO(event.end);
        const duration = differenceInMinutes(end, start);

        if (!eventDurations[event.title]) {
          eventDurations[event.title] = 0;
        }
        eventDurations[event.title] += duration;
      }
    });
  });

  return (
    <div>
      <h5>Resumo do Mês</h5>
      <ul>
        {Object.entries(eventDurations).map(([eventName, duration]) => (
          <li key={eventName}>
            <strong>{eventName}</strong>: {Math.floor(duration / 60)}h{" "}
            {duration % 60}min
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default MonthSummary;
