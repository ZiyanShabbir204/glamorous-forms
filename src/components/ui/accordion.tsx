import { forwardRef } from "react";
import { Accordion as HeroAccordion, AccordionItem as HeroAccordionItem, AccordionProps as HeroAccordionProps } from "@heroui/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = HeroAccordion;

const AccordionItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <HeroAccordionItem ref={ref} className={cn("border-b", className)} {...props} />
  ),
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <div className="flex">
      <button
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-selected=true]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[selected=false]:animate-accordion-up data-[selected=true]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  ),
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
