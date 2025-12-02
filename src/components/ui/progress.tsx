import { forwardRef } from "react";
import { Progress as HeroProgress, ProgressProps as HeroProgressProps } from "@heroui/react";

import { cn } from "@/lib/utils";

const Progress = forwardRef<HTMLDivElement, HeroProgressProps>(
  ({ className, value, ...props }, ref) => (
    <HeroProgress
      ref={ref}
      value={value}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    />
  ),
);
Progress.displayName = "Progress";

export { Progress };