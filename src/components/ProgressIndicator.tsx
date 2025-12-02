import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Section {
  id: number;
  icon: LucideIcon;
  title: string;
}

interface ProgressIndicatorProps {
  sections: Section[];
  activeSection: number;
  onSectionClick: (id: number) => void;
}

const ProgressIndicator = ({ sections, activeSection, onSectionClick }: ProgressIndicatorProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-border/50">
          <div 
            className="h-full bg-gradient-accent transition-all duration-500 ease-out"
            style={{ width: `${(activeSection / (sections.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isCompleted = index < activeSection;
            const isActive = index === activeSection;

            return (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  "flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    "border-2 backdrop-blur-sm",
                    isCompleted && "bg-accent border-accent text-accent-foreground shadow-glow",
                    isActive && "bg-card border-accent text-accent scale-110 shadow-card",
                    !isCompleted && !isActive && "bg-card/50 border-border/50 text-muted-foreground group-hover:border-accent/50"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-center max-w-[100px] transition-all duration-300",
                    isActive && "text-foreground font-semibold",
                    isCompleted && "text-accent",
                    !isCompleted && !isActive && "text-muted-foreground"
                  )}
                >
                  {section.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
