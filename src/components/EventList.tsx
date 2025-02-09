import React from "react";
import {
  format,
  parseISO,
  differenceInMinutes,
  startOfDay,
  startOfWeek,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  FaCalendarAlt,
  FaClock,
  FaChartBar,
  FaTasks,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
  description?: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  // Função para formatar datas
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", {
      locale: ptBR,
    });
  };

  // Função para calcular o tempo gasto em minutos
  const calculateDuration = (start: string, end: string) => {
    return differenceInMinutes(parseISO(end), parseISO(start));
  };

  // Função para agrupar eventos por período e por tarefa dentro de cada período
  const groupEventsByPeriod = () => {
    const dailySummary: { [date: string]: { [task: string]: number } } = {};
    const weeklySummary: { [date: string]: { [task: string]: number } } = {};
    const monthlySummary: { [date: string]: { [task: string]: number } } = {};

    events.forEach((event) => {
      const startDate = parseISO(event.start);
      const dayKey = startOfDay(startDate).toISOString();
      const weekKey = startOfWeek(startDate).toISOString();
      const monthKey = startOfMonth(startDate).toISOString();

      const duration = calculateDuration(event.start, event.end);

      // Organiza por dia e tarefa
      if (!dailySummary[dayKey]) dailySummary[dayKey] = {};
      dailySummary[dayKey][event.title] =
        (dailySummary[dayKey][event.title] || 0) + duration;

      // Organiza por semana e tarefa
      if (!weeklySummary[weekKey]) weeklySummary[weekKey] = {};
      weeklySummary[weekKey][event.title] =
        (weeklySummary[weekKey][event.title] || 0) + duration;

      // Organiza por mês e tarefa
      if (!monthlySummary[monthKey]) monthlySummary[monthKey] = {};
      monthlySummary[monthKey][event.title] =
        (monthlySummary[monthKey][event.title] || 0) + duration;
    });

    return { dailySummary, weeklySummary, monthlySummary };
  };

  // Converter minutos em horas e minutos
  const formatMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Gerar resumo estatístico
  const { dailySummary, weeklySummary, monthlySummary } = groupEventsByPeriod();

  return (
    <div className="mt-4">
      <h2 className="h4 mb-3">Eventos e Estatísticas</h2>

      {/* Resumo Diário */}
      <div className="mb-4">
        <h3 className="h5">
          <FaChartBar className="mr-2" />
          Resumo Diário
        </h3>
        <ul className="list-group">
          {Object.entries(dailySummary).map(([date, tasks]) => (
            <li key={date} className="list-group-item">
              <strong>
                {format(parseISO(date), "dd/MM/yyyy", { locale: ptBR })}
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

      {/* Resumo Semanal */}
      <div className="mb-4">
        <h3 className="h5">
          <FaChartBar className="mr-2" />
          Resumo Semanal
        </h3>
        <ul className="list-group">
          {Object.entries(weeklySummary).map(([date, tasks]) => (
            <li key={date} className="list-group-item">
              <strong>
                Semana de{" "}
                {format(parseISO(date), "dd/MM/yyyy", { locale: ptBR })}
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

      {/* Resumo Mensal */}
      <div className="mb-4">
        <h3 className="h5">
          <FaChartBar className="mr-2" />
          Resumo Mensal
        </h3>
        <ul className="list-group">
          {Object.entries(monthlySummary).map(([date, tasks]) => (
            <li key={date} className="list-group-item">
              <strong>
                {format(parseISO(date), "MMMM yyyy", { locale: ptBR })}
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

      {/* Lista de Eventos */}
      <div>
        <h3 className="h5">
          <FaCalendarAlt className="mr-2" />
          Lista de Eventos
        </h3>
        <ul className="list-group">
          {events.map((event) => (
            <li key={event.id} className="list-group-item mb-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <strong className="h5">{event.title}</strong>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Ver no Google Calendar
                </a>
              </div>
              <p className="mb-1 text-muted">
                <FaClock className="mr-2" />
                {formatDate(event.start)} até {formatDate(event.end)}
              </p>
              <p className="mb-1">
                <strong>Duração:</strong>{" "}
                {formatMinutesToHours(
                  calculateDuration(event.start, event.end)
                )}
              </p>
              {event.description && <p className="mt-2">{event.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
