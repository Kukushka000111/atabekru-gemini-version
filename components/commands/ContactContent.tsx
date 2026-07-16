"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";
import { useToast } from "@/components/ToastProvider";
import { GITHUB_URL, TELEGRAM_USERNAME } from "@/lib/constants";

const CONTACTS = [
  {
    id: "telegram",
    label: "Связаться в Telegram",
    value: `@${TELEGRAM_USERNAME}`,
    description: "Написать личное сообщение в мессенджере",
    action: "copy" as const,
  },
  {
    id: "github",
    label: "Профиль GitHub",
    value: TELEGRAM_USERNAME,
    description: "Посмотреть исходный код и репозитории проектов",
    action: "link" as const,
    href: GITHUB_URL,
  },
];

export default function ContactContent() {
  const { showToast } = useToast();

  const handleTelegramClick = async () => {
    try {
      await navigator.clipboard.writeText(`@${TELEGRAM_USERNAME}`);
      showToast("Имя пользователя скопировано в буфер обмена!");
    } catch {
      showToast("Не удалось скопировать автоматически. Выделите имя пользователя вручную.");
    }
  };

  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 py-2 max-w-sm mx-auto"
      >
        {/* Contact Header */}
        <div className="text-center space-y-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-500/50">
            Раздел VI • Обратная связь
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-gold-400">
            КОНТАКТЫ
          </h2>
          <div className="mx-auto h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />
        </div>

        {/* Scroll contacts list */}
        <ul className="space-y-4">
          {CONTACTS.map((contact, index) => (
            <motion.li
              key={contact.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.35 }}
            >
              {contact.action === "copy" ? (
                <button
                  type="button"
                  data-cursor-hover
                  onClick={handleTelegramClick}
                  className="group flex w-full items-center justify-between rounded-sm border border-gold-500/15 bg-gold-500/[0.01] px-4 py-4 text-left transition-colors hover:border-gold-500/40 hover:bg-gold-500/[0.05] hover:shadow-[0_0_15px_rgba(212,175,55,0.12)]"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-serif text-[10px] uppercase tracking-wider text-gold-500/50">
                      {contact.label}
                    </p>
                    <p className="mt-1 font-serif text-sm font-bold tracking-wide text-gold-300 group-hover:text-gold-200">
                      {contact.value}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/40 italic">
                      {contact.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-sm border border-gold-500/30 bg-[#0c0c10] px-2.5 py-1 font-serif text-[9px] uppercase tracking-widest text-gold-400/80 transition-colors group-hover:border-gold-500 group-hover:text-gold-200">
                    Копировать
                  </span>
                </button>
              ) : (
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="group flex w-full items-center justify-between rounded-sm border border-gold-500/15 bg-gold-500/[0.01] px-4 py-4 transition-colors hover:border-gold-500/40 hover:bg-gold-500/[0.05] hover:shadow-[0_0_15px_rgba(212,175,55,0.12)]"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-serif text-[10px] uppercase tracking-wider text-gold-500/50">
                      {contact.label}
                    </p>
                    <p className="mt-1 font-serif text-sm font-bold tracking-wide text-white/80 group-hover:text-white">
                      {contact.value}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/40 italic">
                      {contact.description}
                    </p>
                  </div>
                  <span className="font-serif text-xs text-gold-500/60 transition-colors group-hover:text-gold-400">
                    ⟶
                  </span>
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </CommandPanel>
  );
}
