import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import Button from "./button";

import { cn } from "@/lib/utils";

const DialogContainer = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({ className, ...props }) => <DialogPrimitive.Portal className={cn(className)} {...props} />;
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-primary-900/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-neutral-950/80",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(({ className, noExitBtn = false, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] bg-primary-50 top-[50%] rounded-3xl z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-10 border border-primary-900/30 p-6 pb-5 pr-5 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-neutral-800 dark:bg-neutral-950",
        className
      )}
      {...props}
    >
      {children}

      {!noExitBtn && (
        <DialogPrimitive.Close className="absolute cursor-default -right-2.5 -top-2.5 transition-opacity disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-primary-50 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400 bg-red-500 hover:bg-red-600 p-1.5 rounded-full">
          <Cross2Icon className="h-5 w-5 text-primary-50" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-left pt-3", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-row justify-end space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-gray-400 dark:text-gray-400", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogComponent = {
  DialogContainer,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};

const AlertDialog = ({
  open,
  setOpen,
  title,
  type = "warning",
  description,
  leftBtnText,
  rightBtnText,
  onClickAway,
  onLeftBtnClick,
  onRightBtnClick,
}) => {
  const handleLeftBtnClick = () => {
    onLeftBtnClick && onLeftBtnClick();
    setOpen(false);
  };

  const handleRightBtnClick = () => {
    onRightBtnClick && onRightBtnClick();
    setOpen(false);
  };

  return (
    <DialogContainer
      open={open}
      onOpenChange={(value) => {
        onClickAway ? onClickAway() : null;
        setOpen(value);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {type !== "success" && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 hover:bg-transparent",
                type === "warning" && "hover:text-secondary-500",
                type === "info" && "hover:text-red-500"
              )}
              onClick={handleLeftBtnClick}
            >
              {leftBtnText ? leftBtnText : "Cancel"}
            </Button>
          )}
          <Button
            size="sm"
            className={cn(
              "h-9 min-w-[32px]",
              type === "warning" && "bg-red-500 hover:bg-red-600",
              type === "info" && "bg-secondary-500 hover:bg-secondary-600",
              type === "success" && "bg-tertiary-600 hover:bg-tertiary-700"
            )}
            onClick={handleRightBtnClick}
          >
            {rightBtnText ? rightBtnText : "Yes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogContainer>
  );
};

const Dialog = { DialogComponent, AlertDialog };

export default Dialog;
