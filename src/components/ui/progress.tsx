import { Progress as HeroProgress, type ProgressProps as HeroProgressProps } from "@heroui/react";
import { cn } from "@/lib/utils";

interface ProgressProps extends Omit<HeroProgressProps, "ref"> {
  className?: string;
  value?: number;
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  return (
    <HeroProgress
      value={value}
      classNames={{
        base: cn("w-full", className),
        track: "bg-secondary",
        indicator: "bg-primary",
      }}
      {...props}
    />
  );
}

export { Progress, type ProgressProps };
