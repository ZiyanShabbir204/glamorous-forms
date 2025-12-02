import { forwardRef } from "react";
import { Switch as HeroSwitch, SwitchProps as HeroSwitchProps } from "@heroui/react";

import { cn } from "@/lib/utils";

const Switch = forwardRef<HTMLButtonElement, HeroSwitchProps>(
  ({ className, ...props }, ref) => (
    <HeroSwitch
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[selected=true]:bg-primary data-[selected=false]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);
Switch.displayName = "Switch";

export { Switch };