import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/50 focus:ring-blue-500',
        secondary: 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 focus:ring-white/50',
        outline: 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus:ring-white/50',
        ghost: 'text-white hover:bg-white/10 focus:ring-white/50',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-red-500/50 focus:ring-red-500',
        success: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-green-500/50 focus:ring-green-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Show loading spinner
   */
  isLoading?: boolean;

  /**
   * Icon to show on the left
   */
  leftIcon?: ReactNode;

  /**
   * Icon to show on the right
   */
  rightIcon?: ReactNode;
}

/**
 * Reusable Button component with variants
 *
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="outline" size="sm" fullWidth>Full width</Button>
 * <Button variant="ghost" isLoading>Loading...</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        aria-disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

        {children}

        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
