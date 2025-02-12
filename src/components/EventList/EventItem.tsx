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
    <li className="list-group-item mb-3 shadow-sm">
      {/* Cabeçalho do evento: Título e link para o Google Calendar */}
      <div className="d-flex justify-content-between align-items-center">
        <strong className="h5">{event.title}</strong>
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary btn-sm"
          aria-label={`Ver evento "${event.title}" no Google Calendar`}
        >
          <FaExternalLinkAlt className="mr-2" />
          Ver no Google Calendar
        </a>
      </div>

      {/* Data e hora do evento */}
      <p className="mb-1 text-muted">
        <FaClock className="mr-2" />
        {formattedStartDate} até {formattedEndDate}
      </p>

      {/* Duração do evento */}
      <p className="mb-1">
        <strong>Duração:</strong> {formattedDuration}
      </p>

      {/* Descrição do evento (se existir) */}
      {event.description && (
        <p className="mt-2" aria-label="Descrição do evento">
          {event.description}
        </p>
      )}
    </li>
  );
};

export default EventItem;
