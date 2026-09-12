import * as React from "react";
import { cn } from "cn";

/** Same treatment as Input; grows with its content from a 120px minimum. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-30 w-full rounded-sm border border-ink/40 bg-bone px-3 py-2 text-body text-ink transition-colors duration-200 placeholder:text-warm-grey hover:border-ink/60 focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
