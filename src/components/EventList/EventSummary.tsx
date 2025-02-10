import React from "react";
import { FaChartBar, FaTasks } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatMinutesToHours } from "../../utils/dateUtils";

interface EventSummaryProps {
  title: string;
  summary: { [date: string]: { [task: string]: number } };
  periodFormat: string;
}

const EventSummary: React.FC<EventSummaryProps> = ({
  title,
  summary,
  periodFormat,
}) => {
  return (
    <div className="mb-4">
      <h3 className="h5">
        <FaChartBar className="mr-2" />
        {title}
      </h3>
      <ul className="list-group">
        {Object.entries(summary).map(([date, tasks]) => (
          <li key={date} className="list-group-item">
            <strong>
              {format(parseISO(date), periodFormat, { locale: ptBR })}
            </strong>
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
