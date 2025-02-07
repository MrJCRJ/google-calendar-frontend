import React from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className="mt-4">
      <h2 className="h4 mb-3">Eventos</h2>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item">
            <strong className="h5">{event.title}</strong>
            <p className="mb-1">
              {event.start} até {event.end}
            </p>
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm"
            >
              Ver no Google Calendar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
