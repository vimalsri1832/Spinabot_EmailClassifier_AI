import React from 'react';
import { cn } from '@/react-app/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'glow';
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({
  variant = 'default',
  className,
  children,
  hover = false,
  ...props
}: CardProps) {
  const baseClasses = "rounded-xl transition-all duration-300 ease-out";
  
  const variantClasses = {
    default: "bg-gray-900 border border-gray-800",
    glass: `bg-white/5 backdrop-blur-sm border border-violet-500/20 shadow-lg shadow-violet-500/10 ${hover ? 'hover:shadow-violet-500/20 hover:border-violet-500/40 hover:bg-white/10' : ''}`,
    gradient: "bg-gradient-to-br from-gray-900 to-black border border-violet-500/30",
    glow: `bg-gradient-to-br from-gray-900/90 to-black/90 border border-violet-500/30 shadow-2xl shadow-violet-500/20 ${hover ? 'hover:shadow-violet-500/40 hover:border-violet-500/50 hover:scale-[1.02]' : ''}`
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
