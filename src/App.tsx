import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormLayout } from "@/components/FormLayout";
import Index from "./pages/Index";
import GLForm from "./pages/GLForm";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { 
  MapPin, Umbrella, Truck, Car, HardHat, UtensilsCrossed, 
  Wine, AlertCircle, Users, Wrench, Ship 
} from "lucide-react";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const handleSubmitAll = () => {
    toast.success("All forms submitted successfully!", {
      description: "Your insurance applications have been processed.",
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all form data?")) {
      localStorage.clear();
      toast.info("All forms cleared", {
        description: "Your form data has been reset.",
      });
      window.location.reload();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Index />} />
            <Route path="/gl-form" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <GLForm />
              </FormLayout>
            } />
            <Route path="/property" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Property/Location Form" 
                  description="Property and location insurance coverage application"
                  icon={MapPin}
                />
              </FormLayout>
            } />
            <Route path="/umbrella" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Umbrella Insurance Form" 
                  description="Additional liability coverage application"
                  icon={Umbrella}
                />
              </FormLayout>
            } />
            <Route path="/drivers" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Drivers Form" 
                  description="Commercial driver information and coverage"
                  icon={Truck}
                />
              </FormLayout>
            } />
            <Route path="/auto" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Auto Insurance Form" 
                  description="Commercial auto insurance application"
                  icon={Car}
                />
              </FormLayout>
            } />
            <Route path="/contractors" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Contractors Form" 
                  description="Contractor-specific insurance coverage"
                  icon={HardHat}
                />
              </FormLayout>
            } />
            <Route path="/restaurant" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Restaurant Insurance Form" 
                  description="Restaurant and food service insurance"
                  icon={UtensilsCrossed}
                />
              </FormLayout>
            } />
            <Route path="/liquor-liability" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Liquor Liability Form" 
                  description="Liquor liability insurance coverage"
                  icon={Wine}
                />
              </FormLayout>
            } />
            <Route path="/errors-omissions" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Errors & Omissions Form" 
                  description="Professional liability insurance"
                  icon={AlertCircle}
                />
              </FormLayout>
            } />
            <Route path="/directors-officers" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Directors & Officers Form" 
                  description="D&O liability insurance coverage"
                  icon={Users}
                />
              </FormLayout>
            } />
            <Route path="/garage-dealers" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Garage & Dealers Form" 
                  description="Auto garage and dealer insurance"
                  icon={Wrench}
                />
              </FormLayout>
            } />
            <Route path="/inland-marine" element={
              <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
                <ComingSoon 
                  title="Inland Marine Form" 
                  description="Inland marine insurance coverage"
                  icon={Ship}
                />
              </FormLayout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
