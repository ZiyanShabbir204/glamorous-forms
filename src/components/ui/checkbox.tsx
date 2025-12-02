import { forwardRef } from "react";
import { Checkbox as HeroCheckbox, CheckboxProps as HeroCheckboxProps } from "@heroui/react";

import { cn } from "@/lib/utils";

const Checkbox = forwardRef<HTMLInputElement, HeroCheckboxProps>(
  ({ className, ...props }, ref) => (
    <HeroCheckbox
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";

export { Checkbox };