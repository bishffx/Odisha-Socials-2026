/**
 * ODISHA SOCIALS — MOTION DESIGN SYSTEM
 * Central Motion Tokens: Timings, Easings, Staggers, Distances & Springs.
 * Designed for buttery, 60fps GPU-accelerated motion with zero layout shifts.
 */

// Timing Durations (seconds)
export const MOTION_DURATION = {
  instant: 0.15,
  snappy: 0.25,
  fast: 0.35,
  base: 0.55,
  medium: 0.75,
  slow: 0.95,
  curtain: 1.1,
  hero: 1.25,
} as const;

// Precision Easing Curves
// CSS / Framer cubic-bezier & GSAP string representation
export const MOTION_EASE = {
  // Ultra-smooth decelerations (studio standard)
  power3Out: "power3.out",
  power4Out: "power4.out",
  expoOut: "expo.out",
  circOut: "circ.out",
  backOut: "back.out(1.5)",
  power2InOut: "power2.inOut",
  // Framer Motion cubic-bezier tuples
  framer: {
    power3: [0.215, 0.61, 0.355, 1] as const,
    power4: [0.165, 0.84, 0.44, 1] as const,
    expo: [0.16, 1, 0.3, 1] as const,
    circ: [0.075, 0.82, 0.165, 1] as const,
    soft: [0.25, 0.1, 0.25, 1] as const,
    anticipate: [0.36, 0, 0.66, -0.56] as const,
  },
} as const;

// Stagger Cadences (seconds between siblings)
export const MOTION_STAGGER = {
  dense: 0.02,
  fast: 0.04,
  base: 0.08,
  medium: 0.12,
  relaxed: 0.18,
} as const;

// Physical Distances for GPU Translations (px)
export const MOTION_DISTANCE = {
  micro: 8,
  subtle: 16,
  base: 28,
  medium: 44,
  generous: 64,
  deep: 100,
} as const;

// Scale Factors (transform: scale)
export const MOTION_SCALE = {
  pressed: 0.97,
  rest: 1,
  hoverSubtle: 1.015,
  hoverCard: 1.025,
  hoverFloat: 1.05,
  revealStart: 0.94,
  zoomOutStart: 1.08,
} as const;

// Springs for physics-based elements (custom cursor, magnetic buttons, pull-tabs)
export const MOTION_SPRING = {
  snappy: { damping: 20, stiffness: 300, mass: 0.8 },
  smooth: { damping: 26, stiffness: 220, mass: 1 },
  gentle: { damping: 32, stiffness: 140, mass: 1.2 },
  bouncy: { damping: 15, stiffness: 250, mass: 0.9 },
  cursor: { damping: 28, stiffness: 400, mass: 0.5 },
} as const;

// Viewport Intersection Defaults
export const MOTION_VIEWPORT = {
  once: true,
  margin: "-40px",
  amount: 0.2,
} as const;
