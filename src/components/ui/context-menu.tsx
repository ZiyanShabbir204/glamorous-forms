import { cn } from "@/lib/utils";
import { ReactNode, useState, createContext, useContext, MouseEvent, HTMLAttributes } from "react";
import { Check, ChevronRight, Circle } from "lucide-react";

interface ContextMenuContextValue {
  position: { x: number; y: number } | null;
  setPosition: (pos: { x: number; y: number } | null) => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

function ContextMenu({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  
  return (
    <ContextMenuContext.Provider value={{ position, setPosition }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

function ContextMenuTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const context = useContext(ContextMenuContext);
  
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    context?.setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onContextMenu={handleContextMenu} className={cn(className)}>
      {children}
    </div>
  );
}

function ContextMenuGroup({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function ContextMenuPortal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function ContextMenuSub({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}

function ContextMenuRadioGroup({ children }: { children: ReactNode; value?: string; onValueChange?: (value: string) => void }) {
  return <div>{children}</div>;
}

function ContextMenuSubTrigger({ children, className, inset }: { children: ReactNode; className?: string; inset?: boolean }) {
  return (
    <div
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        inset && "pl-8",
        className
      )}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </div>
  );
}

function ContextMenuSubContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

function ContextMenuContent({ children, className }: { children: ReactNode; className?: string }) {
  const context = useContext(ContextMenuContext);
  
  if (!context?.position) return null;

  return (
    <div
      className={cn(
        "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      style={{ top: context.position.y, left: context.position.x }}
      onClick={() => context.setPosition(null)}
    >
      {children}
    </div>
  );
}

function ContextMenuItem({ children, className, inset, disabled, onSelect }: { children: ReactNode; className?: string; inset?: boolean; disabled?: boolean; onSelect?: () => void }) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        inset && "pl-8",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  );
}

function ContextMenuCheckboxItem({ children, className, checked, onCheckedChange }: { children: ReactNode; className?: string; checked?: boolean; onCheckedChange?: (checked: boolean) => void }) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onClick={() => onCheckedChange?.(!checked)}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
}

function ContextMenuRadioItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Circle className="h-2 w-2 fill-current" />
      </span>
      {children}
    </div>
  );
}

function ContextMenuLabel({ children, className, inset }: { children: ReactNode; className?: string; inset?: boolean }) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}>
      {children}
    </div>
  );
}

function ContextMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} />;
}

function ContextMenuShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
