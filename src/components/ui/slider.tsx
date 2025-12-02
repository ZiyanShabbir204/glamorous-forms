import { Slider as HeroSlider, type SliderProps as HeroSliderProps } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface SliderProps extends HeroSliderProps {}

function Slider({ className, ...props }: SliderProps) {
  return (
    <HeroSlider
      classNames={{
        base: cn("max-w-full", className),
      }}
      {...props}
    />
  );
}

export { Slider };
