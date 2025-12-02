import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  useDisclosure
} from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode, createContext, useContext, useEffect } from "react";

interface AlertDialogContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("Alert dialog components must be used within AlertDialog");
  }
  return context;
}

interface AlertDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function AlertDialog({ children, open, onOpenChange }: AlertDialogProps) {
  const disclosure = useDisclosure();
  
  useEffect(() => {
    if (open !== undefined) {
      if (open) {
        disclosure.onOpen();
      } else {
        disclosure.onClose();
      }
    }
  }, [open]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      disclosure.onOpen();
    } else {
      disclosure.onClose();
    }
    onOpenChange?.(isOpen);
  };
  
  return (
    <AlertDialogContext.Provider value={{ ...disclosure, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

function AlertDialogTrigger({ children }: AlertDialogTriggerProps) {
  const { onOpen } = useAlertDialog();
  
  return (
    <span onClick={onOpen} className="cursor-pointer">
      {children}
    </span>
  );
}

function AlertDialogPortal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function AlertDialogOverlay({ className }: { className?: string }) {
  return null;
}

interface AlertDialogContentProps {
  children: ReactNode;
  className?: string;
}

function AlertDialogContent({ children, className }: AlertDialogContentProps) {
  const { isOpen, onOpenChange } = useAlertDialog();
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent className={cn(className)}>
        {children}
      </ModalContent>
    </Modal>
  );
}

function AlertDialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <ModalHeader className={cn("flex flex-col gap-1", className)}>{children}</ModalHeader>;
}

function AlertDialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <ModalFooter className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>{children}</ModalFooter>;
}

function AlertDialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

function AlertDialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <ModalBody className={cn("text-sm text-muted-foreground", className)}>{children}</ModalBody>;
}

function AlertDialogAction({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const { onClose } = useAlertDialog();
  
  return (
    <Button 
      color="primary" 
      className={cn(className)}
      onPress={() => {
        onClick?.();
        onClose();
      }}
    >
      {children}
    </Button>
  );
}

function AlertDialogCancel({ children, className }: { children: ReactNode; className?: string }) {
  const { onClose } = useAlertDialog();
  
  return (
    <Button variant="light" className={cn("mt-2 sm:mt-0", className)} onPress={onClose}>
      {children}
    </Button>
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
