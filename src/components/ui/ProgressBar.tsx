import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  progress: number; // 0 to 100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = false,
  size = 'md',
  className
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={twMerge('w-full', className)}>
      <div className={clsx('w-full bg-[#202025] rounded-full overflow-hidden border border-[#2c2c34]', heights[size])}>
        <div
          className="h-full bg-white transition-all duration-300 ease-out rounded-full"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-zinc-400 mt-1.5 font-mono">
          <span>Прогресс</span>
          <span className="text-zinc-200 font-semibold">{clamped}%</span>
        </div>
      )}
    </div>
  );
};
