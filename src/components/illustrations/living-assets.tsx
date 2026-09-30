"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. LIVING VISUAL AMBIENT MOTION WRAPPER
// Handles independent asynchronous floating, subtle 2-6 deg rotation,
// scroll parallax, and smoothed gentle desktop mouse following.
// ============================================================================

interface LivingVisualProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // e.g. 5.5, 6.8, 7.4, 8.2 (never synchronized)
  amplitude?: number; // floating vertical distance (e.g. 8 - 14px)
  rotation?: number; // subtle angle (2 to 6 degrees max)
  delay?: number; // staggered startup delay
  parallaxSpeed?: number; // 0.1 for background, 0.5 for foreground
  mouseFollow?: boolean; // gentle smoothed cursor reaction
  mouseStrength?: number; // max drift in pixels (e.g. 8 - 14px)
}

export function LivingVisual({
  children,
  className,
  duration = 6.4,
  amplitude = 10,
  rotation = 3.5,
  delay = 0,
  parallaxSpeed = 0.2,
  mouseFollow = true,
  mouseStrength = 12,
}: LivingVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Scroll parallax tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [-40 * parallaxSpeed, 40 * parallaxSpeed]
  );

  // Desktop smoothed mouse tracking (gentle spring physics)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 36, stiffness: 75, mass: 0.8 });
  const smoothMouseY = useSpring(mouseY, { damping: 36, stiffness: 75, mass: 0.8 });

  useEffect(() => {
    setIsClient(true);
    if (!mouseFollow || typeof window === "undefined" || window.innerWidth < 640) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized offset from screen center (-0.5 to 0.5)
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(nx * mouseStrength);
      mouseY.set(ny * mouseStrength);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseFollow, mouseStrength, mouseX, mouseY]);

  return (
    <div ref={containerRef} className={cn("relative inline-block select-none", className)}>
      {/* Scroll Parallax + Mouse Follow Outer Carrier */}
      <motion.div
        style={{
          y: scrollParallaxY,
          x: isClient && mouseFollow ? smoothMouseX : 0,
        }}
      >
        {/* Independent Asynchronous Floating & Rotation Loop (Pure harmonic sine cycle) */}
        <motion.div
          animate={{
            y: [-amplitude, amplitude],
            rotate: [-rotation, rotation],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 2. ORIGINAL ODISHA SOCIALS ILLUSTRATION ASSETS
// Hand-crafted SVG vector illustrations with rich gradients, drop-shadows,
// and tactile depth matching the brand's aesthetic.
// ============================================================================

/**
 * Creative Social Media Creator Character Illustration
 * Stylized creator holding a cinematic gimbal/camera with floating reel bubbles.
 */
export function CreatorCharacterIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-32 h-32 sm:w-40 sm:h-40 drop-shadow-lg", className)}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="creatorGrad" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9333ea" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fed7aa" />
          <stop offset="1" stopColor="#fdba74" />
        </linearGradient>
        <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Ambient Glow Aura */}
      <circle cx="80" cy="80" r="60" fill="url(#creatorGrad)" opacity="0.12" filter="blur(16px)" />

      {/* Body / Hoodie */}
      <path
        d="M50 145 C50 115 62 105 80 105 C98 105 110 115 110 145 Z"
        fill="url(#creatorGrad)"
      />

      {/* Head */}
      <circle cx="80" cy="65" r="24" fill="url(#skinGrad)" />

      {/* Hair (Chic modern crop) */}
      <path
        d="M56 60 C56 42 70 36 84 36 C98 36 104 44 104 55 C96 52 86 52 80 55 C74 58 64 56 56 60 Z"
        fill="#1e1b4b"
      />

      {/* Glasses */}
      <rect x="66" y="58" width="12" height="9" rx="3" fill="#1e1b4b" />
      <rect x="82" y="58" width="12" height="9" rx="3" fill="#1e1b4b" />
      <line x1="78" y1="62" x2="82" y2="62" stroke="#1e1b4b" strokeWidth="2" />

      {/* Camera Gimbal held in hand */}
      <g transform="translate(90, 80)">
        <rect x="0" y="8" width="8" height="28" rx="4" fill="#0f172a" />
        {/* Gimbal Arm */}
        <path d="M4 8 L4 -6 L18 -6" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        {/* Camera Body */}
        <rect x="12" y="-18" width="28" height="20" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
        {/* Lens */}
        <circle cx="26" cy="-8" r="6" fill="url(#lensGrad)" />
        <circle cx="26" cy="-8" r="2" fill="#ffffff" />
        {/* Red REC Blinking Dot */}
        <circle cx="34" cy="-13" r="1.5" fill="#ef4444" />
      </g>

      {/* Floating Floating Reel / Heart Pill */}
      <g transform="translate(18, 30)">
        <rect width="36" height="22" rx="11" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="5" fill="#ec4899" />
        <path d="M9.5 11 L13 11 M11.25 9.25 L11.25 12.75" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
        <rect x="19" y="8" width="10" height="2.5" rx="1.25" fill="#94a3b8" />
        <rect x="19" y="13" width="7" height="2" rx="1" fill="#cbd5e1" />
      </g>

      {/* Sparkle Accent */}
      <path
        d="M136 34 L138 42 L146 44 L138 46 L136 54 L134 46 L126 44 L134 42 Z"
        fill="#f59e0b"
      />
    </svg>
  );
}

/**
 * UI/UX Designer Character Illustration
 * Modern designer adjusting vector shapes, spatial artboards, and color nodes.
 */
export function DesignerCharacterIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-32 h-32 sm:w-40 sm:h-40 drop-shadow-lg", className)}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="designerGrad" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="artboardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#faf5ff" />
        </linearGradient>
      </defs>

      {/* Glow */}
      <circle cx="80" cy="80" r="55" fill="url(#designerGrad)" opacity="0.12" filter="blur(16px)" />

      {/* Floating Spatial Design Artboard */}
      <g transform="translate(45, 30) rotate(-6)">
        <rect width="68" height="88" rx="14" fill="url(#artboardGrad)" stroke="#d8b4fe" strokeWidth="2" />
        {/* Header bar */}
        <rect x="8" y="10" width="22" height="6" rx="3" fill="#ec4899" />
        <circle cx="58" cy="13" r="3" fill="#cbd5e1" />
        {/* Visual block */}
        <rect x="8" y="22" width="52" height="30" rx="8" fill="#f3e8ff" />
        <circle cx="34" cy="37" r="8" fill="#c084fc" opacity="0.7" />
        {/* Paragraph lines */}
        <rect x="8" y="58" width="40" height="4" rx="2" fill="#94a3b8" />
        <rect x="8" y="66" width="48" height="4" rx="2" fill="#cbd5e1" />
        {/* CTA Button */}
        <rect x="8" y="74" width="24" height="6" rx="3" fill="#7c3aed" />
      </g>

      {/* Floating Color Swatches Palette */}
      <g transform="translate(18, 90)">
        <rect width="32" height="44" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="16" cy="12" r="5" fill="#7c3aed" />
        <circle cx="16" cy="24" r="5" fill="#ec4899" />
        <circle cx="16" cy="36" r="5" fill="#38bdf8" />
      </g>

      {/* Vector Pen Tool / Stylus Cursor */}
      <g transform="translate(112, 75) rotate(22)">
        <path d="M0 0 L14 18 L7 18 L10 26 L6 28 L3 20 L-4 22 Z" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
      </g>

      {/* Starburst */}
      <path
        d="M30 24 L32 29 L37 31 L32 33 L30 38 L28 33 L23 31 L28 29 Z"
        fill="#a855f7"
      />
    </svg>
  );
}

/**
 * Modern Developer Character Illustration
 * Full-stack engineer crafting sub-second edge platforms with Next.js brackets & 3D cube.
 */
export function DeveloperCharacterIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-32 h-32 sm:w-40 sm:h-40 drop-shadow-lg", className)}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="devGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0284c7" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0f172a" />
          <stop offset="1" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>

      {/* Aura */}
      <circle cx="80" cy="80" r="55" fill="url(#devGrad)" opacity="0.12" filter="blur(16px)" />

      {/* Sleek Laptop Terminal */}
      <g transform="translate(34, 45)">
        {/* Screen Bezel */}
        <rect x="6" y="0" width="80" height="54" rx="8" fill="url(#screenGrad)" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Terminal Header dots */}
        <circle cx="14" cy="8" r="2" fill="#ef4444" />
        <circle cx="20" cy="8" r="2" fill="#f59e0b" />
        <circle cx="26" cy="8" r="2" fill="#10b981" />
        {/* Code Lines */}
        <rect x="14" y="16" width="30" height="3" rx="1.5" fill="#38bdf8" />
        <rect x="22" y="23" width="44" height="3" rx="1.5" fill="#a855f7" />
        <rect x="22" y="30" width="34" height="3" rx="1.5" fill="#10b981" />
        <rect x="14" y="37" width="18" height="3" rx="1.5" fill="#f43f5e" />
        {/* Laptop Base */}
        <path d="M0 54 L92 54 L86 64 L6 64 Z" fill="#334155" />
        <rect x="36" y="55" width="20" height="3" rx="1.5" fill="#64748b" />
      </g>

      {/* Floating 3D Wireframe Cube (Spatial Web) */}
      <g transform="translate(108, 20) rotate(15)">
        <rect width="28" height="28" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M6 14 L22 14 M14 6 L14 22" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        <circle cx="14" cy="14" r="3" fill="#a855f7" />
      </g>

      {/* Sub-Second Lightning Speed Node */}
      <g transform="translate(18, 55)">
        <circle cx="14" cy="14" r="14" fill="#ffffff" stroke="#e0f2fe" strokeWidth="1.5" />
        <path d="M16 6 L9 15 L14 15 L12 22 L19 13 L14 13 Z" fill="#0284c7" />
      </g>
    </svg>
  );
}

/**
 * Tactile Cinematic 3D Camera Illustration
 * Features lens rings, vintage body, viewfinder, and glowing record indicator.
 */
export function CinematicCameraIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md", className)}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="camBody" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1e1b4b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="lensShine" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a855f7" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Camera Body */}
      <rect x="20" y="34" width="76" height="56" rx="16" fill="url(#camBody)" stroke="#6366f1" strokeWidth="2" />

      {/* Top Flash / Viewfinder */}
      <rect x="42" y="24" width="32" height="12" rx="4" fill="#334155" stroke="#475569" strokeWidth="1.5" />
      <circle cx="58" cy="30" r="3" fill="#f59e0b" />

      {/* Large Cinema Lens */}
      <circle cx="58" cy="62" r="22" fill="#020617" stroke="#475569" strokeWidth="2" />
      <circle cx="58" cy="62" r="17" fill="url(#lensShine)" opacity="0.85" />
      <circle cx="54" cy="58" r="5" fill="#ffffff" opacity="0.7" />

      {/* Gold Accent Ring */}
      <circle cx="58" cy="62" r="21" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

      {/* Red REC Indicator */}
      <circle cx="84" cy="44" r="3" fill="#ef4444" />
      <circle cx="84" cy="44" r="5" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/**
 * Phone Reels & Short-Form Video Illustration
 * Glossy smartphone with vertical timeline, sound waves, and heart bursts.
 */
export function PhoneReelsIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-24 h-32 sm:w-28 sm:h-36 drop-shadow-md", className)}
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="phoneScreen" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4c1d95" />
          <stop offset="0.6" stopColor="#1e1b4b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* Phone Case */}
      <rect x="22" y="10" width="76" height="130" rx="20" fill="#020617" stroke="#7c3aed" strokeWidth="2.5" />

      {/* Screen Area */}
      <rect x="26" y="14" width="68" height="122" rx="16" fill="url(#phoneScreen)" />

      {/* Dynamic Island / Speaker */}
      <rect x="48" y="18" width="24" height="5" rx="2.5" fill="#020617" />

      {/* Reel Wave / Sound Wave */}
      <g transform="translate(36, 68)">
        <rect x="0" y="4" width="3" height="16" rx="1.5" fill="#ec4899" />
        <rect x="6" y="0" width="3" height="24" rx="1.5" fill="#c084fc" />
        <rect x="12" y="6" width="3" height="12" rx="1.5" fill="#a855f7" />
        <rect x="18" y="2" width="3" height="20" rx="1.5" fill="#ec4899" />
        <rect x="24" y="8" width="3" height="8" rx="1.5" fill="#e879f9" />
        <rect x="30" y="1" width="3" height="22" rx="1.5" fill="#c084fc" />
        <rect x="36" y="5" width="3" height="14" rx="1.5" fill="#a855f7" />
        <rect x="42" y="3" width="3" height="18" rx="1.5" fill="#ec4899" />
      </g>

      {/* Floating Heart Icon on Side */}
      <g transform="translate(80, 80)">
        <circle cx="6" cy="6" r="8" fill="#ec4899" />
        <path d="M4 6 C4 4.5 5 4 6 5 C7 4 8 4.5 8 6 C8 7.5 6 9 6 9 C6 9 4 7.5 4 6 Z" fill="#ffffff" />
      </g>

      {/* Scrubber Progress Bar */}
      <rect x="32" y="122" width="56" height="3" rx="1.5" fill="#334155" />
      <rect x="32" y="122" width="34" height="3" rx="1.5" fill="#c084fc" />
    </svg>
  );
}

/**
 * Analytics & Telemetry Sphere Illustration
 * Floating glass sphere with compounding ROI graph and orbital rings.
 */
export function AnalyticsSphereIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md", className)}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="orbGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Outer Orbital Ring */}
      <ellipse cx="60" cy="60" rx="46" ry="18" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" transform="rotate(-20 60 60)" opacity="0.6" />

      {/* Main Glass Sphere */}
      <circle cx="60" cy="60" r="32" fill="#ffffff" stroke="#a7f3d0" strokeWidth="2" />
      <circle cx="60" cy="60" r="28" fill="url(#orbGrad)" opacity="0.1" />

      {/* Compounding Chart Bars */}
      <rect x="42" y="66" width="6" height="12" rx="3" fill="#10b981" />
      <rect x="52" y="58" width="6" height="20" rx="3" fill="#059669" />
      <rect x="62" y="50" width="6" height="28" rx="3" fill="#047857" />
      <rect x="72" y="42" width="6" height="36" rx="3" fill="#065f46" />

      {/* Trending Up Arrow */}
      <path
        d="M44 64 L54 55 L64 51 L76 38 M76 38 L68 38 M76 38 L76 46"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Floating Badge */}
      <g transform="translate(68, 20)">
        <rect width="36" height="16" rx="8" fill="#10b981" />
        <text x="18" y="11" fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
          +340%
        </text>
      </g>
    </svg>
  );
}

/**
 * Abstract Floating 3D Geometric Torus / Star / Pill Object
 */
export function AbstractGeometricIllustration({
  variant = "torus",
  className,
}: {
  variant?: "torus" | "cube" | "star" | "capsule";
  className?: string;
}) {
  if (variant === "cube") {
    return (
      <svg className={cn("w-14 h-14", className)} viewBox="0 0 60 60" fill="none">
        <path d="M30 6 L52 18 L52 42 L30 54 L8 42 L8 18 Z" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
        <path d="M30 6 L30 30 L52 42 M30 30 L8 42" stroke="#a855f7" strokeWidth="1.5" />
      </svg>
    );
  }

  if (variant === "star") {
    return (
      <svg className={cn("w-12 h-12 text-amber-400 fill-current", className)} viewBox="0 0 24 24">
        <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
      </svg>
    );
  }

  if (variant === "capsule") {
    return (
      <svg className={cn("w-16 h-10", className)} viewBox="0 0 80 40" fill="none">
        <rect x="4" y="6" width="72" height="28" rx="14" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
        <circle cx="20" cy="20" r="7" fill="#7c3aed" />
        <rect x="34" y="17" width="28" height="6" rx="3" fill="#cbd5e1" />
      </svg>
    );
  }

  // Torus / Ring
  return (
    <svg className={cn("w-16 h-16", className)} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="torusGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="22" stroke="url(#torusGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="100 20" />
      <circle cx="24" cy="18" r="3" fill="#ffffff" />
    </svg>
  );
}
