import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"

import { cn } from "../../../shared/lib/utils"

// Spring configuration for button animations
const BUTTON_SPRING = {
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};

/**
 * Unified Button component - Enhanced shadcn-ui with custom project styles
 * Combines shadcn's flexibility with custom animations and variants
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group",
  {
    variants: {
      variant: {
        // Primary variant - main CTA buttons (animations via Framer Motion)
        primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/50 focus-visible:ring-blue-500 transition-colors duration-200",
        // Secondary variant - alternative actions
        secondary: "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 focus-visible:ring-white/50 transition-colors duration-200",
        // Outline variant - subtle actions
        outline: "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus-visible:ring-white/50 transition-colors duration-200",
        // Ghost variant - minimal presence
        ghost: "text-white hover:bg-white/10 focus-visible:ring-white/50 transition-colors duration-200",
        // Danger variant - destructive actions
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-red-500/50 focus-visible:ring-red-500 transition-colors duration-200",
        // Success variant - positive actions
        success: "bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-green-500/50 focus-visible:ring-green-500 transition-colors duration-200",
        // Shadcn default variants (for compatibility)
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 py-1.5 text-sm",
        md: "h-10 px-4 py-2 text-base",
        lg: "h-11 px-6 py-3 text-lg",
        xl: "h-14 px-8 py-4 text-xl",
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Show loading spinner
   */
  isLoading?: boolean
  /**
   * Icon to show on the left
   */
  leftIcon?: React.ReactNode
  /**
   * Icon to show on the right
   */
  rightIcon?: React.ReactNode
}

/**
 * Unified Button Component
 * Enhanced shadcn-ui button with project-specific styles and features
 * 
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="outline" isLoading>Loading...</Button>
 * <Button variant="ghost" leftIcon={<Icon />}>With icon</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    isLoading,
    leftIcon,
    rightIcon,
    children,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (asChild || disabled || isLoading) {
        onClick?.(e);
        return;
      }
      
      // Create ripple effect
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      
      setRipples((prev) => [...prev, { x, y, id }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
      
      onClick?.(e);
    };
    
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        aria-disabled={isLoading || disabled}
        onClick={handleClick}
        whileHover={{
          scale: 1.05,
          transition: {
            type: 'spring',
            ...BUTTON_SPRING,
          },
        }}
        whileTap={{
          scale: 0.95,
          transition: {
            type: 'spring',
            ...BUTTON_SPRING,
          },
        }}
        style={{
          willChange: 'transform',
        }}
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!isLoading && leftIcon && (
          <motion.span
            className="inline-flex"
            whileHover={{
              scale: 1.15,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
              },
            }}
            style={{
              willChange: 'transform',
            }}
          >
            {leftIcon}
          </motion.span>
        )}
        
        <span className="relative z-10">{children}</span>
        
        {!isLoading && rightIcon && (
          <motion.span
            className="inline-flex"
            whileHover={{
              scale: 1.15,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
              },
            }}
            style={{
              willChange: 'transform',
            }}
          >
            {rightIcon}
          </motion.span>
        )}
        
        {/* Ripple effect */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 1,
            }}
            animate={{
              width: 300,
              height: 300,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
