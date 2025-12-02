import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FileStack } from "lucide-react";
import { useState } from "react";

interface OtherCoveragesProps {
  form: UseFormReturn<any>;
}

const OtherCoverages = ({ form }: OtherCoveragesProps) => {
  const [otherCoverages, setOtherCoverages] = useState<string[]>([]);
  const [endorsements, setEndorsements] = useState<string[]>([]);

  const addOtherCoverage = () => {
    setOtherCoverages([...otherCoverages, ""]);
  };

  const removeOtherCoverage = (index: number) => {
    const updated = otherCoverages.filter((_, i) => i !== index);
    setOtherCoverages(updated);
    form.setValue("otherCoverages", updated);
  };

  const updateOtherCoverage = (index: number, value: string) => {
    const updated = [...otherCoverages];
    updated[index] = value;
    setOtherCoverages(updated);
    form.setValue("otherCoverages", updated);
  };

  const addEndorsement = () => {
    setEndorsements([...endorsements, ""]);
  };

  const removeEndorsement = (index: number) => {
    const updated = endorsements.filter((_, i) => i !== index);
    setEndorsements(updated);
    form.setValue("endorsements", updated);
  };

  const updateEndorsement = (index: number, value: string) => {
    const updated = [...endorsements];
    updated[index] = value;
    setEndorsements(updated);
    form.setValue("endorsements", updated);
  };

  return (
    <div className="space-y-8">
      {/* Other Coverages */}
      <div className="form-section">
        <h2 className="section-heading">
          <FileStack className="h-7 w-7 text-accent" />
          Other Coverages
        </h2>
        
        <div className="space-y-4">
          {otherCoverages.map((coverage, index) => (
            <div key={index} className="flex gap-3">
              <FormField
                control={form.control}
                name={`otherCoverages.${index}`}
                render={() => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        value={coverage}
                        onChange={(e) => updateOtherCoverage(index, e.target.value)}
                        placeholder="Enter coverage name"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeOtherCoverage(index)}
                className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addOtherCoverage}
            className="w-full border-dashed hover:border-accent hover:bg-accent/5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Other Coverage
          </Button>
        </div>
      </div>

      {/* Endorsements */}
      <div className="form-section">
        <h2 className="section-heading">
          <FileStack className="h-7 w-7 text-accent" />
          Endorsements
        </h2>
        
        <div className="space-y-4">
          {endorsements.map((endorsement, index) => (
            <div key={index} className="flex gap-3">
              <FormField
                control={form.control}
                name={`endorsements.${index}`}
                render={() => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        value={endorsement}
                        onChange={(e) => updateEndorsement(index, e.target.value)}
                        placeholder="Enter endorsement"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeEndorsement(index)}
                className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addEndorsement}
            className="w-full border-dashed hover:border-accent hover:bg-accent/5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Endorsement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtherCoverages;
