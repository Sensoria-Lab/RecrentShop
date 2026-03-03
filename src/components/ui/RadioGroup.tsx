'use client';
import React from 'react';
import { cn } from '@/src/lib/utils';

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  name: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  name?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  children,
  className,
  name,
}) => {
  const generatedId = React.useId();
  const groupName = name || generatedId;

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, name: groupName }}>
      <div className={cn('space-y-2', className)} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'type'> {
  value: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  className,
  value,
  id,
  disabled,
  ...props
}) => {
  const group = React.useContext(RadioGroupContext);
  const isChecked = group?.value === value;

  return (
    <input
      type="radio"
      className={cn(
        'h-4 w-4 border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      id={id}
      name={group?.name}
      value={value}
      checked={isChecked}
      disabled={disabled}
      onChange={() => {
        if (!isChecked) {
          group?.onValueChange?.(value);
        }
      }}
      {...props}
    />
  );
};
