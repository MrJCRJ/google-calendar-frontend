// src/components/EventList.tsx
import React from "react";

// Definindo a interface para o tipo "Event"
interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
}

// Definindo as props do componente
interface EventListProps {
  events: Event[];
}

// Componente funcional com TypeScript
const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <strong>{event.title}</strong>
          <br />
          Início: {event.start}
          <br />
          Fim: {event.end}
          <br />
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            Ver no Google Calendar
          </a>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
