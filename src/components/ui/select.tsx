import { Select as HeroSelect, SelectItem as HeroSelectItem, type SelectProps as HeroSelectProps } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Hero UI based Select with shadcn compatibility
interface SelectProps extends Omit<HeroSelectProps, "children" | "ref" | "onChange"> {
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function Select({ children, className, placeholder, value, onValueChange, selectedKeys, onSelectionChange, ...props }: SelectProps) {
  return (
    <HeroSelect
      placeholder={placeholder}
      selectedKeys={value ? new Set([value]) : selectedKeys}
      onSelectionChange={(keys) => {
        const selectedValue = Array.from(keys as Set<string>)[0];
        if (selectedValue) {
          onValueChange?.(selectedValue);
        }
        onSelectionChange?.(keys);
      }}
      classNames={{
        base: cn(className),
        trigger: "bg-background border-input",
      }}
      {...props}
    >
      {children as any}
    </HeroSelect>
  );
}

// Custom SelectItem that accepts value prop for shadcn compatibility
interface SelectItemProps {
  children: ReactNode;
  value?: string;
  className?: string;
  description?: string;
  key?: string;
}

function SelectItem({ children, value, className, ...props }: SelectItemProps) {
  // Hero UI uses key as the value identifier
  return (
    <HeroSelectItem key={value} className={cn(className)} {...props}>
      {children}
    </HeroSelectItem>
  );
}

// Compatibility components for shadcn patterns
function SelectGroup({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>;
}

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}

function SelectTrigger({ children, className }: SelectTriggerProps) {
  return (
    <div className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}>
      {children}
    </div>
  );
}

function SelectContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-1", className)}>{children}</div>;
}

function SelectLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}>{children}</span>;
}

function SelectSeparator({ className }: { className?: string }) {
  return <hr className={cn("-mx-1 my-1 h-px bg-muted", className)} />;
}

function SelectScrollUpButton() {
  return null;
}

function SelectScrollDownButton() {
  return null;
}

export { 
  Select, 
  SelectItem, 
  SelectGroup, 
  SelectValue, 
  SelectTrigger, 
  SelectContent, 
  SelectLabel, 
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  type SelectProps,
};
