import React from 'react';
import { cn } from '../lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onCheckedChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  onCheckedChange,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
    onChange?.(e);
  };

  return (
    <input
      type="checkbox"
      className={cn('w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500', className)}
      checked={checked}
      onChange={handleChange}
      {...props}
    />
  );
};