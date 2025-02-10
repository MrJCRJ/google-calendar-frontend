import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { EventListProps } from "../../types/eventTypes";
import { groupEventsByPeriod } from "../../utils/dateUtils";
import EventItem from "./EventItem";
import EventSummary from "./EventSummary";

const EventList: React.FC<EventListProps> = ({ events }) => {
  const { dailySummary, weeklySummary, monthlySummary } =
    groupEventsByPeriod(events);

  return (
    <div className="mt-4">
      <h2 className="h4 mb-3">Eventos e Estatísticas</h2>

      <EventSummary
        title="Resumo Diário"
        summary={dailySummary}
        periodFormat="dd/MM/yyyy"
      />
      <EventSummary
        title="Resumo Semanal"
        summary={weeklySummary}
        periodFormat="'Semana de' dd/MM/yyyy"
      />
      <EventSummary
        title="Resumo Mensal"
        summary={monthlySummary}
        periodFormat="MMMM yyyy"
      />

      <div>
        <h3 className="h5">
          <FaCalendarAlt className="mr-2" />
          Lista de Eventos
        </h3>
        <ul className="list-group">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
