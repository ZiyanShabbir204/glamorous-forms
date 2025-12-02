import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Shield, FileText, MapPin, Info, MessageSquare } from "lucide-react";
import CoverageSolutions from "@/components/form-sections/CoverageSolutions";
import CoverageLimits from "@/components/form-sections/CoverageLimits";
import FireMedicalPersonal from "@/components/form-sections/FireMedicalPersonal";
import OtherCoverages from "@/components/form-sections/OtherCoverages";
import ClassCodes from "@/components/form-sections/ClassCodes";
import Locations from "@/components/form-sections/Locations";
import GeneralInformation from "@/components/form-sections/GeneralInformation";
import Comments from "@/components/form-sections/Comments";
import ProgressIndicator from "@/components/ProgressIndicator";

const formSchema = z.object({
  coverages: z.array(z.string()).min(1, "Select at least one coverage"),
  eachOccurrence: z.string().min(1, "Select each occurrence limit"),
  coverageLimits: z.string().min(1, "Select coverage limit"),
  productsAggregate: z.string().min(1, "Select products aggregate"),
  fireDamage: z.string().min(1, "Select fire damage limit"),
  medicalPayments: z.string().min(1, "Select medical payments limit"),
  personalAdvInjury: z.string().min(1, "Select personal & adv. injury limit"),
  otherCoverages: z.array(z.string()).optional(),
  endorsements: z.array(z.string()).optional(),
  classCodes: z.array(z.object({
    code: z.string(),
    description: z.string().optional(),
  })).optional(),
  locations: z.array(z.object({
    location: z.string(),
    hazardNumber: z.string().optional(),
    classCode: z.string().optional(),
    premiumBasis: z.string().optional(),
    exposure: z.string().optional(),
    territory: z.string().optional(),
    premOpsRate: z.string().optional(),
    premOpsPremium: z.string().optional(),
    productsRate: z.string().optional(),
    productsPremium: z.string().optional(),
    classDescription: z.string().optional(),
  })).optional(),
  generalInfo: z.record(z.enum(["yes", "no"])),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const GLForm = () => {
  const [activeSection, setActiveSection] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverages: [],
      eachOccurrence: "",
      coverageLimits: "",
      productsAggregate: "",
      fireDamage: "",
      medicalPayments: "",
      personalAdvInjury: "",
      otherCoverages: [],
      endorsements: [],
      classCodes: [],
      locations: [],
      generalInfo: {},
      comments: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("GL Form submitted:", data);
    localStorage.setItem("glForm", JSON.stringify(data));
    toast.success("GL Form saved successfully!", {
      description: "Your General Liability form has been saved.",
    });
  };

  const sections = [
    { id: 0, icon: Shield, title: "Coverage Solutions" },
    { id: 1, icon: FileText, title: "Coverage Limits" },
    { id: 2, icon: Shield, title: "Fire/Medical/Personal" },
    { id: 3, icon: FileText, title: "Other Coverages" },
    { id: 4, icon: MapPin, title: "Class Codes & Locations" },
    { id: 5, icon: Info, title: "General Information" },
    { id: 6, icon: MessageSquare, title: "Comments" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-accent mb-4">
          <Shield className="h-8 w-8 text-accent-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">General Liability Form</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete your General Liability insurance application
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-12 animate-slide-in">
        <ProgressIndicator 
          sections={sections}
          activeSection={activeSection}
          onSectionClick={setActiveSection}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {activeSection === 0 && (
            <div className="animate-scale-in">
              <CoverageSolutions form={form} />
              <div className="mt-8">
                <CoverageLimits form={form} showProductsAggregate />
              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div className="animate-scale-in">
              <CoverageLimits form={form} showProductsAggregate={false} />
            </div>
          )}

          {activeSection === 2 && (
            <div className="animate-scale-in">
              <FireMedicalPersonal form={form} />
            </div>
          )}

          {activeSection === 3 && (
            <div className="animate-scale-in">
              <OtherCoverages form={form} />
            </div>
          )}

          {activeSection === 4 && (
            <div className="animate-scale-in space-y-8">
              <ClassCodes form={form} />
              <Locations form={form} />
            </div>
          )}

          {activeSection === 5 && (
            <div className="animate-scale-in">
              <GeneralInformation form={form} />
            </div>
          )}

          {activeSection === 6 && (
            <div className="animate-scale-in">
              <Comments form={form} />
            </div>
          )}

          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className="min-w-[120px]"
            >
              Previous
            </Button>

            {activeSection < sections.length - 1 ? (
              <Button
                type="button"
                onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                className="min-w-[120px] bg-gradient-accent hover:shadow-glow transition-all duration-300"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="min-w-[120px] bg-gradient-accent hover:shadow-glow transition-all duration-300"
              >
                Save GL Form
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GLForm;
