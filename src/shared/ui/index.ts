/**
 * Design System UI Components
 * Centralized export for all reusable UI components
 */

// Original Design System Components (используем как основные)
export { Button, type ButtonProps } from './Button';
export { Input, type InputProps } from './Input';
export { Card, type CardProps } from './Card';

// Custom UI Components
export { RadioGroup, RadioGroupItem } from './RadioGroup';
export { Checkbox } from './Checkbox';
export { default as Img } from './Img';

// shadcn-ui Components
export * from './ui/dialog';
export * from './ui/sonner';
export { Input as ShadcnInput } from './ui/input';
export * from './ui/label';
export * from './ui/textarea';
export { Button as ShadcnButton, buttonVariants } from './ui/button';
export * from './ui/accordion';
export * from './ui/tabs';
export * from './ui/checkbox';
export * from './ui/popover';
export * from './ui/badge';
export * from './ui/skeleton';
export * from './ui/tooltip';
