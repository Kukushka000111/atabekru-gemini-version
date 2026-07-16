"use client";

import CommandPanel from "@/components/commands/CommandPanel";

interface CommandStubProps {
  commandName: string;
}

export default function CommandStub({ commandName }: CommandStubProps) {
  return (
    <CommandPanel>
      <p className="text-sm leading-relaxed text-white/60 sm:text-base">
        [Компонент для команды{" "}
        <span className="font-mono text-teal-300/90">{commandName}</span> в
        разработке. Нажмите{" "}
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">
          Esc
        </kbd>
        , чтобы вернуться]
      </p>
    </CommandPanel>
  );
}
