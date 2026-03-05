'use client';

import * as React from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  errorMessage?: string | false;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, className, onChange, onBlur, onFocus, id, ...props }, ref) => {
    const fallbackId = React.useId();
    const inputId = id ?? props.name ?? fallbackId;

    return (
      <div className="space-y-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-jetbrains text-[var(--rc-fg-muted)] tracking-[0.1em] uppercase">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] px-3 py-2 text-sm text-[var(--rc-fg)] placeholder:text-[var(--rc-fg-muted)] focus:outline-none focus:border-[var(--rc-border-hover)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200',
            errorMessage ? 'border-[var(--rc-border-hover)]' : '',
            className,
          )}
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {errorMessage ? <p className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)]">{errorMessage}</p> : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
