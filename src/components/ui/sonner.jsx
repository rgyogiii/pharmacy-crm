import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:text-xs group-[.toaster]:bg-yellow-500 group-[.toaster]:text-neutral-900 group-[.toaster]:border-yellow-500 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutral-900 dark:group-[.toaster]:text-neutral-50 dark:group-[.toaster]:border-neutral-800",
          description: "group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400",
          actionButton:
            "group-[.toast]:bg-black group-[.toast]:text-neutral-50 dark:group-[.toast]:bg-neutral-50 dark:group-[.toast]:text-neutral-900",
          cancelButton:
            "group-[.toast]:bg-black group-[.toast]:text-neutral-500 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400",
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
