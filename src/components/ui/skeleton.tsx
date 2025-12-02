import { Skeleton as HeroSkeleton, SkeletonProps as HeroSkeletonProps } from "@heroui/react";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & Partial<HeroSkeletonProps>) {
  return <HeroSkeleton className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
