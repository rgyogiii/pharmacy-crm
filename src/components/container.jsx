import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
  return (
    <section className={cn("min-h-screen flex flex-1 flex-col justify-center items-center", className)}>{children}</section>
  );
};

export default Container;
