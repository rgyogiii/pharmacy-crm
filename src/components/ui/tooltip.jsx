import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipContainer = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-primary-50 text-primary-50 dark:bg-neutral-700 dark:text-neutral-200 text-lowercase capitalize font-medium tracking-wider",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const tooltipVariants = cva("", {
  variants: {
    variant: {
      default: "bg-primary-50 text-primary-900",
      info: "bg-secondary-500 text-primary-50",
      success: "bg-green-600 text-primary-50",
      error: "bg-red-500 text-primary-50",
    },
    tooltip: {
      default: "fill-primary-50",
      info: "fill-secondary-500",
      success: "fill-green-600",
      error: "fill-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
    tooltip: "default",
  },
});

const Tooltip = ({ className, children, title, disabled = false, variant, ...props }) => {
  return (
    <TooltipProvider>
      <TooltipContainer delayDuration={100} {...(disabled ? { open: false } : {})}>
        <TooltipTrigger className="flex" asChild>
          {children}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className={cn(tooltipVariants({ variant }), className)} {...props}>
            {title}
            <TooltipArrow className={cn(tooltipVariants({ tooltip: variant }), "!bg-transparent")} width={12} />
          </TooltipContent>
        </TooltipPortal>
      </TooltipContainer>
    </TooltipProvider>
  );
};
export default Tooltip;
