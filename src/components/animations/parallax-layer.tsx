"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/lib/motion/hooks";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Speed multiplier: 0.1 (slow background), 0.4 (medium midground), 0.7 (fast foreground) */
  speed?: 0.1 | 0.4 | 0.7 | number;
  className?: string;
  direction?: "y" | "x";
}

/**
 * ParallaxLayer:
 * Moves its content at a calibrated relative velocity compared to scroll:
 * - 0.1x: Background ambient layer (slow, distant)
 * - 0.4x: Middle content layer (moderate depth)
 * - 0.7x: Foreground floating layer (fast, close to camera lens)
 *
 * Automatically neutralizes on touch/mobile and reduced-motion.
 */
export function ParallaxLayer({
  children,
  speed = 0.4,
  className,
  direction = "y",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const isSmallMobile = window.innerWidth < 640;
    if (isSmallMobile) return;

    const distance = speed * 120; // 0.1x -> 12px, 0.4x -> 48px, 0.7x -> 84px

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { [direction]: -distance / 2 },
        {
          [direction]: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, direction, reducedMotion]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
