import { ButtonGroup, Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { useState, createContext, useContext, ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { toggleVariants } from "@/components/ui/toggle";

interface ToggleGroupContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  type: "single" | "multiple";
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  value: "",
  onValueChange: () => {},
  type: "single",
  variant: "default",
  size: "default",
});

interface ToggleGroupProps extends VariantProps<typeof toggleVariants> {
  type: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  children: ReactNode;
}

function ToggleGroup({ 
  type, 
  value: controlledValue, 
  defaultValue,
  onValueChange,
  variant = "default",
  size = "default",
  className,
  children 
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (type === "multiple" ? [] : "")
  );
  const value = controlledValue ?? internalValue;

  const handleValueChange = (itemValue: string) => {
    let newValue: string | string[];
    
    if (type === "multiple") {
      const currentArray = Array.isArray(value) ? value : [value].filter(Boolean);
      if (currentArray.includes(itemValue)) {
        newValue = currentArray.filter(v => v !== itemValue);
      } else {
        newValue = [...currentArray, itemValue];
      }
    } else {
      newValue = value === itemValue ? "" : itemValue;
    }
    
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange: handleValueChange, type, variant, size }}>
      <div className={cn("flex items-center justify-center gap-1", className)}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps extends VariantProps<typeof toggleVariants> {
  value: string;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

function ToggleGroupItem({ value: itemValue, className, children, variant: itemVariant, size: itemSize, disabled }: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);
  const isPressed = Array.isArray(context.value) ? context.value.includes(itemValue) : context.value === itemValue;
  
  const variant = context.variant || itemVariant;
  const size = context.size || itemSize;

  return (
    <Button
      variant={isPressed ? "solid" : variant === "outline" ? "bordered" : "light"}
      color={isPressed ? "primary" : "default"}
      isDisabled={disabled}
      className={cn(
        toggleVariants({ variant, size }),
        className
      )}
      onPress={() => context.onValueChange(itemValue)}
      data-state={isPressed ? "on" : "off"}
    >
      {children}
    </Button>
  );
}

export { ToggleGroup, ToggleGroupItem };
