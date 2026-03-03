'use client';
import React from 'react';
import { cn } from '@/src/lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onCheckedChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  onCheckedChange,
  disabled,
  id,
  ...props
}) => {
  return (
    <span
      className={cn(
        'relative flex-shrink-0 w-[14px] h-[14px] border transition-all duration-150',
        checked
          ? 'bg-[#EAE2E6] border-[#EAE2E6]'
          : 'bg-transparent border-[#EAE2E6]/25 hover:border-[#EAE2E6]/50',
        disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
      style={{ borderRadius: 0 }}
    >
      <input
        type="checkbox"
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed"
        id={id}
        checked={checked}
        onChange={(event) => onCheckedChange?.(event.target.checked)}
        disabled={disabled}
        {...props}
      />
      {checked && (
        <svg
          className="absolute inset-0 w-full h-full p-[2px] pointer-events-none"
          viewBox="0 0 10 10"
          fill="none"
        >
          <polyline
            points="1.5,5 4,7.5 8.5,2"
            stroke="#191516"
            strokeWidth="1.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      )}
    </span>
  );
};
