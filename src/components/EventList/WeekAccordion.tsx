import React from "react";
import { Accordion } from "react-bootstrap";
import DayAccordion from "./DayAccordion";
import { parseISO } from "date-fns";
import { CalendarEvent } from "../../types/eventTypes";

interface WeekAccordionProps {
  weekKey: string;
  days: {
    [day: string]: CalendarEvent[];
  };
}

const WeekAccordion: React.FC<WeekAccordionProps> = ({ weekKey, days }) => {
  const weekStartDate = parseISO(weekKey);

  return (
    <Accordion.Item eventKey={weekKey}>
      <Accordion.Header>
        Semana de {weekStartDate.toLocaleDateString("pt-BR")}
      </Accordion.Header>
      <Accordion.Body>
        {Object.entries(days).map(([dayKey, dayEvents]) => (
          <DayAccordion key={dayKey} dayKey={dayKey} events={dayEvents} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default WeekAccordion;
