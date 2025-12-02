import { Spinner as HeroSpinner, type SpinnerProps as HeroSpinnerProps } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends HeroSpinnerProps {}

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <HeroSpinner
      classNames={{
        base: cn("", className),
      }}
      {...props}
    />
  );
}

export { Spinner };
