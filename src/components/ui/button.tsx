import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "ugi";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-swiss-yellow text-swiss-black hover:bg-swiss-yellow/90 font-bold uppercase tracking-wider shadow-swiss hover:shadow-swiss-lg hover:-translate-y-0.5 active:translate-y-0",
      outline: "border-2 border-swiss-border bg-transparent hover:bg-swiss-gray text-swiss-gray-lighter font-bold uppercase tracking-wider hover:shadow-swiss",
      ghost: "hover:bg-swiss-gray text-swiss-gray-lighter hover:text-swiss-black hover:shadow-inner-light",
      destructive: "bg-swiss-pink text-swiss-black hover:bg-swiss-pink/90 font-bold uppercase tracking-wider shadow-swiss hover:shadow-swiss-lg hover:-translate-y-0.5 active:translate-y-0",
      ugi: "bg-swiss-green text-swiss-black hover:bg-swiss-green/90 font-bold uppercase tracking-wider shadow-swiss hover:shadow-swiss-lg hover:-translate-y-0.5 active:translate-y-0",
    };
    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10",
    };
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-yellow/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer ripple-effect",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
