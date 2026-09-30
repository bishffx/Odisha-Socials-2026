import { cn } from "@/lib/utils";

interface SparkDoodleProps {
  variant?: "burst" | "squiggle" | "loop" | "star";
  className?: string;
}

export function SparkDoodle({ variant = "burst", className }: SparkDoodleProps) {
  if (variant === "burst") {
    return (
      <svg
        className={cn("w-6 h-6 text-amber-500 fill-current", className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
      </svg>
    );
  }

  if (variant === "squiggle") {
    return (
      <svg
        className={cn("w-12 h-6 text-purple-600 stroke-current", className)}
        viewBox="0 0 48 24"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 14C8 6 12 18 16 12C20 6 24 18 28 12C32 6 36 18 44 10" />
      </svg>
    );
  }

  if (variant === "loop") {
    return (
      <svg
        className={cn("w-14 h-10 text-purple-400 stroke-current", className)}
        viewBox="0 0 60 40"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 28C15 35 25 35 32 24C38 14 30 5 20 12C12 18 18 32 35 32C45 32 52 22 55 15" />
      </svg>
    );
  }

  return (
    <svg
      className={cn("w-5 h-5 text-purple-500 fill-current", className)}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 0L11.8 7.2L19 9L11.8 10.8L10 18L8.2 10.8L1 9L8.2 7.2L10 0Z" />
    </svg>
  );
}
