import { Checkbox as HeroCheckbox, type CheckboxProps as HeroCheckboxProps } from "@heroui/react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<HeroCheckboxProps, "ref"> {
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

function Checkbox({ className, onCheckedChange, checked, isSelected, onValueChange, ...props }: CheckboxProps) {
  return (
    <HeroCheckbox
      isSelected={checked ?? isSelected}
      onValueChange={(value) => {
        onCheckedChange?.(value);
        onValueChange?.(value);
      }}
      classNames={{
        base: cn(className),
        wrapper: "before:border-primary after:bg-primary",
      }}
      {...props}
    />
  );
}

export { Checkbox, type CheckboxProps };
