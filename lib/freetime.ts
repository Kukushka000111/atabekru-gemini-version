export type DayStatus = "busy" | "free" | "gaming";

export interface DaySchedule {
  id: string;
  shortName: string;
  name: string;
  status: DayStatus;
  message: string;
}

export const WEEK_SCHEDULE: DaySchedule[] = [
  {
    id: "mon",
    shortName: "Пн",
    name: "Понедельник",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "tue",
    shortName: "Вт",
    name: "Вторник",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "wed",
    shortName: "Ср",
    name: "Среда",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "thu",
    shortName: "Чт",
    name: "Четверг",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "fri",
    shortName: "Пт",
    name: "Пятница",
    status: "free",
    message:
      "Свободен после 18:00. Открыт к обсуждению музыки, багетов и IT-проектов",
  },
  {
    id: "sat",
    shortName: "Сб",
    name: "Суббота",
    status: "gaming",
    message:
      "Занят глобальным доминированием в Hearts of Iron IV и Crusader Kings 3",
  },
  {
    id: "sun",
    shortName: "Вс",
    name: "Воскресенье",
    status: "gaming",
    message:
      "Занят глобальным доминированием в Hearts of Iron IV и Crusader Kings 3",
  },
];

export const STATUS_STYLES: Record<
  DayStatus,
  { dot: string; glow: string; border: string }
> = {
  busy: {
    dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    glow: "hover:shadow-[0_0_24px_rgba(239,68,68,0.15)] hover:border-red-500/25",
    border: "border-red-500/10",
  },
  free: {
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    glow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.15)] hover:border-emerald-500/25",
    border: "border-emerald-500/10",
  },
  gaming: {
    dot: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]",
    glow: "hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] hover:border-violet-500/25",
    border: "border-violet-500/10",
  },
};
