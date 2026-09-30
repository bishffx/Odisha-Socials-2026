import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "muted" | "lavender" | "elevated" | "glass" | "blue" | "dark";
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = "white",
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    white: "bg-white border-slate-200/80 text-slate-900 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.05)]",
    muted: "bg-[#f8fafc] border-slate-200/70 text-slate-900 shadow-xs",
    lavender: "bg-[#f9f8ff] border-purple-100 text-slate-900 shadow-xs",
    elevated: "bg-white border-slate-200/90 text-slate-900 shadow-[0_20px_45px_-12px_rgba(15,23,42,0.09)]",
    glass: "bg-white/85 backdrop-blur-md border-white/60 text-slate-900 shadow-md",
    blue: "bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20",
    dark: "bg-slate-900 border-slate-800 text-white shadow-xl shadow-slate-900/30",
  };

  return (
    <div
      className={cn(
        "group rounded-[28px] border p-6 sm:p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        variantStyles[variant],
        hoverEffect &&
          "hover:shadow-[0_22px_50px_-12px_rgba(124,58,237,0.12)] hover:border-purple-300/80 hover:-translate-y-1.5 hover:scale-[1.008]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
