/**
 * ONCE UI Icon Component
 * 
 * A wrapper component for displaying icons from the icon library.
 * Supports sizing, colors, and all standard HTML attributes.
 */

'use client';

import React from 'react';
import { iconLibrary, type IconName } from '@/src/lib/icons';
import { cn } from '@/src/lib/utils';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Icon name from the icon library */
  name: IconName;
  /** Icon size - xs, sm, md, lg, xl, or custom number */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Additional className for styling */
  className?: string;
  /** Color class (e.g., 'text-[var(--rc-fg)]', 'text-red-500') */
  color?: string;
}

const sizeMap: Record<string, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

/**
 * Icon Component
 * 
 * Usage:
 * <Icon name="home" size="md" />
 * <Icon name="cart" size="lg" className="text-[var(--rc-fg)]" />
 * <Icon name="close" size={20} />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  color,
  style,
  ...props
}) => {
  const IconComponent = iconLibrary[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon library`);
    return null;
  }

  // Handle numeric size
  const numericSize = typeof size === 'number' ? size : undefined;
  const sizeClass = typeof size === 'string' ? sizeMap[size] || sizeMap.md : '';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        sizeClass,
        color,
        className
      )}
      style={{
        ...style,
        ...(numericSize ? { width: numericSize, height: numericSize } : {}),
      }}
      {...props}
    >
      <IconComponent className="w-full h-full" />
    </span>
  );
};

