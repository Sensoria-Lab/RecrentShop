'use client';

import * as React from 'react';
import { cn } from '@/src/lib/utils';

const variantMap = {
  primary: 'bg-[#EAE2E6] text-[#191516] hover:bg-[#EAE2E6]/85 font-jetbrains tracking-[0.12em] uppercase',
  secondary: 'bg-[#EAE2E6]/[0.08] text-[#EAE2E6] hover:bg-[#EAE2E6]/[0.13] border border-[#EAE2E6]/15',
  tertiary: 'bg-transparent text-[#EAE2E6]/60 hover:text-[#EAE2E6] hover:bg-[#EAE2E6]/[0.05]',
  outline: 'border border-[#EAE2E6]/20 bg-transparent text-[#EAE2E6]/70 hover:border-[#EAE2E6]/40 hover:text-[#EAE2E6]',
  ghost: 'bg-transparent text-[#EAE2E6]/60 hover:text-[#EAE2E6] hover:bg-[#EAE2E6]/[0.05]',
  danger: 'bg-[#EAE2E6]/[0.07] text-[#EAE2E6]/70 hover:bg-[#EAE2E6]/[0.12] border border-[#EAE2E6]/20',
  success: 'bg-[#EAE2E6]/[0.07] text-[#EAE2E6]/70 hover:bg-[#EAE2E6]/[0.12] border border-[#EAE2E6]/20',
  default: 'bg-[#EAE2E6] text-[#191516] hover:bg-[#EAE2E6]/85 font-jetbrains tracking-[0.12em] uppercase',
  destructive: 'bg-[#EAE2E6]/[0.07] text-[#EAE2E6]/70 hover:bg-[#EAE2E6]/[0.12] border border-[#EAE2E6]/20',
  link: 'bg-transparent text-[#EAE2E6]/50 hover:text-[#EAE2E6] underline underline-offset-4 p-0 h-auto',
} as const;

type ButtonVariant = keyof typeof variantMap;
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'default' | 'icon';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
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

export const buttonVariants = ({ variant = 'primary', size = 'default', fullWidth = false, className = '' }: { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; className?: string }) =>
  cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
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
