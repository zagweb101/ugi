"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "gold";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-swiss-gray border-swiss-border text-swiss-gray-lighter",
    success: "bg-swiss-green/20 border-swiss-green/50 text-swiss-green",
    warning: "bg-swiss-yellow/20 border-swiss-yellow/50 text-swiss-yellow",
    danger: "bg-swiss-pink/20 border-swiss-pink/50 text-swiss-pink",
    info: "bg-swiss-blue/20 border-swiss-blue/50 text-swiss-blue",
    gold: "bg-swiss-yellow border-swiss-yellow text-swiss-black",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
