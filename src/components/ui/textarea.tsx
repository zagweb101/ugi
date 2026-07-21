import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full border-2 border-swiss-border bg-white px-3 py-2 text-sm text-swiss-black font-bold placeholder:text-swiss-gray-lighter focus-visible:outline-none focus-visible:border-swiss-yellow focus-visible:shadow-glow-yellow disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none uppercase tracking-wider",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
