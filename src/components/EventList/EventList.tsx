import React from "react";
import { Accordion } from "react-bootstrap";
import { groupEventsByPeriod } from "../../utils/dateUtils";
import MonthAccordion from "./MonthAccordion";
import { CalendarEvent } from "../../types/eventTypes";

interface EventListProps {
  events: CalendarEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  // Agrupa os eventos por período
  const groupedEvents = groupEventsByPeriod(events);

  return (
    <div className="mt-4">
      <h2 className="h4 mb-3">Eventos Agrupados</h2>
      <Accordion alwaysOpen>
        {Object.entries(groupedEvents).map(([monthKey, monthData]) => {
          return (
            <MonthAccordion
              key={monthKey}
              monthKey={monthKey}
              weeks={monthData.weeks}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default EventList;
