import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";

/**
 * Section 2: 1px ink border at 40%, bone background, 44px minimum height,
 * 4px radius. The label sits above it (see Label); never placeholder-only.
 * Invalid state pairs the error colour with text and an icon in the form.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "min-h-11 w-full min-w-0 rounded-sm border border-ink/40 bg-bone px-3 py-2 text-body text-ink transition-colors duration-200 placeholder:text-warm-grey hover:border-ink/60 focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
