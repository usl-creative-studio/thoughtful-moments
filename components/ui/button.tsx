import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * The one button on the page (Section 2): oxblood fill, bone text, 16/24 type,
 * 14px 24px padding, 4px radius, no shadow. Hover darkens 8%; press scales to
 * 98.5% over 200ms. Focus comes from the global :focus-visible rule.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-transparent text-button font-medium whitespace-nowrap select-none transition-[background-color,transform] duration-200 ease-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-oxblood text-bone hover:bg-oxblood-hover",
      },
      size: {
        default: "px-6 py-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
