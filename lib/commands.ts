export interface Command {
  id: string;
  name: string;
  description: string;
}

export const COMMANDS: Command[] = [
  {
    id: "about",
    name: "/about",
    description: "О себе — архитектура, стек и принципы",
  },
  {
    id: "music",
    name: "/music",
    description: "Музыкальный плеер — демо-треки",
  },
  {
    id: "bakery",
    name: "/bakery",
    description: "Пекарня аттабек — хлеб и выпечка",
  },
  {
    id: "games",
    name: "/games",
    description: "Мини-игра — Змейка",
  },
  {
    id: "lastphoto",
    name: "/lastphoto",
    description: "Снимок дня — Polaroid-кадр",
  },
  {
    id: "freetime",
    name: "/freetime",
    description: "Свободное время — интерактивная сетка",
  },
  {
    id: "message",
    name: "/message",
    description: "Оставить анонимное сообщение в Telegram",
  },
  {
    id: "contact",
    name: "/contact",
    description: "Контакты — ссылки и соцсети",
  },
];

export function filterCommands(query: string): Command[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return COMMANDS;
  }

  return COMMANDS.filter(
    (command) =>
      command.name.toLowerCase().includes(normalized) ||
      command.description.toLowerCase().includes(normalized),
  );
}
