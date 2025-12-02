import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MapPin } from "lucide-react";
import { useState } from "react";

interface LocationsProps {
  form: UseFormReturn<any>;
}

interface Location {
  location: string;
  hazardNumber: string;
  classCode: string;
  premiumBasis: string;
  exposure: string;
  territory: string;
  premOpsRate: string;
  premOpsPremium: string;
  productsRate: string;
  productsPremium: string;
  classDescription: string;
}

const premiumBasisOptions = [
  "Payroll",
  "Total Cost",
  "Unit",
  "Gross Sales",
  "Admissions",
  "Other",
];

const Locations = ({ form }: LocationsProps) => {
  const [locations, setLocations] = useState<Location[]>([]);

  const addLocation = () => {
    setLocations([...locations, {
      location: "",
      hazardNumber: "",
      classCode: "",
      premiumBasis: "",
      exposure: "",
      territory: "",
      premOpsRate: "",
      premOpsPremium: "",
      productsRate: "",
      productsPremium: "",
      classDescription: "",
    }]);
  };

  const removeLocation = (index: number) => {
    const updated = locations.filter((_, i) => i !== index);
    setLocations(updated);
    form.setValue("locations", updated);
  };

  const updateLocation = (index: number, field: keyof Location, value: string) => {
    const updated = [...locations];
    updated[index][field] = value;
    setLocations(updated);
    form.setValue("locations", updated);
  };

  return (
    <div className="form-section">
      <h2 className="section-heading">
        <MapPin className="h-7 w-7 text-accent" />
        Locations
      </h2>
      
      <div className="space-y-6">
        {locations.map((location, index) => (
          <div key={index} className="p-6 rounded-lg border-2 border-border/50 bg-muted/30 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Location #{index + 1}</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeLocation(index)}
                className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name={`locations.${index}.location`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Location</FormLabel>
                    <FormControl>
                      <Input
                        value={location.location}
                        onChange={(e) => updateLocation(index, "location", e.target.value)}
                        placeholder="Location name"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.hazardNumber`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Hazard #</FormLabel>
                    <FormControl>
                      <Input
                        value={location.hazardNumber}
                        onChange={(e) => updateLocation(index, "hazardNumber", e.target.value)}
                        placeholder="Hazard number"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.classCode`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Class Code</FormLabel>
                    <FormControl>
                      <Input
                        value={location.classCode}
                        onChange={(e) => updateLocation(index, "classCode", e.target.value)}
                        placeholder="Class code"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.premiumBasis`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Premium Basis</FormLabel>
                    <Select
                      value={location.premiumBasis}
                      onValueChange={(value) => updateLocation(index, "premiumBasis", value)}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-card border-border/50 focus:border-accent">
                          <SelectValue placeholder="Select basis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border">
                        {premiumBasisOptions.map((option) => (
                          <SelectItem key={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.exposure`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Exposure</FormLabel>
                    <FormControl>
                      <Input
                        value={location.exposure}
                        onChange={(e) => updateLocation(index, "exposure", e.target.value)}
                        placeholder="Exposure amount"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.territory`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Territory</FormLabel>
                    <FormControl>
                      <Input
                        value={location.territory}
                        onChange={(e) => updateLocation(index, "territory", e.target.value)}
                        placeholder="Territory"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.premOpsRate`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Prem/Ops Rate</FormLabel>
                    <FormControl>
                      <Input
                        value={location.premOpsRate}
                        onChange={(e) => updateLocation(index, "premOpsRate", e.target.value)}
                        placeholder="Rate"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.premOpsPremium`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Prem/Ops Premium</FormLabel>
                    <FormControl>
                      <Input
                        value={location.premOpsPremium}
                        onChange={(e) => updateLocation(index, "premOpsPremium", e.target.value)}
                        placeholder="Premium"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.productsRate`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Products Rate</FormLabel>
                    <FormControl>
                      <Input
                        value={location.productsRate}
                        onChange={(e) => updateLocation(index, "productsRate", e.target.value)}
                        placeholder="Rate"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.productsPremium`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Products Premium</FormLabel>
                    <FormControl>
                      <Input
                        value={location.productsPremium}
                        onChange={(e) => updateLocation(index, "productsPremium", e.target.value)}
                        placeholder="Premium"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`locations.${index}.classDescription`}
                render={() => (
                  <FormItem className="md:col-span-2 lg:col-span-3">
                    <FormLabel className="text-sm font-medium">Classification Description</FormLabel>
                    <FormControl>
                      <Input
                        value={location.classDescription}
                        onChange={(e) => updateLocation(index, "classDescription", e.target.value)}
                        placeholder="Enter classification description"
                        className="bg-card border-border/50 focus:border-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addLocation}
          className="w-full border-dashed hover:border-accent hover:bg-accent/5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>
    </div>
  );
};

export default Locations;
