import { Popover as HeroPopover, PopoverTrigger, PopoverContent as HeroPopoverContent, type PopoverProps as HeroPopoverProps } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface PopoverProps extends HeroPopoverProps {}

function Popover(props: PopoverProps) {
  return <HeroPopover {...props} />;
}

interface PopoverContentProps {
  children?: ReactNode;
  className?: string;
}

function PopoverContent({ className, children, ...props }: PopoverContentProps) {
  return (
    <HeroPopoverContent
      className={cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md", className)}
      {...props}
    >
      {children}
    </HeroPopoverContent>
  );
}

export { Popover, PopoverTrigger, PopoverContent };
