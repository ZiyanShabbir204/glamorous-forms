import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface HoverCardProps {
  children: ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

function HoverCard({ children }: HoverCardProps) {
  return <div className="relative inline-block">{children}</div>;
}

interface HoverCardTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

function HoverCardTrigger({ children }: HoverCardTriggerProps) {
  return <span className="cursor-pointer">{children}</span>;
}

interface HoverCardContentProps {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

function HoverCardContent({ children, className }: HoverCardContentProps) {
  return (
    <div className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
      className
    )}>
      {children}
    </div>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
