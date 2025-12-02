import { Drawer, DrawerContent, type DrawerProps } from "@heroui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <Drawer isOpen={open} onOpenChange={onOpenChange} placement="right">
      {children}
    </Drawer>
  );
}

interface SheetContentProps extends VariantProps<typeof sheetVariants> {
  children?: ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties;
}

function SheetContent({ side = "right", className, children, style, ...props }: SheetContentProps) {
  return (
    <DrawerContent className={cn(sheetVariants({ side }), className)} style={style} {...props}>
      {children}
    </DrawerContent>
  );
}

function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}

function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
}

function SheetTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold text-foreground", className)} {...props} />;
}

function SheetDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function SheetTrigger({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

function SheetClose({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
