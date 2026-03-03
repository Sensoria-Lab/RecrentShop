'use client';

import * as React from 'react';
import { cn } from '@/src/lib/utils';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, defaultValue, onValueChange, className, children }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const currentValue = value ?? internalValue;

  const setValue = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [onValueChange, value],
  );

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn(className)} {...props}>
    {children}
  </div>
);

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  asChild?: boolean;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ className, value, asChild = false, children, ...props }) => {
  const context = React.useContext(TabsContext);

  if (!context) {
    return null;
  }

  const active = context.value === value;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string; onClick?: React.MouseEventHandler }>, {
      className: cn((children as React.ReactElement<{ className?: string }>).props.className, className),
      onClick: (event: React.MouseEvent) => {
        context.setValue(value);
        (children as React.ReactElement<{ onClick?: React.MouseEventHandler }>).props.onClick?.(event);
      },
    });
  }

  return (
    <button
      type="button"
      role="tab"
      data-state={active ? 'active' : 'inactive'}
      aria-selected={active}
      onClick={() => context.setValue(value)}
      className={cn(className)}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ className, value, children, ...props }) => {
  const context = React.useContext(TabsContext);

  if (!context || context.value !== value) {
    return null;
  }

  return (
    <div role="tabpanel" data-state="active" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
