import React from "react";
import { FaClock, FaExternalLinkAlt, FaTasks } from "react-icons/fa";
import { CalendarEvent } from "../../types/eventTypes";
import {
  formatDate,
  formatMinutesToHours,
  calculateDuration,
} from "../../utils/dateUtils";

interface EventItemProps {
  event: CalendarEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <li className="list-group-item mb-3 shadow-sm">
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
        <FaClock className="mr-2" />
        {formatDate(event.start)} até {formatDate(event.end)}
      </p>
      <p className="mb-1">
        <strong>Duração:</strong>{" "}
        {formatMinutesToHours(calculateDuration(event.start, event.end))}
      </p>
      {event.description && <p className="mt-2">{event.description}</p>}
    </li>
  );
};

export default EventItem;
