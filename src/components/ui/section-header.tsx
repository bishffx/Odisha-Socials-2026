import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "purple" | "blue" | "neutral" | "amber" | "pink" | "emerald";
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: "left" | "center" | "right";
  withSpark?: boolean;
  sparkType?: "burst" | "squiggle" | "loop" | "star";
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = "purple",
  title,
  subtitle,
  align = "center",
  withSpark = false,
  sparkType = "burst",
  className,
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignStyles[align], className)}>
      {badge && (
        <Badge variant={badgeVariant} withDot className="mb-4">
          {badge}
        </Badge>
      )}

      <div className="relative">
        {withSpark && align === "center" && (
          <SparkDoodle
            variant={sparkType}
            className="absolute -top-6 -right-7 w-7 h-7 text-amber-500 hidden sm:block animate-pulse-soft"
          />
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
