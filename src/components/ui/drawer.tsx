import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes, createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DrawerContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }
  return context;
}

interface DrawerProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shouldScaleBackground?: boolean;
}

function Drawer({ children, open: controlledOpen, onOpenChange }: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open);
    onOpenChange?.(open);
  };

  return (
    <DrawerContext.Provider value={{ 
      isOpen, 
      onOpen: () => handleOpenChange(true), 
      onClose: () => handleOpenChange(false),
      onOpenChange: handleOpenChange 
    }}>
      {children}
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({ children, asChild, className }: { children: ReactNode; asChild?: boolean; className?: string }) {
  const { onOpen } = useDrawer();
  
  return (
    <span onClick={onOpen} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  );
}

function DrawerPortal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function DrawerClose({ children, className }: { children?: ReactNode; className?: string }) {
  const { onClose } = useDrawer();
  
  return (
    <button onClick={onClose} className={cn(className)}>
      {children || "×"}
    </button>
  );
}

function DrawerOverlay({ className }: { className?: string }) {
  const { isOpen, onClose } = useDrawer();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("fixed inset-0 z-50 bg-black/80", className)}
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
}

function DrawerContent({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen } = useDrawer();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <DrawerOverlay />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
              className
            )}
          >
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props}>
      {children}
    </div>
  );
}

function DrawerFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </div>
  );
}

function DrawerTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h2>
  );
}

function DrawerDescription({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
