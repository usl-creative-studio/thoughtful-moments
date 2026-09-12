"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "cn";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  );
}

/**
 * A 20px circle outlined in ink at 40% on bone; checked, the outline and the
 * dot turn oxblood. The generous ::after hit area keeps the 44px target on touch.
 */
function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "peer relative flex aspect-square size-5 shrink-0 items-center justify-center rounded-full border border-ink/40 bg-bone transition-colors duration-200 after:absolute after:-inset-3 hover:border-ink/60 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error data-checked:border-oxblood",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <span className="block size-2.5 rounded-full bg-oxblood" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
