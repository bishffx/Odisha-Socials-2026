import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  noPadding?: boolean;
}

export function SectionContainer({
  id,
  children,
  className,
  innerClassName,
  noPadding = false,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-28 relative",
        !noPadding && "py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14",
        className
      )}
    >
      <div className={cn("w-full max-w-6xl mx-auto", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
