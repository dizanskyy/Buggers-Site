import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'purple' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  className
}) => {
  const styles = {
    default: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/60',
    success: 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60',
    warning: 'bg-amber-950/60 text-amber-300 border border-amber-800/60',
    info: 'bg-sky-950/60 text-sky-300 border border-sky-800/60',
    purple: 'bg-purple-950/60 text-purple-300 border border-purple-800/60',
    outline: 'bg-transparent text-zinc-400 border border-zinc-700'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 font-medium rounded-lg gap-1.5'
  };

  return (
    <span className={twMerge(clsx('inline-flex items-center tracking-wide uppercase', styles[variant], sizes[size], className))}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
