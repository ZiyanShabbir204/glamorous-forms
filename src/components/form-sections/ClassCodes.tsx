import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Code, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ClassCodesProps {
  form: UseFormReturn<any>;
}

interface ClassCode {
  code: string;
  description: string;
}

const ClassCodes = ({ form }: ClassCodesProps) => {
  const [classCodes, setClassCodes] = useState<ClassCode[]>([]);

  const addClassCode = () => {
    setClassCodes([...classCodes, { code: "", description: "" }]);
  };

  const removeClassCode = (index: number) => {
    const updated = classCodes.filter((_, i) => i !== index);
    setClassCodes(updated);
    form.setValue("classCodes", updated);
  };

  const updateClassCode = (index: number, field: keyof ClassCode, value: string) => {
    const updated = [...classCodes];
    updated[index][field] = value;
    setClassCodes(updated);
    form.setValue("classCodes", updated);
  };

  return (
    <div className="form-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-heading mb-0">
          <Code className="h-7 w-7 text-accent" />
          Class Codes
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          asChild
          className="hover:bg-accent/5 hover:border-accent"
        >
          <a href="https://www.insurancexdate.com/gl.php" target="_blank" rel="noopener noreferrer">
            Lookup Class Codes
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
      
      <div className="space-y-4">
        {classCodes.map((classCode, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg border border-border/50 bg-muted/30">
            <FormField
              control={form.control}
              name={`classCodes.${index}.code`}
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Class Code</FormLabel>
                  <FormControl>
                    <Input
                      value={classCode.code}
                      onChange={(e) => updateClassCode(index, "code", e.target.value)}
                      placeholder="Enter class code"
                      className="bg-card border-border/50 focus:border-accent"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={`classCodes.${index}.description`}
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Description</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        value={classCode.description}
                        onChange={(e) => updateClassCode(index, "description", e.target.value)}
                        placeholder="Enter description"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeClassCode(index)}
                      className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addClassCode}
          className="w-full border-dashed hover:border-accent hover:bg-accent/5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Class Code
        </Button>
      </div>
    </div>
  );
};

export default ClassCodes;
