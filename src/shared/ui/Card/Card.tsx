import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../shared/lib/utils';

const cardVariants = cva(
  // Base styles
  'rounded-xl transition-all duration-300',
  {
    variants: {
      variant: {
        glass: 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl hover:border-white/30',
        solid: 'bg-black/60 border border-white/20',
        gradient: 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20',
        elevated: 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-white/10 hover:border-white/30 hover:transform hover:scale-105',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'glass',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Card header content
   */
  header?: ReactNode;

  /**
   * Card footer content
   */
  footer?: ReactNode;

  /**
   * Whether to show dividers
   */
  showDividers?: boolean;
}

/**
 * Reusable Card component with glass morphism
 *
 * @example
 * <Card variant="glass" padding="lg">
 *   <p>Card content</p>
 * </Card>
 *
 * <Card
 *   header={<h3>Title</h3>}
 *   footer={<Button>Action</Button>}
 * >
 *   Content
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      header,
      footer,
      showDividers = false,
      children,
      ...props
    },
    ref
  ) => {
    const hasHeader = !!header;
    const hasFooter = !!footer;

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      >
        {hasHeader && (
          <>
            <div className="card-header">{header}</div>
            {showDividers && (
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-4" />
            )}
          </>
        )}

        <div className="card-body">{children}</div>

        {hasFooter && (
          <>
            {showDividers && (
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-4" />
            )}
            <div className="card-footer">{footer}</div>
          </>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
