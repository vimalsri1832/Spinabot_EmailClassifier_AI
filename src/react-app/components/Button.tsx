import React from 'react';
import { cn } from '@/react-app/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-gray-600",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5",
    glass: "bg-white/10 backdrop-blur-sm border border-violet-500/30 text-white hover:bg-white/20 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/20"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
