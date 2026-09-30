import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CanvasContainerProps {
  children: ReactNode;
  className?: string;
}

export function CanvasContainer({ children, className }: CanvasContainerProps) {
  return (
    <div className="w-full min-h-screen py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6 flex justify-center items-start">
      <main
        className={cn(
          "w-full max-w-7xl bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_24px_70px_-15px_rgba(26,20,60,0.08)] border border-slate-200/70 overflow-hidden flex flex-col",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
