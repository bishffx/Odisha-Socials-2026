"use client";

import { type ReactNode, forwardRef } from "react";
import { useCinematicScene, type CinematicCameraOptions } from "@/lib/motion/cinematic-camera";
import { cn } from "@/lib/utils";

export interface CinematicSceneProps extends CinematicCameraOptions {
  id?: string;
  sceneNumber?: string;
  sceneLabel?: string;
  className?: string;
  surface?: "flat" | "card" | "soft";
  children: ReactNode;
}

/**
 * CinematicScene:
 * Wraps major sections into discrete cinematic scenes.
 * Implements camera-depth scroll scrubbing (enter -> focus -> recede) with zero layout shifts.
 */
export const CinematicScene = forwardRef<HTMLElement, CinematicSceneProps>(
  function CinematicScene(
    {
      id,
      sceneNumber,
      sceneLabel,
      className,
      surface = "flat",
      children,
      isFirstScene,
      isLastScene,
      recedeScale = 0.96,
      enterScale = 0.97,
      enableDepthLayers = true,
      enablePerspective = true,
    },
    forwardedRef
  ) {
    const sceneRef = useCinematicScene<HTMLElement>({
      isFirstScene,
      isLastScene,
      recedeScale,
      enterScale,
      enableDepthLayers,
      enablePerspective,
    });

    const surfaceStyles = {
      flat: "",
      card: "rounded-[32px] sm:rounded-[44px] bg-white border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.06)] p-5 sm:p-10 lg:p-14 my-6 sm:my-10",
      soft: "rounded-[32px] sm:rounded-[44px] bg-[#faf9fe] border border-purple-100/70 p-5 sm:p-10 lg:p-14 my-6 sm:my-10",
    };

    return (
      <section
        id={id}
        ref={(node) => {
          // Attach local ref for GSAP controller
          (sceneRef as React.MutableRefObject<HTMLElement | null>).current = node;
          // Forward ref if provided
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        data-scene-id={id}
        data-scene-number={sceneNumber}
        className={cn(
          "relative w-full scroll-mt-24 transition-opacity duration-300 transform-gpu will-change-transform",
          surfaceStyles[surface],
          className
        )}
      >
        {/* Subtle Cinematic Scene Indicator (Rendered only if sceneNumber is provided and requested) */}
        {sceneNumber && (
          <div className="sr-only">
            {sceneNumber} — {sceneLabel}
          </div>
        )}

        {children}
      </section>
    );
  }
);
