"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function Pill({ children, active = false, onClick, className, icon }: PillProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none",
        active
          ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs",
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
