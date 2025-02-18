import React from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import EventItem from "./EventItem";
import { CalendarEvent } from "../../types/eventTypes";

interface DayAccordionProps {
  dayKey: string;
  events: CalendarEvent[];
}

const DayAccordion: React.FC<DayAccordionProps> = ({ dayKey, events }) => {
  return (
    <Accordion.Item eventKey={dayKey}>
      <Accordion.Header>
        {new Date(dayKey).toLocaleDateString("pt-BR")}
      </Accordion.Header>
      <Accordion.Body>
        <ListGroup>
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default DayAccordion;
