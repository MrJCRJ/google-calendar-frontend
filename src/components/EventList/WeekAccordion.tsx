import React from "react";
import { Accordion } from "react-bootstrap";

import { parseISO, getISOWeek } from "date-fns";
import { CalendarEvent } from "../../types/eventTypes";

interface WeekAccordionProps {
  weekKey: string;
  days: {
    [day: string]: CalendarEvent[];
  };
}

const WeekAccordion: React.FC<WeekAccordionProps> = ({ weekKey, days }) => {
  const weekStartDate = parseISO(weekKey);

  // Obtém o número da semana no ano
  const weekNumber = getISOWeek(weekStartDate);

  return (
    <Accordion.Item eventKey={weekKey}>
      <Accordion.Header>Semana {weekNumber}</Accordion.Header>
      <Accordion.Body></Accordion.Body>
    </Accordion.Item>
  );
};

export default WeekAccordion;
