import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rounded?: "default" | "full" | "lg" | "xl";
  variant?: "default" | "filled" | "outline" | "ghost";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconPosition = "left",
      rounded = "default",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const roundedClasses = {
      default: "rounded-md",
      full: "rounded-full",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };

    const variantClasses = {
      default: "border border-input bg-background",
      filled: "border border-transparent bg-secondary/50",
      outline: "border-2 border-input bg-transparent",
      ghost: "border border-transparent bg-transparent hover:bg-secondary/20",
    };

    const inputClasses = cn(
      "flex h-10 w-full px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
      roundedClasses[rounded],
      variantClasses[variant],
      icon && iconPosition === "left" && "pl-10",
      icon && iconPosition === "right" && "pr-10",
      className,
    );

    return (
      <div className="relative">
        {icon && (
          <div
            className={`absolute ${iconPosition === "left" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none`}
          >
            {icon}
          </div>
        )}
        <input type={type} className={inputClasses} ref={ref} {...props} />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
