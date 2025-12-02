import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Flame, Heart, Shield } from "lucide-react";

interface FireMedicalPersonalProps {
  form: UseFormReturn<any>;
}

const fireDamageOptions = [
  { value: "50000", label: "$50,000" },
  { value: "100000", label: "$100,000" },
  { value: "200000", label: "$200,000" },
  { value: "300000", label: "$300,000" },
];

const medicalPaymentsOptions = [
  { value: "5000", label: "$5,000" },
  { value: "10000", label: "$10,000" },
];

const personalAdvOptions = [
  { value: "100000", label: "$100,000" },
  { value: "200000", label: "$200,000" },
  { value: "1000000", label: "$1,000,000" },
];

const FireMedicalPersonal = ({ form }: FireMedicalPersonalProps) => {
  return (
    <div className="space-y-8">
      {/* Fire Damage */}
      <div className="form-section">
        <h2 className="section-heading">
          <Flame className="h-7 w-7 text-highlight" />
          Fire Damage
        </h2>
        
        <FormField
          control={form.control}
          name="fireDamage"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold">Select Fire Damage Limit</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {fireDamageOptions.map((option) => (
                    <FormItem key={option.value}>
                      <FormControl>
                        <div className="relative">
                          <RadioGroupItem
                            value={option.value}
                            id={`fire-${option.value}`}
                            className="peer sr-only"
                          />
                          <FormLabel
                            htmlFor={`fire-${option.value}`}
                            className="flex items-center justify-center rounded-lg border-2 border-border/50 bg-card p-4 hover:bg-accent/5 hover:border-accent/50 peer-data-[state=checked]:border-highlight peer-data-[state=checked]:bg-highlight/10 peer-data-[state=checked]:text-highlight-foreground transition-all cursor-pointer font-semibold"
                          >
                            {option.label}
                          </FormLabel>
                        </div>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Medical Payments */}
      <div className="form-section">
        <h2 className="section-heading">
          <Heart className="h-7 w-7 text-accent" />
          Medical Payments
        </h2>
        
        <FormField
          control={form.control}
          name="medicalPayments"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold">Select Medical Payments Limit</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {medicalPaymentsOptions.map((option) => (
                    <FormItem key={option.value}>
                      <FormControl>
                        <div className="relative">
                          <RadioGroupItem
                            value={option.value}
                            id={`medical-${option.value}`}
                            className="peer sr-only"
                          />
                          <FormLabel
                            htmlFor={`medical-${option.value}`}
                            className="flex items-center justify-center rounded-lg border-2 border-border/50 bg-card p-4 hover:bg-accent/5 hover:border-accent/50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground transition-all cursor-pointer font-semibold"
                          >
                            {option.label}
                          </FormLabel>
                        </div>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Personal & Adv. Injury */}
      <div className="form-section">
        <h2 className="section-heading">
          <Shield className="h-7 w-7 text-accent" />
          Personal & Advertising Injury
        </h2>
        
        <FormField
          control={form.control}
          name="personalAdvInjury"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold">Select Personal & Adv. Injury Limit</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {personalAdvOptions.map((option) => (
                    <FormItem key={option.value}>
                      <FormControl>
                        <div className="relative">
                          <RadioGroupItem
                            value={option.value}
                            id={`personal-${option.value}`}
                            className="peer sr-only"
                          />
                          <FormLabel
                            htmlFor={`personal-${option.value}`}
                            className="flex items-center justify-center rounded-lg border-2 border-border/50 bg-card p-4 hover:bg-accent/5 hover:border-accent/50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground transition-all cursor-pointer font-semibold"
                          >
                            {option.label}
                          </FormLabel>
                        </div>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FireMedicalPersonal;
