import { Chip, type ChipProps } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends Omit<ChipProps, "variant"> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const variantMap: Record<string, ChipProps["variant"]> = {
  default: "solid",
  secondary: "flat",
  destructive: "solid",
  outline: "bordered",
};

const colorMap: Record<string, ChipProps["color"]> = {
  default: "primary",
  secondary: "secondary",
  destructive: "danger",
  outline: "default",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <Chip
      variant={variantMap[variant]}
      color={colorMap[variant]}
      classNames={{
        base: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", className),
      }}
      {...props}
    />
  );
}

export { Badge };
