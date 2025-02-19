import React from "react";
import { Accordion } from "react-bootstrap";
import DayAccordion from "./DayAccordion";
import { CalendarEvent } from "../../types/eventTypes";

interface MonthAccordionProps {
  monthKey: string;
  days: {
    [day: string]: CalendarEvent[];
  };
}

const MonthAccordion: React.FC<MonthAccordionProps> = ({ monthKey, days }) => {
  return (
    <Accordion.Item eventKey={monthKey}>
      <Accordion.Header>
        {new Date(`${monthKey}-01T00:00:00`).toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        })}
      </Accordion.Header>
      <Accordion.Body>
        {Object.entries(days).map(([dayKey, dayEvents]) => (
          <DayAccordion key={dayKey} dayKey={dayKey} events={dayEvents} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default MonthAccordion;
