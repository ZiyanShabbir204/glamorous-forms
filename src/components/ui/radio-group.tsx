import { forwardRef } from "react";
import { RadioGroup as HeroRadioGroup, Radio as HeroRadio, RadioGroupProps as HeroRadioGroupProps, RadioProps as HeroRadioProps } from "@heroui/react";

import { cn } from "@/lib/utils";

const RadioGroup = forwardRef<HTMLDivElement, HeroRadioGroupProps>(
  ({ className, ...props }, ref) => {
    return <HeroRadioGroup ref={ref} className={cn("grid gap-2", className)} {...props} />;
  },
);
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = forwardRef<HTMLInputElement, HeroRadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <HeroRadio
        ref={ref}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };