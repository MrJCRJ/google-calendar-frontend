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

export const formatDate = (dateString: string) => {
  return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", {
    locale: ptBR,
  });
};

export const calculateDuration = (start: string, end: string) => {
  return differenceInMinutes(parseISO(end), parseISO(start));
};

export const formatMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const groupEventsByPeriod = (events: CalendarEvent[]) => {
  const dailySummary: { [date: string]: { [task: string]: number } } = {};
  const weeklySummary: { [date: string]: { [task: string]: number } } = {};
  const monthlySummary: { [date: string]: { [task: string]: number } } = {};

  events.forEach((event) => {
    const startDate = parseISO(event.start);
    const dayKey = startOfDay(startDate).toISOString();
    const weekKey = startOfWeek(startDate).toISOString();
    const monthKey = startOfMonth(startDate).toISOString();

    const duration = calculateDuration(event.start, event.end);

    if (!dailySummary[dayKey]) dailySummary[dayKey] = {};
    dailySummary[dayKey][event.title] =
      (dailySummary[dayKey][event.title] || 0) + duration;

    if (!weeklySummary[weekKey]) weeklySummary[weekKey] = {};
    weeklySummary[weekKey][event.title] =
      (weeklySummary[weekKey][event.title] || 0) + duration;

    if (!monthlySummary[monthKey]) monthlySummary[monthKey] = {};
    monthlySummary[monthKey][event.title] =
      (monthlySummary[monthKey][event.title] || 0) + duration;
  });

  return { dailySummary, weeklySummary, monthlySummary };
};
