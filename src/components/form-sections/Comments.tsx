import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface CommentsProps {
  form: UseFormReturn<any>;
}

const Comments = ({ form }: CommentsProps) => {
  return (
    <div className="form-section">
      <h2 className="section-heading">
        <MessageSquare className="h-7 w-7 text-accent" />
        Additional Comments
      </h2>
      
      <FormField
        control={form.control}
        name="comments"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Please provide any additional information or comments
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter your comments here..."
                className="min-h-[200px] resize-y bg-card border-border/50 focus:border-accent"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Comments;
