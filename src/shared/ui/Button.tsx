import { cn } from '@/shared/lib/cn';
import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 px-6 py-3 text-sm';
  const variants: Record<Variant, string> = {
    primary: 'bg-accent text-black hover:brightness-110 shadow-lg shadow-accent/25',
    secondary: 'bg-title/10 text-title hover:bg-title/20 border border-title/10',
    ghost: 'text-label hover:text-title',
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
