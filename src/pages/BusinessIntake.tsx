import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Building2, Phone, Mail, MapPin, Calendar, DollarSign } from "lucide-react";

const formSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  dba: z.string().optional(),
  businessAddress: z.string().min(1, "Business address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  contactName: z.string().min(1, "Contact name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().optional(),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  businessType: z.enum(["corporation", "llc", "partnership", "sole-proprietor", "other"]),
  employeeCount: z.string().min(1, "Employee count is required"),
  annualRevenue: z.string().min(1, "Annual revenue is required"),
  businessDescription: z.string().min(1, "Business description is required"),
  coverageNeeded: z.array(z.string()).min(1, "Select at least one coverage type"),
  currentInsurance: z.enum(["yes", "no"]),
  priorClaims: z.enum(["yes", "no"]),
  effectiveDate: z.string().min(1, "Effective date is required"),
});

type FormData = z.infer<typeof formSchema>;

const coverageOptions = [
  { id: "property", label: "Property/Location" },
  { id: "gl", label: "General Liability" },
  { id: "umbrella", label: "Umbrella" },
  { id: "auto", label: "Auto" },
  { id: "workers-comp", label: "Workers Compensation" },
  { id: "contractors", label: "Contractors" },
  { id: "restaurant", label: "Restaurant" },
  { id: "liquor", label: "Liquor Liability" },
  { id: "eo", label: "Errors & Omissions" },
  { id: "do", label: "Directors & Officers" },
  { id: "garage", label: "Garage & Dealers" },
  { id: "marine", label: "Inland Marine" },
];

const BusinessIntake = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      dba: "",
      businessAddress: "",
      city: "",
      state: "",
      zip: "",
      contactName: "",
      phone: "",
      email: "",
      website: "",
      yearsInBusiness: "",
      businessType: "corporation",
      employeeCount: "",
      annualRevenue: "",
      businessDescription: "",
      coverageNeeded: [],
      currentInsurance: "no",
      priorClaims: "no",
      effectiveDate: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Business Intake submitted:", data);
    localStorage.setItem("businessIntake", JSON.stringify(data));
    localStorage.setItem("businessIntakeCompleted", "true");
    toast.success("Business Intake form saved!", {
      description: "You can now complete other forms as needed.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-accent mb-4">
          <Building2 className="h-8 w-8 text-accent-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">Business Intake Form</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start by providing your basic business information. This form is required before accessing other insurance forms.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
          <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
          Required Form
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Business Information */}
          <div className="form-section animate-scale-in">
            <h2 className="section-heading">
              <Building2 className="h-7 w-7 text-accent" />
              Business Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Company Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dba"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DBA (Doing Business As)</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Business Type *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-2 md:grid-cols-5 gap-3"
                      >
                        {[
                          { value: "corporation", label: "Corporation" },
                          { value: "llc", label: "LLC" },
                          { value: "partnership", label: "Partnership" },
                          { value: "sole-proprietor", label: "Sole Proprietor" },
                          { value: "other", label: "Other" },
                        ].map((option) => (
                          <FormItem key={option.value}>
                            <FormControl>
                              <div className="relative">
                                <RadioGroupItem
                                  value={option.value}
                                  id={option.value}
                                  className="peer sr-only"
                                />
                                <FormLabel
                                  htmlFor={option.value}
                                  className="flex items-center justify-center rounded-lg border-2 border-border/50 bg-card p-3 hover:bg-accent/5 hover:border-accent/50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 transition-all cursor-pointer font-medium text-sm"
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

          {/* Contact Information */}
          <div className="form-section">
            <h2 className="section-heading">
              <Phone className="h-7 w-7 text-accent" />
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@business.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="www.business.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="form-section">
            <h2 className="section-heading">
              <MapPin className="h-7 w-7 text-accent" />
              Business Address
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="form-section">
            <h2 className="section-heading">
              <DollarSign className="h-7 w-7 text-accent" />
              Business Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="yearsInBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years in Business *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Employees *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Estimated Annual Revenue *</FormLabel>
                    <FormControl>
                      <Input placeholder="$500,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Business Description *</FormLabel>
                    <FormDescription>
                      Describe your business operations, services, or products
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="We provide..."
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Coverage Needed */}
          <div className="form-section">
            <h2 className="section-heading">
              <Building2 className="h-7 w-7 text-accent" />
              Coverage Needed
            </h2>

            <FormField
              control={form.control}
              name="coverageNeeded"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Select all coverage types you need *
                  </FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {coverageOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="coverageNeeded"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-start space-x-3 space-y-0 rounded-lg border border-border/50 p-4 hover:border-accent/50 hover:bg-accent/5 transition-all duration-200">
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

          {/* Insurance Information */}
          <div className="form-section">
            <h2 className="section-heading">
              <Calendar className="h-7 w-7 text-accent" />
              Insurance Information
            </h2>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="currentInsurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you currently have insurance? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" id="current-yes" />
                          </FormControl>
                          <FormLabel htmlFor="current-yes" className="font-medium cursor-pointer">
                            Yes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" id="current-no" />
                          </FormControl>
                          <FormLabel htmlFor="current-no" className="font-medium cursor-pointer">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priorClaims"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any prior claims in the last 5 years? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" id="claims-yes" />
                          </FormControl>
                          <FormLabel htmlFor="claims-yes" className="font-medium cursor-pointer">
                            Yes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" id="claims-no" />
                          </FormControl>
                          <FormLabel htmlFor="claims-no" className="font-medium cursor-pointer">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effectiveDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Effective Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-border">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-accent hover:shadow-glow transition-all duration-300 px-8"
            >
              Save Business Intake
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessIntake;
