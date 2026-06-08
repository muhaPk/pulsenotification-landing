import { cn } from '@/shared/lib/cn';
import { ReactNode } from 'react';

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto max-w-5xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}
