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
    <div>
      <h2>Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.start} até {event.end}
            <br />
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Ver no Google Calendar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
