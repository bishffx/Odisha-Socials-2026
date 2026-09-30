"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("flex flex-col gap-3.5 w-full", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-[22px] border transition-all duration-300 overflow-hidden",
              isOpen
                ? "bg-purple-50/50 border-purple-200 shadow-sm"
                : "bg-white border-slate-200/80 hover:border-slate-300"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isOpen ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-purple-100/60 pt-3">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
