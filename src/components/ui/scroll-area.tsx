import { ScrollShadow } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

function ScrollArea({ children, className, orientation = "vertical" }: ScrollAreaProps) {
  return (
    <ScrollShadow
      orientation={orientation}
      className={cn("relative overflow-auto", className)}
    >
      {children}
    </ScrollShadow>
  );
}

interface ScrollBarProps {
  className?: string;
  orientation?: "vertical" | "horizontal";
}

function ScrollBar({ className, orientation = "vertical" }: ScrollBarProps) {
  // Hero UI ScrollShadow handles scrollbars internally
  return null;
}

export { ScrollArea, ScrollBar };
