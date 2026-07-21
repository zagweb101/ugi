import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border-2 border-swiss-border bg-white px-3 py-2 text-sm text-swiss-black font-bold placeholder:text-swiss-gray-lighter focus-visible:outline-none focus-visible:border-swiss-yellow focus-visible:shadow-glow-yellow disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 uppercase tracking-wider",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
