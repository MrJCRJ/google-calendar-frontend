import React from "react";
import { Accordion } from "react-bootstrap";
import WeekAccordion from "./WeekAccordion";
import { CalendarEvent } from "../../types/eventTypes";

interface MonthAccordionProps {
  monthKey: string;
  weeks: {
    [week: string]: {
      days: {
        [day: string]: CalendarEvent[];
      };
    };
  };
}

const MonthAccordion: React.FC<MonthAccordionProps> = ({ monthKey, weeks }) => {
  // Corrige a interpretação do mês adicionando um dia específico
  const monthDate = new Date(`${monthKey}-01`);

  return (
    <Accordion.Item eventKey={monthKey}>
      <Accordion.Header>
        {new Date(`${monthKey}-01T00:00:00`).toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        })}
      </Accordion.Header>
      <Accordion.Body>
        {Object.entries(weeks).map(([weekKey, weekData]) => (
          <WeekAccordion key={weekKey} weekKey={weekKey} days={weekData.days} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default MonthAccordion;
