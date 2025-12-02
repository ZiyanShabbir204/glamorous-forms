import React, { forwardRef, ReactNode, useState, useRef, useEffect, ReactElement, cloneElement, Children } from "react";
import { Tooltip as HeroTooltip, TooltipProps as HeroTooltipProps } from "@heroui/react";

import { cn } from "@/lib/utils";

const TooltipProvider = ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <>{children}</>;

interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

const Tooltip = ({ children, ...props }: TooltipProps) => {
  const [content, setContent] = useState<{ content: ReactNode; side?: string; sideOffset?: number; className?: string; hidden?: boolean } | null>(null);
  const [trigger, setTrigger] = useState<ReactNode>(null);

  // Extract trigger and content from children
  useEffect(() => {
    const childrenArray = Children.toArray(children);
    let foundTrigger: ReactNode = null;
    let contentInfo: { content: ReactNode; side?: string; sideOffset?: number; className?: string; hidden?: boolean } | null = null;

    childrenArray.forEach((child) => {
      if (React.isValidElement(child)) {
        // Check by displayName or component name
        const componentName = (child.type as any)?.displayName || (child.type as any)?.name || "";
        if (componentName === "TooltipTrigger" || (child.props as any)?.["data-tooltip-trigger"]) {
          foundTrigger = child;
        } else if (componentName === "TooltipContent" || (child.props as any)?.["data-tooltip-content"]) {
          contentInfo = {
            content: child.props.children,
            side: child.props.side,
            sideOffset: child.props.sideOffset,
            className: child.props.className,
            hidden: child.props.hidden,
          };
        }
      }
    });

    setTrigger(foundTrigger);
    if (contentInfo && !contentInfo.hidden) {
      setContent(contentInfo);
    } else {
      setContent(null);
    }
  }, [children]);

  // If we have both trigger and content, wrap with Hero UI Tooltip
  if (content && content.content && trigger) {
    const placementMap: Record<string, HeroTooltipProps["placement"]> = {
      top: "top",
      bottom: "bottom",
      left: "left",
      right: "right",
    };

    return (
      <HeroTooltip
        content={
          <div className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
            content.className,
          )}>
            {content.content}
          </div>
        }
        placement={placementMap[content.side || "top"] || "top"}
        offset={content.sideOffset || 4}
      >
        {trigger}
      </HeroTooltip>
    );
  }

  // Fallback: render children as-is
  return <>{children}</>;
};

interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild, className, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return cloneElement(children, { ref, className: cn(className, children.props.className), "data-tooltip-trigger": true, ...props } as any);
    }
    
    return (
      <span ref={ref as any} className={className} data-tooltip-trigger {...props}>
        {children}
      </span>
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  hidden?: boolean;
  children: ReactNode;
}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", sideOffset = 4, children, hidden, ...props }, ref) => {
    // This component is just a marker - the actual rendering happens in Tooltip
    // We return null since Tooltip will extract the props
    return <div ref={ref} data-tooltip-content style={{ display: "none" }} />;
  },
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
