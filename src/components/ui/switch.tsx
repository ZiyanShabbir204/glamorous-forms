import { Switch as HeroSwitch, type SwitchProps as HeroSwitchProps } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends HeroSwitchProps {}

function Switch({ className, ...props }: SwitchProps) {
  return (
    <HeroSwitch
      classNames={{
        base: cn("inline-flex", className),
      }}
      {...props}
    />
  );
}

export { Switch };
