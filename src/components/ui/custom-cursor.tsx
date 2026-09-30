"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

type CursorState = "default" | "link" | "button" | "image" | "project" | "drag";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid trailing ring
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    // Disable completely on mobile / coarse touch devices or reduced motion
    const isTouchOrCoarse =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 640 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchOrCoarse) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check for explicit data-cursor-label or data-cursor attribute
      const labeledEl = target.closest("[data-cursor-label]") as HTMLElement | null;
      const explicitState = target.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorState | null;

      if (labeledEl) {
        const label = labeledEl.getAttribute("data-cursor-label");
        setCursorLabel(label);
        setCursorState("project");
        return;
      }

      setCursorLabel(null);

      if (explicitState) {
        setCursorState(explicitState);
        return;
      }

      // 2. Check for drag / scrollable area
      if (target.closest(".animate-marquee, [data-cursor='drag'], .overflow-x-auto")) {
        setCursorState("drag");
        return;
      }

      // 3. Check for image container
      if (target.closest("img, picture, [data-cursor='image']")) {
        setCursorState("image");
        return;
      }

      // 4. Check for button / major CTA
      if (target.closest("button, [role='button'], .btn")) {
        setCursorState("button");
        return;
      }

      // 5. Check for links
      if (target.closest("a")) {
        setCursorState("link");
        return;
      }

      // Default state
      setCursorState("default");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  // Visual dimension styling per cursor state
  const stateStyles = {
    default: {
      ringSize: "w-7 h-7",
      dotScale: isClicking ? 0.7 : 1,
      ringScale: isClicking ? 0.85 : 1,
      bg: "rgba(124, 58, 237, 0.03)",
      border: "rgba(124, 58, 237, 0.3)",
    },
    link: {
      ringSize: "w-10 h-10",
      dotScale: 0,
      ringScale: isClicking ? 0.9 : 1.15,
      bg: "rgba(124, 58, 237, 0.08)",
      border: "rgba(124, 58, 237, 0.5)",
    },
    button: {
      ringSize: "w-12 h-12",
      dotScale: 0,
      ringScale: isClicking ? 0.9 : 1.25,
      bg: "rgba(124, 58, 237, 0.12)",
      border: "rgba(124, 58, 237, 0.6)",
    },
    image: {
      ringSize: "w-14 h-14",
      dotScale: 0,
      ringScale: isClicking ? 0.9 : 1.2,
      bg: "rgba(15, 23, 42, 0.25)",
      border: "rgba(255, 255, 255, 0.6)",
    },
    project: {
      ringSize: "px-3.5 py-1.5 min-w-[76px] min-h-[34px]",
      dotScale: 0,
      ringScale: isClicking ? 0.95 : 1,
      bg: "rgba(124, 58, 237, 0.96)",
      border: "rgba(124, 58, 237, 1)",
    },
    drag: {
      ringSize: "px-3 py-1 min-w-[64px] min-h-[28px]",
      dotScale: 0,
      ringScale: isClicking ? 0.92 : 1,
      bg: "rgba(15, 23, 42, 0.85)",
      border: "rgba(15, 23, 42, 1)",
    },
  }[cursorState];

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Precision Inner Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: stateStyles.dotScale,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="w-2.5 h-2.5 rounded-full bg-purple-600 fixed top-0 left-0 pointer-events-none shadow-xs"
      />

      {/* Fluid Trailing Ring / Morphing Pill */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: stateStyles.ringScale,
          opacity: isVisible ? 1 : 0,
          backgroundColor: stateStyles.bg,
          borderColor: stateStyles.border,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 pointer-events-none border rounded-full backdrop-blur-[2px] flex items-center justify-center text-white ${
          stateStyles.ringSize
        } ${cursorState === "project" ? "shadow-lg shadow-purple-600/35" : ""}`}
      >
        {cursorState === "project" && (
          <span className="text-2xs font-extrabold uppercase tracking-wider select-none animate-fadeIn whitespace-nowrap">
            {cursorLabel || "VIEW"}
          </span>
        )}

        {cursorState === "drag" && (
          <span className="text-3xs font-mono font-bold uppercase tracking-widest text-slate-100 select-none animate-fadeIn whitespace-nowrap">
            ‹ DRAG ›
          </span>
        )}
      </motion.div>
    </div>
  );
}
