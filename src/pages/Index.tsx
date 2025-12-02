import { FormLayout } from "@/components/FormLayout";
import BusinessIntake from "./BusinessIntake";
import { toast } from "sonner";

const Index = () => {
  const handleSubmitAll = () => {
    toast.success("All forms submitted successfully!", {
      description: "Your insurance applications have been processed.",
    });
  };

  const handleClearAll = () => {
    localStorage.clear();
    toast.info("All forms cleared", {
      description: "Your form data has been reset.",
    });
    window.location.reload();
  };

  return (
    <FormLayout onSubmitAll={handleSubmitAll} onClearAll={handleClearAll}>
      <BusinessIntake />
    </FormLayout>
  );
};

export default Index;
