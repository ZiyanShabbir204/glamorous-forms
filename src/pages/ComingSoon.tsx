import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ComingSoon = ({ title, description, icon: Icon }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto text-center py-20 animate-fade-in">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-accent mb-8 animate-scale-in">
        <Icon className="h-12 w-12 text-accent-foreground" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-foreground">{title}</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
        {description}
      </p>
      
      <div className="p-8 rounded-xl glass-card shadow-card max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-highlight/10 flex items-center justify-center">
          <span className="text-3xl">🚧</span>
        </div>
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          This form is currently under development. Please complete the Business Intake form first, and check back soon!
        </p>
        
        <Button 
          onClick={() => navigate("/")}
          className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
        >
          <Home className="h-4 w-4 mr-2" />
          Return to Business Intake
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
