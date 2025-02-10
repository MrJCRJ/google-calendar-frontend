import { CalendarEvent } from "../types/eventTypes";
import { calculateDuration } from "./dateUtils";

export const getEventDuration = (event: CalendarEvent) => {
  return calculateDuration(event.start, event.end);
};
