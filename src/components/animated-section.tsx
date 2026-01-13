
"use client";

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export default function AnimatedSection({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-500",
        inView ? "opacity-100 animate-fade-in-up" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
}
