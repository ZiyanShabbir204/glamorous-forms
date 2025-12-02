import { forwardRef } from "react";
import { Popover as HeroPopover, PopoverTrigger as HeroPopoverTrigger, PopoverContent as HeroPopoverContent } from "@heroui/react";

import { cn } from "@/lib/utils";

const HoverCard = HeroPopover;

const HoverCardTrigger = HeroPopoverTrigger;

const HoverCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: string; sideOffset?: number }>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <HeroPopoverContent
      ref={ref}
      className={cn(
        "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        className,
      )}
      {...props}
    />
  ),
);
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };