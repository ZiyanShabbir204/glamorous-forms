import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { X } from "lucide-react";
import { HTMLAttributes, ReactNode, createContext, useContext } from "react";

import { cn } from "@/lib/utils";

interface DialogContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ isOpen: open ?? false, onOpen: () => onOpenChange?.(true), onClose: () => onOpenChange?.(false), onOpenChange: onOpenChange ?? (() => {}) }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children }: { children?: ReactNode; asChild?: boolean }) {
  return <>{children}</>;
}

function DialogPortal({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

function DialogClose({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

function DialogOverlay({ className }: { className?: string }) {
  return <div className={cn("fixed inset-0 z-50 bg-black/80", className)} />;
}

interface DialogContentProps {
  children?: ReactNode;
  className?: string;
}

function DialogContent({ className, children }: DialogContentProps) {
  const context = useContext(DialogContext);
  
  return (
    <Modal isOpen={context?.isOpen} onOpenChange={context?.onOpenChange} className={cn("bg-background border shadow-lg", className)}>
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  );
}

function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <ModalHeader className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
}

function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <ModalFooter className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
}

function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

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
