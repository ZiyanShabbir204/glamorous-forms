import { 
  Modal as HeroModal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  type ModalProps as HeroModalProps 
} from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ModalProps extends HeroModalProps {}

function Modal(props: ModalProps) {
  return <HeroModal {...props} />;
}

interface DialogContentProps {
  children?: ReactNode;
  className?: string;
}

function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <ModalContent className={cn("bg-background border shadow-lg", className)} {...props}>
      {children}
    </ModalContent>
  );
}

function DialogHeader({ className, children, ...props }: DialogContentProps) {
  return (
    <ModalHeader className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
      {children}
    </ModalHeader>
  );
}

function DialogBody({ className, children, ...props }: DialogContentProps) {
  return (
    <ModalBody className={cn("p-6", className)} {...props}>
      {children}
    </ModalBody>
  );
}

function DialogFooter({ className, children, ...props }: DialogContentProps) {
  return (
    <ModalFooter className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props}>
      {children}
    </ModalFooter>
  );
}

export { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, DialogContent, DialogHeader, DialogBody, DialogFooter };
