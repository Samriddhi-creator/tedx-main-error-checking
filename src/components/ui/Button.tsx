"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
    
    const variants = {
      primary: "bg-[#eb0028] text-white hover:bg-[#ff1e43] shadow-[0_4px_20px_rgba(235,0,40,0.3)] hover:shadow-[0_6px_24px_rgba(235,0,40,0.5)]",
      secondary: "bg-white/10 text-white border border-white/10 hover:bg-white/20 backdrop-blur-md",
      outline: "bg-transparent text-white border-2 border-[#eb0028] hover:bg-[#eb0028] hover:text-white hover:shadow-[0_4px_20px_rgba(235,0,40,0.3)]",
      ghost: "text-neutral-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-7 py-3 text-lg font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
