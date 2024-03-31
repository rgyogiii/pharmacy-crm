import { cn } from "@/lib/utils";

const TextField = ({
  label,
  id,
  name,
  type,
  className,
  labelClassName,
  textboxClassName,
  icon,
  helpers = true,
  password,
  ...props
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative group">
        <input
          type={type}
          name={name}
          id={id}
          autoComplete={props.autoComplete}
          className={cn(
            "block pb-2.5 pt-3 w-full text-primary-900 text-sm bg-transparent rounded-md border appearance-none focus:outline-none focus:ring-0 focus:border-primary-900 peer select-none",
            textboxClassName,
            props.error
              ? "border-red-400"
              : "border-primary-900/40 group-hover:border-primary-900 disabled:cursor-default disabled:group-hover:border-primary-500 disabled:border-primary-900/40 read-only:cursor-default",
            icon && icon.left ? "pl-9 pr-3" : icon && icon.right ? "pr-9 pl-3" : "px-3"
          )}
          placeholder={props.placeholder ?? ""}
          {...props}
        />
        {icon && icon.left && (
          <icon.left
            className={cn(
              "absolute left-0 inset-y-3.5 h-4 w-4 z-10 mx-2 text-primary-500 peer-placeholder-shown:text-primary-500 group-hover:text-primary-900 peer-focus:text-primary-900",
              icon.className
            )}
          />
        )}

        {password && icon && icon.right && (
          <button
            type="button"
            onClick={icon.onClick}
            className={cn(
              "absolute right-0 inset-y-3 z-10 mx-2 mr-4 text-primary-500 hover:text-primary-900 disabled:hover:text-primary-500",
              icon.className
            )}
            disabled={icon.disabled ?? false}
          >
            <icon.right className="h-5 w-5 " />
          </button>
        )}

        {!password && icon && icon.right && (
          <icon.right
            className={cn(
              "absolute right-0 inset-y-3 h-4 w-4 z-10 mx-2 mr-4 text-primary-500 peer-placeholder-shown:text-primary-500 group-hover:text-primary-900 peer-focus:text-primary-900",
              icon.className
            )}
          />
        )}

        <label
          htmlFor={id}
          className={cn(
            "absolute text-primary-500 text-sm font-semibold duration-300 transform -translate-y-4 scale-75 top-1.5 z-20 origin-[0] bg-primary-50 px-2 peer-focus:px-2 peer-focus:text-primary-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 select-none group-hover:text-primary-900",
            labelClassName,
            props.error
              ? "text-red-400 group-hover:text-red-400"
              : props.disabled && "text-primary-400 group-hover:text-primary-400",
            props.required && "after:content-['*'] after:ml-1 after:text-red-500",
            icon && icon.left ? "left-2 peer-focus:left-2 peer-placeholder-shown:left-7" : "left-2"
          )}
        >
          {label}
        </label>
      </div>

      {helpers && (
        <p
          className={cn(
            "my-1 ml-1 text-xs font-medium h-4",
            props.error ? "text-red-400" : "text-primary-500",
            props.error ?? props.textHelper ? "visible" : "invisible"
          )}
        >
          {props.error ?? props.textHelper}
        </p>
      )}
    </div>
  );
};

export default TextField;
