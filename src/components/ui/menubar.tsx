import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes, useState, createContext, useContext } from "react";
import { Check, ChevronRight, Circle } from "lucide-react";

interface MenubarContextValue {
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}

const MenubarContext = createContext<MenubarContextValue>({ openMenu: null, setOpenMenu: () => {} });

interface MenubarProps {
  children: ReactNode;
  className?: string;
}

function Menubar({ children, className }: MenubarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  
  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
      <div className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}>
        {children}
      </div>
    </MenubarContext.Provider>
  );
}

function MenubarMenu({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}

function MenubarGroup({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function MenubarPortal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function MenubarSub({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}

function MenubarRadioGroup({ children }: { children: ReactNode; value?: string; onValueChange?: (value: string) => void }) {
  return <div>{children}</div>;
}

interface MenubarTriggerProps {
  children: ReactNode;
  className?: string;
}

function MenubarTrigger({ children, className }: MenubarTriggerProps) {
  return (
    <button
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}

interface MenubarSubTriggerProps {
  children: ReactNode;
  className?: string;
  inset?: boolean;
}

function MenubarSubTrigger({ children, className, inset }: MenubarSubTriggerProps) {
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

function MenubarSubContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      className
    )}>
      {children}
    </div>
  );
}

function MenubarContent({ children, className }: { children: ReactNode; className?: string; align?: string; alignOffset?: number; sideOffset?: number }) {
  return (
    <div className={cn(
      "absolute left-0 top-full z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      className
    )}>
      {children}
    </div>
  );
}

interface MenubarItemProps {
  children: ReactNode;
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

function MenubarItem({ children, className, inset, disabled, onSelect }: MenubarItemProps) {
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

function MenubarCheckboxItem({ children, className, checked, onCheckedChange }: { children: ReactNode; className?: string; checked?: boolean; onCheckedChange?: (checked: boolean) => void }) {
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

function MenubarRadioItem({ children, className }: { children: ReactNode; className?: string }) {
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

function MenubarLabel({ children, className, inset }: { children: ReactNode; className?: string; inset?: boolean }) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}>
      {children}
    </div>
  );
}

function MenubarSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />;
}

function MenubarShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
}

export { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem, 
  MenubarSeparator, 
  MenubarLabel, 
  MenubarCheckboxItem, 
  MenubarRadioGroup, 
  MenubarRadioItem, 
  MenubarPortal, 
  MenubarSubContent, 
  MenubarSubTrigger, 
  MenubarGroup, 
  MenubarSub, 
  MenubarShortcut 
};
