'use client';

import * as React from 'react';
import { cn } from '@/src/lib/utils';

const variantMap = {
  primary: 'bg-[var(--rc-bg-invert)] text-[var(--rc-fg-invert)] hover:opacity-85 font-jetbrains tracking-[0.12em] uppercase',
  secondary: 'bg-[var(--rc-fg-ghost)] text-[var(--rc-fg)] hover:bg-[var(--rc-fg-subtle)] border border-[var(--rc-border)]',
  tertiary: 'bg-transparent text-[var(--rc-fg-secondary)] hover:text-[var(--rc-fg)] hover:bg-[var(--rc-fg-ghost)]',
  outline: 'border border-[var(--rc-border)] bg-transparent text-[var(--rc-fg-secondary)] hover:border-[var(--rc-border-hover)] hover:text-[var(--rc-fg)]',
  ghost: 'bg-transparent text-[var(--rc-fg-secondary)] hover:text-[var(--rc-fg)] hover:bg-[var(--rc-fg-ghost)]',
  danger: 'bg-[var(--rc-fg-ghost)] text-[var(--rc-fg-secondary)] hover:bg-[var(--rc-fg-subtle)] border border-[var(--rc-border)]',
  success: 'bg-[var(--rc-fg-ghost)] text-[var(--rc-fg-secondary)] hover:bg-[var(--rc-fg-subtle)] border border-[var(--rc-border)]',
  default: 'bg-[var(--rc-bg-invert)] text-[var(--rc-fg-invert)] hover:opacity-85 font-jetbrains tracking-[0.12em] uppercase',
  destructive: 'bg-[var(--rc-fg-ghost)] text-[var(--rc-fg-secondary)] hover:bg-[var(--rc-fg-subtle)] border border-[var(--rc-border)]',
  link: 'bg-transparent text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] underline underline-offset-4 p-0 h-auto',
} as const;

type ButtonVariant = keyof typeof variantMap;
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'default' | 'icon';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
  xl: 'h-12 px-7 text-base',
  default: 'h-10 px-4 text-sm',
  icon: 'h-10 w-10 p-0',
};

const buttonVariants = ({ variant = 'primary', size = 'default', fullWidth = false, className = '' }: { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; className?: string }) =>
  cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--rc-bg)]',
    variantMap[variant],
    sizeClassMap[size],
    fullWidth ? 'w-full' : '',
    className,
  );

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={props.type ?? 'button'}
        disabled={disabled || isLoading}
        className={buttonVariants({ variant, size, fullWidth, className })}
        {...props}
      >
        {isLoading ? <span className="h-4 w-4 animate-spin border-2 border-current border-t-transparent" aria-hidden="true" /> : null}
        {leftIcon ? <span className="inline-flex items-center">{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span className="inline-flex items-center">{rightIcon}</span> : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
