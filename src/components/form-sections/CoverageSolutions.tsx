import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";

interface CoverageSolutionsProps {
  form: UseFormReturn<any>;
}

const coverageOptions = [
  { id: "cgl", label: "Commercial General Liability" },
  { id: "liquor", label: "Liquor Liability" },
  { id: "abuse", label: "Abuse/Molestation" },
  { id: "other", label: "Other" },
];

const CoverageSolutions = ({ form }: CoverageSolutionsProps) => {
  return (
    <div className="form-section">
      <h2 className="section-heading">
        <Shield className="h-7 w-7 text-accent" />
        Coverage Solutions
      </h2>
      
      <FormField
        control={form.control}
        name="coverages"
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Select Coverages</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {coverageOptions.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name="coverages"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.id}
                        className="flex items-start space-x-3 space-y-0 rounded-lg border border-border/50 p-4 hover:border-accent/50 hover:bg-accent/5 transition-all duration-200 cursor-pointer"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, option.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== option.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CoverageSolutions;
