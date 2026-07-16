"use client";

import { motion } from "framer-motion";

interface CommandPanelProps {
  children: React.ReactNode;
}

export default function CommandPanel({ children }: CommandPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 py-5 sm:px-6 sm:py-6"
    >
      {children}
    </motion.div>
  );
}
