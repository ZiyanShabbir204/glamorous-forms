import { Breadcrumbs, BreadcrumbItem as HeroBreadcrumbItem } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";

interface BreadcrumbProps {
  children: ReactNode;
  separator?: ReactNode;
  className?: string;
}

function Breadcrumb({ children, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn(className)}>
      {children}
    </nav>
  );
}

interface BreadcrumbListProps {
  children: ReactNode;
  className?: string;
}

function BreadcrumbList({ children, className }: BreadcrumbListProps) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", className)}>
      {children}
    </ol>
  );
}

interface BreadcrumbItemProps {
  children: ReactNode;
  className?: string;
}

function BreadcrumbItem({ children, className }: BreadcrumbItemProps) {
  return (
    <li className={cn("inline-flex items-center gap-1.5", className)}>
      {children}
    </li>
  );
}

interface BreadcrumbLinkProps {
  children: ReactNode;
  href?: string;
  className?: string;
  asChild?: boolean;
}

function BreadcrumbLink({ children, href, className, asChild }: BreadcrumbLinkProps) {
  if (asChild) {
    return <span className={cn("transition-colors hover:text-foreground", className)}>{children}</span>;
  }
  
  return (
    <a href={href} className={cn("transition-colors hover:text-foreground", className)}>
      {children}
    </a>
  );
}

interface BreadcrumbPageProps {
  children: ReactNode;
  className?: string;
}

function BreadcrumbPage({ children, className }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
    >
      {children}
    </span>
  );
}

interface BreadcrumbSeparatorProps {
  children?: ReactNode;
  className?: string;
}

function BreadcrumbSeparator({ children, className }: BreadcrumbSeparatorProps) {
  return (
    <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)}>
      {children ?? <ChevronRight />}
    </li>
  );
}

interface BreadcrumbEllipsisProps {
  className?: string;
}

function BreadcrumbEllipsis({ className }: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
