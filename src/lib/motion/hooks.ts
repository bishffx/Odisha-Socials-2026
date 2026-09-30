"use client";

import { useEffect, useRef, useState, useCallback, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap-setup";
import { MOTION_DURATION, MOTION_EASE, MOTION_DISTANCE, MOTION_SCALE } from "./constants";

/**
 * Detects user preference for reduced motion.
 * Respects OS accessibility settings across Windows, macOS, iOS, Android.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  scrub?: boolean | number;
  stagger?: number;
  once?: boolean;
}

/**
 * useScrollReveal:
 * Attaches a ScrollTrigger to an element or container to smoothly reveal it upon entering the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const {
      y = MOTION_DISTANCE.base,
      x = 0,
      scale = 1,
      opacity = 0,
      duration = MOTION_DURATION.medium,
      delay = 0,
      ease = MOTION_EASE.power3Out,
      start = "top 88%",
      scrub = false,
      stagger = 0,
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      if (stagger && el.children.length > 0) {
        gsap.from(el.children, {
          y,
          x,
          scale,
          opacity,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: scrub ? false : once,
            scrub,
          },
        });
      } else {
        gsap.from(el, {
          y,
          x,
          scale,
          opacity,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            once: scrub ? false : once,
            scrub,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, options]);

  return ref;
}

/**
 * useParallax:
 * Adds a subtle scroll-scrubbed parallax translation (vertical or horizontal) to create visual depth.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.25,
  direction: "y" | "x" = "y"
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const distance = speed * 120;
      gsap.fromTo(
        el,
        { [direction]: -distance },
        {
          [direction]: distance,
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

  return ref;
}

/**
 * useMagnetic:
 * Creates an attractive magnetic pull toward the cursor for interactive elements like buttons & badges.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  strength: number = 0.35
): {
  ref: RefObject<T | null>;
  onMouseMove: (e: React.MouseEvent<T>) => void;
  onMouseLeave: () => void;
} {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) * strength;
      const moveY = (e.clientY - centerY) * strength;

      gsap.to(ref.current, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: MOTION_EASE.power3Out,
        overwrite: "auto",
      });
    },
    [strength, reducedMotion]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

/**
 * useFloat:
 * Applies a peaceful, non-distracting vertical float with subtle rotation.
 */
export function useFloat<T extends HTMLElement = HTMLDivElement>(
  distance: number = 10,
  duration: number = 4.5,
  delay: number = 0,
  rotate: number = 2
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -distance,
        rotate: rotate,
        duration: duration / 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay,
      });
    }, el);

    return () => ctx.revert();
  }, [distance, duration, delay, rotate, reducedMotion]);

  return ref;
}

/**
 * useTextReveal:
 * Reveals text line by line or word by word using masked overflow containers.
 */
export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
  stagger: number = 0.06
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(".motion-line, .motion-word");
      if (targets.length === 0) {
        gsap.from(el, {
          y: MOTION_DISTANCE.base,
          opacity: 0,
          duration: MOTION_DURATION.medium,
          ease: MOTION_EASE.power3Out,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
        return;
      }

      gsap.from(targets, {
        y: "110%",
        opacity: 0,
        duration: MOTION_DURATION.medium,
        ease: MOTION_EASE.power4Out,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, reducedMotion]);

  return ref;
}

/**
 * useImageReveal:
 * Curtain and subtle zoom-out reveal for photography & mockups.
 */
export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  duration: number = MOTION_DURATION.curtain
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          clipPath: "inset(12% 0% 12% 0% round 24px)",
          scale: MOTION_SCALE.zoomOutStart,
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          scale: MOTION_SCALE.rest,
          opacity: 1,
          duration,
          ease: MOTION_EASE.expoOut,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [duration, reducedMotion]);

  return ref;
}

/**
 * useSectionTransition:
 * Coordinates entrance transitions and scrub fade-in for section boundaries.
 */
export function useSectionTransition<T extends HTMLElement = HTMLElement>(
  threshold: number = 0.15
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0.85, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION_DURATION.base,
          ease: MOTION_EASE.power3Out,
          scrollTrigger: {
            trigger: el,
            start: `top ${100 - threshold * 100}%`,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [threshold, reducedMotion]);

  return ref;
}
