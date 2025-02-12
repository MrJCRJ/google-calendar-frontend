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
    <div className="mb-4">
      {/* Título do resumo */}
      <h3 className="h5">
        <FaChartBar className="mr-2" />
        {title}
      </h3>

      {/* Lista de resumos por data */}
      <ul className="list-group">
        {Object.entries(summary).map(([date, tasks]) => (
          <li key={date} className="list-group-item">
            {/* Data formatada */}
            <strong>
              {format(parseISO(date), periodFormat, { locale: ptBR })}
            </strong>

            {/* Lista de tarefas e durações */}
            <ul className="mt-2">
              {Object.entries(tasks).map(([task, duration]) => (
                <li key={task}>
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
