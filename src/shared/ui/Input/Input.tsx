import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const inputVariants = cva(
  // Base styles
  'w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-white/50',
        filled: 'bg-white/5 border-transparent text-white placeholder-white/50 focus:bg-white/10 focus:ring-white/50',
        outline: 'bg-transparent border-2 border-white/30 text-white placeholder-white/50 hover:border-white/50 focus:border-white/70 focus:ring-white/50',
      },
      inputSize: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
      },
      hasError: {
        true: 'border-red-500 focus:ring-red-500',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
      hasError: false,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Label text
   */
  label?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;

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
 * Reusable Input component with variants
 *
 * @example
 * <Input label="Email" type="email" placeholder="Enter your email" />
 * <Input variant="outline" error="This field is required" />
 * <Input leftIcon={<SearchIcon />} placeholder="Search..." />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      hasError,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const showError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white/90 mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant, inputSize, hasError: showError, className }),
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : ''
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-red-400' : 'text-white/60'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
