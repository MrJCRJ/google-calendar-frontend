export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
  description?: string;
}

export interface EventListProps {
  events: CalendarEvent[];
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
}
