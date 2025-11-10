import React from 'react';
import { cn } from '@/react-app/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full bg-white/5 backdrop-blur-sm border border-violet-500/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500/50",
            "hover:border-violet-500/30",
            icon && "pl-10",
            error && "border-red-500/50 focus:ring-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
