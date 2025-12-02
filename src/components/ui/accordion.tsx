import { Accordion as HeroAccordion, AccordionItem as HeroAccordionItem } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AccordionItemData {
  key: string;
  title: ReactNode;
  content: ReactNode;
  subtitle?: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  variant?: "light" | "bordered" | "shadow" | "splitted";
  selectionMode?: "none" | "single" | "multiple";
  className?: string;
  defaultExpandedKeys?: string[];
}

function Accordion({ 
  items, 
  variant = "light", 
  selectionMode = "single",
  className,
  defaultExpandedKeys 
}: AccordionProps) {
  return (
    <HeroAccordion 
      variant={variant} 
      selectionMode={selectionMode}
      className={cn(className)}
      defaultExpandedKeys={defaultExpandedKeys}
    >
      {items.map((item) => (
        <HeroAccordionItem
          key={item.key}
          aria-label={typeof item.title === "string" ? item.title : "Accordion item"}
          title={item.title}
          subtitle={item.subtitle}
        >
          {item.content}
        </HeroAccordionItem>
      ))}
    </HeroAccordion>
  );
}

export { Accordion, type AccordionProps, type AccordionItemData };
