import React from 'react';
import { cn } from '../lib/utils';

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)} role="radiogroup">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              checked: child.props.value === value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked && onValueChange) {
                  onValueChange(child.props.value);
                }
              },
            } as Partial<React.InputHTMLAttributes<HTMLInputElement>>)
          : child
      )}
    </div>
  );
};

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  className,
  ...props
}) => {
  return (
    <input
      type="radio"
      className={cn('w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500', className)}
      {...props}
    />
  );
};