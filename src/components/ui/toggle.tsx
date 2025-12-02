import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ToggleProps extends VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

function Toggle({ 
  pressed: controlledPressed, 
  defaultPressed = false, 
  onPressedChange,
  variant,
  size,
  className, 
  children,
  disabled,
  ...props 
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const pressed = controlledPressed ?? internalPressed;

  const handlePress = () => {
    const newPressed = !pressed;
    setInternalPressed(newPressed);
    onPressedChange?.(newPressed);
  };

  return (
    <Button
      variant={pressed ? "solid" : variant === "outline" ? "bordered" : "light"}
      color={pressed ? "primary" : "default"}
      isDisabled={disabled}
      className={cn(toggleVariants({ variant, size, className }))}
      onPress={handlePress}
      data-state={pressed ? "on" : "off"}
      {...props}
    >
      {children}
    </Button>
  );
}

export { Toggle, toggleVariants, type ToggleProps };
