import { Avatar as HeroAvatar, type AvatarProps as HeroAvatarProps } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends HeroAvatarProps {}

function Avatar({ className, ...props }: AvatarProps) {
  return (
    <HeroAvatar
      classNames={{
        base: cn("h-10 w-10", className),
      }}
      {...props}
    />
  );
}

export { Avatar };
