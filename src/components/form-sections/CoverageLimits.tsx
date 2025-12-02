import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign } from "lucide-react";

interface CoverageLimitsProps {
  form: UseFormReturn<any>;
  showProductsAggregate?: boolean;
}

const limitOptions = [
  { value: "100000", label: "$100,000" },
  { value: "200000", label: "$200,000" },
  { value: "300000", label: "$300,000" },
  { value: "500000", label: "$500,000" },
  { value: "1000000", label: "$1,000,000" },
];

const productsAggregateOptions = [
  ...limitOptions,
  { value: "2000000", label: "$2,000,000" },
];

const CoverageLimits = ({ form, showProductsAggregate = true }: CoverageLimitsProps) => {
  return (
    <div className="space-y-8">
      {/* Each Occurrence */}
      <div className="form-section">
        <h2 className="section-heading">
          <DollarSign className="h-7 w-7 text-accent" />
          Each Occurrence
        </h2>
        
        <FormField
          control={form.control}
          name="eachOccurrence"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold">Select Limit</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {limitOptions.map((option) => (
                    <FormItem key={option.value}>
                      <FormControl>
                        <div className="relative">
                          <RadioGroupItem
                            value={option.value}
                            id={`each-${option.value}`}
                            className="peer sr-only"
                          />
                          <FormLabel
                            htmlFor={`each-${option.value}`}
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

      {/* Coverage Limits */}
      <div className="form-section">
        <h2 className="section-heading">
          <DollarSign className="h-7 w-7 text-accent" />
          Coverage Limits
        </h2>
        
        <FormField
          control={form.control}
          name="coverageLimits"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold">Select Limit</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {limitOptions.map((option) => (
                    <FormItem key={option.value}>
                      <FormControl>
                        <div className="relative">
                          <RadioGroupItem
                            value={option.value}
                            id={`coverage-${option.value}`}
                            className="peer sr-only"
                          />
                          <FormLabel
                            htmlFor={`coverage-${option.value}`}
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

      {/* Products/Completed Operations Aggregate */}
      {showProductsAggregate && (
        <div className="form-section">
          <h2 className="section-heading">
            <DollarSign className="h-7 w-7 text-accent" />
            Products/Completed Operations Aggregate
          </h2>
          
          <FormField
            control={form.control}
            name="productsAggregate"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base font-semibold">Select Limit</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  >
                    {productsAggregateOptions.map((option) => (
                      <FormItem key={option.value}>
                        <FormControl>
                          <div className="relative">
                            <RadioGroupItem
                              value={option.value}
                              id={`products-${option.value}`}
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor={`products-${option.value}`}
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
      )}
    </div>
  );
};

export default CoverageLimits;
