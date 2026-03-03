'use client';

import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string | false;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, errorMessage, className, rows, onChange, onBlur, onFocus, id, ...props }, ref) => {
    const fallbackId = React.useId();
    const textareaId = id ?? props.name ?? fallbackId;

    return (
      <div className="space-y-1.5">
        {label ? (
          <label htmlFor={textareaId} className="text-sm font-jetbrains text-[#EAE2E6]/50 tracking-[0.1em] uppercase">
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full border border-[#EAE2E6]/15 bg-[#EAE2E6]/[0.03] px-3 py-2 text-sm text-[#EAE2E6]/80 placeholder:text-[#EAE2E6]/25 focus:outline-none focus:border-[#EAE2E6]/35 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200',
            errorMessage ? 'border-[#EAE2E6]/40' : '',
            className,
          )}
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {errorMessage ? <p className="font-jetbrains text-[10px] tracking-[0.08em] text-[#EAE2E6]/50">{errorMessage}</p> : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
