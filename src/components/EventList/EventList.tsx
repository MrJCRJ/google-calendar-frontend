import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { EventListProps } from "../../types/eventTypes";
import { groupEventsByPeriod } from "../../utils/dateUtils";
import EventItem from "./EventItem";
import EventSummary from "./EventSummary";

/**
 * Componente `EventList`:
 * Exibe uma lista de eventos agrupados por período (diário, semanal e mensal) e um resumo estatístico.
 * Também mostra a lista completa de eventos.
 */
const EventList: React.FC<EventListProps> = ({ events }) => {
  // Agrupa os eventos por período (diário, semanal e mensal)
  const { dailySummary, weeklySummary, monthlySummary } =
    groupEventsByPeriod(events);

  return (
    <div className="mt-4">
      {/* Título da seção */}
      <h2 className="h4 mb-3">Eventos e Estatísticas</h2>

      {/* Resumo Diário */}
      <EventSummary
        title="Resumo Diário"
        summary={dailySummary}
        periodFormat="dd/MM/yyyy"
      />

      {/* Resumo Semanal */}
      <EventSummary
        title="Resumo Semanal"
        summary={weeklySummary}
        periodFormat="'Semana de' dd/MM/yyyy"
      />

      {/* Resumo Mensal */}
      <EventSummary
        title="Resumo Mensal"
        summary={monthlySummary}
        periodFormat="MMMM yyyy"
      />

      {/* Lista Completa de Eventos */}
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
