import React from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
  description?: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", {
      locale: ptBR,
    });
  };

  return (
    <div className="mt-4">
      <h2 className="h4 mb-3">Eventos</h2>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="h5">{event.title}</strong>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm"
              >
                <FaExternalLinkAlt className="mr-2" />
                Ver no Google Calendar
              </a>
            </div>
            <p className="mb-1 text-muted">
              <FaCalendarAlt className="mr-2" />
              {formatDate(event.start)} até {formatDate(event.end)}
            </p>
            {event.description && <p className="mt-2">{event.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
