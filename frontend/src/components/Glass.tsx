import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "strong";
}

export function Glass({ children, className, variant = "default", ...rest }: GlassProps) {
  return (
    <div
      {...rest}
      className={cn(
        "relative rounded-[18px] border backdrop-blur-xl",
        variant === "default"
          ? "bg-white/80 border-border shadow-sm shadow-slate-900/5"
          : "bg-white border-border shadow-lg shadow-slate-900/8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent",
        className,
      )}
    />
  );
}
