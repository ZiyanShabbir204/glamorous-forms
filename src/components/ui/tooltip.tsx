import { Tooltip as HeroTooltip, type TooltipProps as HeroTooltipProps } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode, createContext } from "react";

// Create a context for tooltip provider (for compatibility)
const TooltipContext = createContext<{ delayDuration?: number }>({});

export interface TooltipProviderProps {
  children?: ReactNode;
  delayDuration?: number;
}

function TooltipProvider({ children, delayDuration = 200 }: TooltipProviderProps) {
  return (
    <TooltipContext.Provider value={{ delayDuration }}>
      {children}
    </TooltipContext.Provider>
  );
}

export interface TooltipProps extends HeroTooltipProps {}

function Tooltip({ className, ...props }: TooltipProps) {
  return (
    <HeroTooltip
      classNames={{
        content: cn("bg-popover text-popover-foreground rounded-md border px-3 py-1.5 text-sm shadow-md", className),
      }}
      {...props}
    />
  );
}

interface TooltipTriggerProps {
  children?: ReactNode;
  asChild?: boolean;
}

function TooltipTrigger({ children }: TooltipTriggerProps) {
  return <>{children}</>;
}

interface TooltipContentProps {
  children?: ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end" | string;
  hidden?: boolean;
}

function TooltipContent({ children, className, hidden }: TooltipContentProps) {
  if (hidden) return null;
  return (
    <div className={cn("bg-popover text-popover-foreground rounded-md border px-3 py-1.5 text-sm shadow-md", className)}>
      {children}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
