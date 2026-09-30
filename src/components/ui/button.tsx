"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "dark" | "primary" | "blue" | "outline" | "ghost" | "soft-purple" | "soft-blue";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "dark",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-9 px-4 text-xs font-semibold gap-1.5",
      md: "h-11 px-6 text-sm font-semibold gap-2",
      lg: "h-13 px-8 text-base font-semibold gap-2.5",
      xl: "h-14 px-9 text-lg font-bold gap-3",
    };

    const variantClasses = {
      dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_4px_16px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.28)] active:bg-slate-950",
      primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-[0_4px_16px_rgba(124,58,237,0.25)] hover:shadow-[0_8px_24px_rgba(124,58,237,0.35)] active:bg-purple-800",
      blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] active:bg-blue-800",
      outline: "border-2 border-slate-200 text-slate-800 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-sm",
      ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      "soft-purple": "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60",
      "soft-blue": "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60",
    };

    const isInteractionDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isInteractionDisabled ? undefined : { scale: 1.025 }}
        whileTap={isInteractionDisabled ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        disabled={isInteractionDisabled}
        className={cn(
          "group inline-flex items-center justify-center rounded-full transition-[background-color,border-color,box-shadow,color] duration-300 cursor-pointer select-none tracking-wide relative overflow-hidden",
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          // Micro-interaction: icons move forward slightly on hover
          "[&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
