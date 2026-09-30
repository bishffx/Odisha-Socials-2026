import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface IconContainerProps {
  children: ReactNode;
  variant?: "purple" | "blue" | "pink" | "amber" | "emerald" | "slate";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  shape?: "squircle" | "circle";
}

export function IconContainer({
  children,
  variant = "purple",
  size = "md",
  shape = "squircle",
  className,
}: IconContainerProps) {
  const sizeStyles = {
    sm: "w-8 h-8 text-sm",
    md: "w-11 h-11 text-base",
    lg: "w-14 h-14 text-xl",
    xl: "w-16 h-16 text-2xl",
  };

  const variantStyles = {
    purple: "bg-purple-100 text-purple-600 border-purple-200/60",
    blue: "bg-blue-100 text-blue-600 border-blue-200/60",
    pink: "bg-pink-100 text-pink-600 border-pink-200/60",
    amber: "bg-amber-100 text-amber-600 border-amber-200/60",
    emerald: "bg-emerald-100 text-emerald-600 border-emerald-200/60",
    slate: "bg-slate-100 text-slate-700 border-slate-200/60",
  };

  const shapeStyles = {
    squircle: "rounded-[18px]",
    circle: "rounded-full",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center shrink-0 border transition-transform duration-300",
        sizeStyles[size],
        variantStyles[variant],
        shapeStyles[shape],
        className
      )}
    >
      {children}
    </div>
  );
}
