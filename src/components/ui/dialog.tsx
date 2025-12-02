import { forwardRef, HTMLAttributes } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalProps } from "@heroui/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Modal isOpen={isOpen || props.open} onOpenChange={onOpenChange || props.onOpenChange} {...props}>
      {children}
    </Modal>
  );
};

const DialogTrigger = ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => {
  return <div {...props}>{children}</div>;
};

const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const DialogClose = ({ children, className, ...props }: { children?: React.ReactNode; className?: string; [key: string]: any }) => {
  return (
    <button
      className={cn("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", className)}
      {...props}
    >
      {children || <><X className="h-4 w-4" /><span className="sr-only">Close</span></>}
    </button>
  );
};

const DialogOverlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  ),
);
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <ModalContent
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogClose />
    </ModalContent>
  ),
);
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <ModalHeader className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <ModalFooter className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};