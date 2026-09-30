"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_DISTANCE,
  MOTION_SCALE,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
} from "@/lib/motion/constants";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

// -----------------------------------------------------------------------------
// 1. BASIC REVEALS (GPU-friendly transform + opacity)
// -----------------------------------------------------------------------------

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = MOTION_DURATION.base,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : MOTION_DISTANCE.base }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: MOTION_VIEWPORT.once, margin: MOTION_VIEWPORT.margin }}
      transition={{ duration, delay, ease: MOTION_EASE.framer.expo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = MOTION_DURATION.base,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: MOTION_VIEWPORT.once, margin: MOTION_VIEWPORT.margin }}
      transition={{ duration, delay, ease: MOTION_EASE.framer.power3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = MOTION_DURATION.base,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : MOTION_SCALE.revealStart }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: MOTION_VIEWPORT.once, margin: MOTION_VIEWPORT.margin }}
      transition={{ duration, delay, ease: MOTION_EASE.framer.expo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = MOTION_DURATION.base,
}: RevealProps & { direction?: "left" | "right" | "top" | "bottom" }) {
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case "left":
        return { x: -MOTION_DISTANCE.medium, y: 0 };
      case "right":
        return { x: MOTION_DISTANCE.medium, y: 0 };
      case "top":
        return { x: 0, y: -MOTION_DISTANCE.medium };
      case "bottom":
        return { x: 0, y: MOTION_DISTANCE.medium };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getOffset() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: MOTION_VIEWPORT.once, margin: MOTION_VIEWPORT.margin }}
      transition={{ duration, delay, ease: MOTION_EASE.framer.expo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// 2. STAGGER CONTAINERS
// -----------------------------------------------------------------------------

export function StaggerContainer({
  children,
  className,
  staggerDelay = MOTION_STAGGER.base,
  delayChildren = 0.05,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: MOTION_VIEWPORT.once, margin: MOTION_VIEWPORT.margin }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : MOTION_DISTANCE.base,
          scale: shouldReduceMotion ? 1 : 0.98,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE.framer.expo },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// 3. TYPOGRAPHY ANIMATIONS: MASKED LINE & WORD REVEALS
// -----------------------------------------------------------------------------

export function LineReveal({
  children,
  className,
  delay = 0,
  duration = MOTION_DURATION.medium,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <div className={cn("overflow-hidden py-1", className)}>
      <motion.div
        initial={{ y: "115%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration, delay, ease: MOTION_EASE.framer.expo }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <span className={className}>{text}</span>;

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: MOTION_STAGGER.fast,
            delayChildren: delay,
          },
        },
      }}
      className={cn("inline-flex flex-wrap gap-x-[0.3em]", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <motion.span
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE.framer.expo },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function CharacterReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const chars = Array.from(text);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <span className={className}>{text}</span>;

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: MOTION_STAGGER.dense,
            delayChildren: delay,
          },
        },
      }}
      className={cn("inline-block", className)}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: MOTION_DURATION.fast, ease: MOTION_EASE.framer.expo },
            },
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// -----------------------------------------------------------------------------
// 4. IMAGE ANIMATIONS: CURTAIN & CLIP-PATH REVEALS
// -----------------------------------------------------------------------------

export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = MOTION_DURATION.curtain,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{
        clipPath: "inset(12% 0% 12% 0% round 24px)",
        opacity: 0,
        scale: MOTION_SCALE.zoomOutStart,
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration, delay, ease: MOTION_EASE.framer.expo }}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// 5. ORGANIC ASYNCHRONOUS FLOATING ELEMENTS
// -----------------------------------------------------------------------------

export function FloatingElement({
  children,
  className,
  distance = MOTION_DISTANCE.subtle,
  duration = 4.5,
  delay = 0,
  rotate = 2,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
        rotate: [0, rotate, -rotate, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// 6. CARD HOVER & LIFT PHYSICS
// -----------------------------------------------------------------------------

export function HoverLift({
  children,
  className,
  y = -6,
  scale = MOTION_SCALE.hoverSubtle,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      whileHover={{ y, scale }}
      whileTap={{ scale: MOTION_SCALE.pressed }}
      transition={{ duration: MOTION_DURATION.snappy, ease: MOTION_EASE.framer.expo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
