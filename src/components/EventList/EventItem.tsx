import React from "react";
import { FaClock, FaExternalLinkAlt, FaTasks } from "react-icons/fa";
import { CalendarEvent } from "../../types/eventTypes";
import {
  formatDate,
  formatMinutesToHours,
  calculateDuration,
} from "../../utils/dateUtils";

// Interface para as props do componente
interface EventItemProps {
  event: CalendarEvent; // O evento a ser exibido
}

/**
 * Componente `EventItem`:
 * Exibe os detalhes de um evento do calendário, incluindo título, data, duração e descrição.
 * Também fornece um link para visualizar o evento no Google Calendar.
 */
const EventItem: React.FC<EventItemProps> = ({ event }) => {
  // Formata a data de início e fim do evento
  const formattedStartDate = formatDate(event.start);
  const formattedEndDate = formatDate(event.end);

  // Calcula a duração do evento em minutos e formata para horas
  const eventDuration = calculateDuration(event.start, event.end);
  const formattedDuration = formatMinutesToHours(eventDuration);

  return (
    <li
      className="list-group-item mb-3 shadow-sm"
      style={{
        backgroundColor: "#2D2D44",
        color: "#FFFFFF",
        borderColor: "#3A3A4F",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <strong className="h5">{event.title}</strong>
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary btn-sm"
          style={{ color: "#4A90E2", borderColor: "#4A90E2" }}
        >
          <FaExternalLinkAlt className="mr-2" />
          Ver no Google Calendar
        </a>
      </div>
      <p className="mb-1 text-muted" style={{ color: "#E0E0E0" }}>
        <FaClock className="mr-2" />
        {formatDate(event.start)} até {formatDate(event.end)}
      </p>
      <p className="mb-1" style={{ color: "#E0E0E0" }}>
        <strong>Duração:</strong>{" "}
        {formatMinutesToHours(calculateDuration(event.start, event.end))}
      </p>
      {event.description && (
        <p className="mt-2" style={{ color: "#E0E0E0" }}>
          {event.description}
        </p>
      )}
    </li>
  );
};

export default EventItem;
