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
  [key: string]: {
    [key: string]: number; // Duração total por título do evento
  };
}

interface HierarchicalEvents {
  [month: string]: {
    weeks: {
      [week: string]: {
        days: {
          [day: string]: CalendarEvent[];
        };
      };
    };
  };
}

export const groupEventsByPeriod = (
  events: CalendarEvent[]
): HierarchicalEvents => {
  const hierarchicalSummary: HierarchicalEvents = {};

  events.forEach((event, index) => {
    try {
      if (!event.start) {
        console.warn(`Evento "${event.title}" sem data de início.`);
        return;
      }

      const startDate = parseISO(event.start);
      if (isNaN(startDate.getTime())) {
        console.warn(
          `Data inválida no evento "${event.title}": ${event.start}`
        );
        return;
      }

      // Formata as chaves de mês, semana e dia
      const dayKey = format(startOfDay(startDate), "yyyy-MM-dd");
      const weekKey = format(startOfWeek(startDate), "yyyy-'W'ww"); // Semana começa na segunda
      const monthKey = format(startOfMonth(startDate), "yyyy-MM");

      // Inicializa mês e semana apenas se houver eventos
      hierarchicalSummary[monthKey] ??= { weeks: {} };
      hierarchicalSummary[monthKey].weeks[weekKey] ??= { days: {} };
      hierarchicalSummary[monthKey].weeks[weekKey].days[dayKey] ??= [];

      // Adiciona o evento ao dia correto
      hierarchicalSummary[monthKey].weeks[weekKey].days[dayKey].push(event);
    } catch (error) {
      console.error(`Erro ao processar o evento "${event.title}":`, error);
    }
  });

  return hierarchicalSummary;
};
