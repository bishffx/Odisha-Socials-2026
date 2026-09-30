"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ImageWrapperProps {
  children: ReactNode;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  rounded?: "2xl" | "3xl" | "canvas";
  className?: string;
  withShine?: boolean;
  clipReveal?: boolean;
}

export function ImageWrapper({
  children,
  aspectRatio = "video",
  rounded = "3xl",
  className,
  withShine = true,
  clipReveal = true,
}: ImageWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  const aspectStyles = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[4/5]",
    wide: "aspect-[21/9]",
  };

  const roundedStyles = {
    "2xl": "rounded-2xl",
    "3xl": "rounded-[28px]",
    canvas: "rounded-[36px]",
  };

  const containerContent = (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden border border-slate-200/80 bg-slate-100 shadow-md group transition-all duration-500 will-change-transform",
        aspectStyles[aspectRatio],
        roundedStyles[rounded],
        className
      )}
    >
      {/* Zoomable Image Container */}
      <div className="w-full h-full [&>img]:transition-transform [&>img]:duration-700 [&>img]:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[&>img]:scale-105">
        {children}
      </div>

      {/* Ambient Glare / Hover Shine Reflection */}
      {withShine && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}
    </div>
  );

  if (!clipReveal || shouldReduceMotion) {
    return containerContent;
  }

  return (
    <motion.div
      initial={{
        clipPath: "inset(8% 0% 8% 0% round 24px)",
        opacity: 0,
        scale: 1.04,
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      {containerContent}
    </motion.div>
  );
}
