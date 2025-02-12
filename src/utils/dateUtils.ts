import {
  format,
  parseISO,
  differenceInMinutes,
  startOfDay,
  startOfWeek,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarEvent } from "../types/eventTypes";

/**
 * Formata uma data no formato "dd 'de' MMMM 'de' yyyy, HH:mm".
 * @param dateString - A data no formato ISO (ex: "2023-10-15T09:00:00").
 * @returns A data formatada (ex: "15 de outubro de 2023, 09:00").
 */
export const formatDate = (dateString: string): string => {
  if (!dateString || isNaN(parseISO(dateString).getTime())) {
    throw new Error("Data inválida.");
  }
  return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", {
    locale: ptBR,
  });
};

/**
 * Calcula a duração em minutos entre duas datas.
 * @param start - A data de início no formato ISO.
 * @param end - A data de término no formato ISO.
 * @returns A duração em minutos.
 */
export const calculateDuration = (start: string, end: string): number => {
  if (
    !start ||
    !end ||
    isNaN(parseISO(start).getTime()) ||
    isNaN(parseISO(end).getTime())
  ) {
    throw new Error("Datas inválidas.");
  }
  return differenceInMinutes(parseISO(end), parseISO(start));
};

/**
 * Formata minutos em horas e minutos (ex: 90 minutos -> "1h 30m").
 * @param minutes - A duração em minutos.
 * @returns A duração formatada (ex: "1h 30m").
 */
export const formatMinutesToHours = (minutes: number): string => {
  if (minutes < 0) {
    throw new Error("A duração não pode ser negativa.");
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

// Tipos para os resumos de eventos
interface EventSummary {
  [task: string]: number; // Tarefa -> Duração total em minutos
}

interface GroupedEvents {
  [date: string]: EventSummary; // Data -> Resumo de tarefas
}

/**
 * Agrupa eventos por período (diário, semanal e mensal) e calcula a duração total de cada tarefa.
 * @param events - A lista de eventos.
 * @returns Um objeto contendo os resumos diário, semanal e mensal.
 */
export const groupEventsByPeriod = (
  events: CalendarEvent[]
): {
  dailySummary: GroupedEvents;
  weeklySummary: GroupedEvents;
  monthlySummary: GroupedEvents;
} => {
  const dailySummary: GroupedEvents = {};
  const weeklySummary: GroupedEvents = {};
  const monthlySummary: GroupedEvents = {};

  events.forEach((event) => {
    try {
      const startDate = parseISO(event.start);
      const dayKey = startOfDay(startDate).toISOString();
      const weekKey = startOfWeek(startDate).toISOString();
      const monthKey = startOfMonth(startDate).toISOString();

      const duration = calculateDuration(event.start, event.end);

      // Função para adicionar a duração ao resumo
      const addToSummary = (
        summary: GroupedEvents,
        key: string,
        title: string,
        duration: number
      ) => {
        if (!summary[key]) summary[key] = {};
        summary[key][title] = (summary[key][title] || 0) + duration;
      };

      // Adiciona ao resumo diário, semanal e mensal
      addToSummary(dailySummary, dayKey, event.title, duration);
      addToSummary(weeklySummary, weekKey, event.title, duration);
      addToSummary(monthlySummary, monthKey, event.title, duration);
    } catch (error) {
      console.error(`Erro ao processar o evento ${event.title}:`, error);
    }
  });

  return { dailySummary, weeklySummary, monthlySummary };
};
