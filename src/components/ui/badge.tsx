import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "purple" | "blue" | "neutral" | "amber" | "pink" | "emerald";
  withDot?: boolean;
}

export function Badge({
  className,
  variant = "purple",
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    purple: "bg-purple-100/90 text-purple-700 border-purple-200/70",
    blue: "bg-blue-100/90 text-blue-700 border-blue-200/70",
    neutral: "bg-slate-100/90 text-slate-700 border-slate-200",
    amber: "bg-amber-100/90 text-amber-800 border-amber-200/70",
    pink: "bg-pink-100/90 text-pink-700 border-pink-200/70",
    emerald: "bg-emerald-100/90 text-emerald-800 border-emerald-200/70",
  };

  const dotColors = {
    purple: "bg-purple-600",
    blue: "bg-blue-600",
    neutral: "bg-slate-600",
    amber: "bg-amber-500",
    pink: "bg-pink-500",
    emerald: "bg-emerald-600",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-2xs transition-all",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {withDot && (
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColors[variant])} />
      )}
      {children}
    </div>
  );
}
