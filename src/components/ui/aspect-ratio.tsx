import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AspectRatioProps {
  ratio?: number;
  children: ReactNode;
  className?: string;
}

function AspectRatio({ ratio = 1, children, className }: AspectRatioProps) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ paddingBottom: `${100 / ratio}%` }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export { AspectRatio, type AspectRatioProps };
