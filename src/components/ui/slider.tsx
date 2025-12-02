import { forwardRef } from "react";
import { Slider as HeroSlider, SliderProps as HeroSliderProps } from "@heroui/react";

import { cn } from "@/lib/utils";

const Slider = forwardRef<HTMLDivElement, HeroSliderProps>(
  ({ className, ...props }, ref) => (
    <HeroSlider
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    />
  ),
);
Slider.displayName = "Slider";

export { Slider };