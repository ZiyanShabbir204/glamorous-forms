import { useContext, ReactNode } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

interface InputOTPProps {
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
  disabled?: boolean;
}

function InputOTP({ className, containerClassName, children, ...props }: InputOTPProps) {
  return (
    <OTPInput
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      {children}
    </OTPInput>
  );
}

interface InputOTPGroupProps {
  children?: ReactNode;
  className?: string;
}

function InputOTPGroup({ className, children }: InputOTPGroupProps) {
  return <div className={cn("flex items-center", className)}>{children}</div>;
}

interface InputOTPSlotProps {
  index: number;
  className?: string;
}

function InputOTPSlot({ index, className }: InputOTPSlotProps) {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

interface InputOTPSeparatorProps {
  className?: string;
}

function InputOTPSeparator({ className }: InputOTPSeparatorProps) {
  return (
    <div role="separator" className={className}>
      <Dot />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
