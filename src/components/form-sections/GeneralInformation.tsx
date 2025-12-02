import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Info, Check } from "lucide-react";

interface GeneralInformationProps {
  form: UseFormReturn<any>;
}

const questions = [
  { id: "q1", text: "Any medical facilities provided or medical professionals employed or contracted?" },
  { id: "q2", text: "Any exposure to radioactive / nuclear materials?" },
  { id: "q3", text: "Do operations involve storing, treating, discharging, applying, disposing or transporting hazardous material?" },
  { id: "q4", text: "Any listed operations sold, acquired, or discontinued in the last five (5) years?" },
  { id: "q5", text: "Do you rent or loan equipment to others?" },
  { id: "q6", text: "Any watercraft, docks, floats owned, hired, or leased?" },
  { id: "q7", text: "Any parking facilities owned / rented?" },
  { id: "q8", text: "Is a fee charged for parking?" },
  { id: "q9", text: "Are any recreational facilities provided?" },
  { id: "q10", text: "Are there any lodging operations including apartments?" },
  { id: "q11", text: "Is there a swimming pool on the premises?" },
  { id: "q12", text: "Are social events sponsored?" },
  { id: "q13", text: "Are athletic teams sponsored?" },
  { id: "q14", text: "Any structural alterations contemplated?" },
  { id: "q15", text: "Any demolition exposure contemplated?" },
  { id: "q16", text: "Has applicant been active in or is currently active in joint ventures?" },
  { id: "q17", text: "Do you lease employees to or from others?" },
  { id: "q18", text: "Is there a labor interchange with any other business or subsidiaries?" },
  { id: "q19", text: "Are daycare facilities operated or controlled?" },
  { id: "q20", text: "Have any crimes occurred or been attempted on your premises within the last three (3) years?" },
  { id: "q21", text: "Is there a formal, written safety and security policy in effect?" },
  { id: "q22", text: "Does the businesses' promotional literature make any representations about the safety or security of the premises?" },
];

const GeneralInformation = ({ form }: GeneralInformationProps) => {
  const selectAllYes = () => {
    const allYes: Record<string, "yes"> = {};
    questions.forEach((question) => {
      allYes[question.id] = "yes";
    });
    form.setValue("generalInfo", allYes);
  };

  return (
    <div className="form-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-heading mb-0">
          <Info className="h-7 w-7 text-accent" />
          General Information
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={selectAllYes}
          className="hover:bg-accent/5 hover:border-accent"
        >
          <Check className="h-4 w-4 mr-2" />
          Select All "Yes"
        </Button>
      </div>
      
      <div className="space-y-6">
        {questions.map((question) => (
          <FormField
            key={question.id}
            control={form.control}
            name={`generalInfo.${question.id}`}
            render={({ field }) => (
              <FormItem className="rounded-lg border border-border/50 p-5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200">
                <FormLabel className="text-base font-medium text-foreground leading-relaxed">
                  {question.text}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-4 mt-3"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                      </FormControl>
                      <FormLabel htmlFor={`${question.id}-yes`} className="font-medium cursor-pointer">
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" id={`${question.id}-no`} />
                      </FormControl>
                      <FormLabel htmlFor={`${question.id}-no`} className="font-medium cursor-pointer">
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default GeneralInformation;
