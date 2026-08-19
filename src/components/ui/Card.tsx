import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  active?: boolean;
  compact?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  active = false,
  compact = false,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-[#141416] border border-[#242429] rounded-xl transition-all duration-200',
          compact ? 'p-3.5' : 'p-5',
          hoverable && 'hover:bg-[#1a1a1e] hover:border-[#3a3a42] cursor-pointer',
          active && 'border-zinc-300 ring-1 ring-zinc-400/30 bg-[#1a1a1f]',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
