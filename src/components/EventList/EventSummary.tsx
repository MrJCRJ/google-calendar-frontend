import React from "react";
import { FaChartBar, FaTasks } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatMinutesToHours } from "../../utils/dateUtils";

// Interface para as props do componente
interface EventSummaryProps {
  title: string; // Título do resumo (ex: "Resumo Diário")
  summary: { [date: string]: { [task: string]: number } }; // Dados agrupados por data e tarefa
  periodFormat: string; // Formato de data (ex: "dd/MM/yyyy")
}

/**
 * Componente `EventSummary`:
 * Exibe um resumo de eventos agrupados por data e tarefa, com a duração total de cada tarefa.
 */
const EventSummary: React.FC<EventSummaryProps> = ({
  title,
  summary,
  periodFormat,
}) => {
  return (
    <div
      className="mb-4"
      style={{
        backgroundColor: "#2D2D44",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3 className="h5" style={{ color: "#4A90E2" }}>
        <FaChartBar className="mr-2" />
        {title}
      </h3>
      <ul className="list-group">
        {Object.entries(summary).map(([date, tasks]) => (
          <li
            key={date}
            className="list-group-item"
            style={{
              backgroundColor: "#1E1E2F",
              color: "#E0E0E0",
              borderColor: "#3A3A4F",
            }}
          >
            <strong>
              {format(parseISO(date), periodFormat, { locale: ptBR })}
            </strong>
            <ul className="mt-2">
              {Object.entries(tasks).map(([task, duration]) => (
                <li key={task} style={{ color: "#E0E0E0" }}>
                  <FaTasks className="mr-2" />
                  {task}: {formatMinutesToHours(duration)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSummary;
