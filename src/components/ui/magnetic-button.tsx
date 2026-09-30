"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  maxMovement?: number; // 8-12px as requested
  onClick?: () => void;
  variant?: "dark" | "primary" | "outline" | "none";
}

export function MagneticButton({
  children,
  className,
  strength = 0.22,
  maxMovement = 10, // Clamped strictly to 8-12px
  onClick,
  variant = "dark",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion values for smooth interpolation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics (prevents aggressive chasing)
  const springConfig = { stiffness: 200, damping: 20, mass: 0.6 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !buttonRef.current || typeof window === "undefined" || window.innerWidth < 640) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const rawX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const rawY = (e.clientY - (rect.top + rect.height / 2)) * strength;

    // Strict clamping to 8-12px maximum movement
    const clampedX = Math.max(-maxMovement, Math.min(maxMovement, rawX));
    const clampedY = Math.max(-maxMovement, Math.min(maxMovement, rawY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.3)]",
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-[0_10px_25px_-5px_rgba(124,58,237,0.35)]",
    outline: "border-2 border-slate-200 text-slate-800 bg-white hover:bg-slate-50",
    none: "",
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: smoothX, y: smoothY }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full transition-colors cursor-pointer select-none group",
        variant !== "none" && "px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2.5 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-1">
        {children}
      </span>
    </motion.div>
  );
}
