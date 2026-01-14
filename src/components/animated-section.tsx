
"use client";

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export default function AnimatedSection({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
  const [ref, inView] = useInView({ triggerOnce: false });

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        inView ? "animate-fade-in-up" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
}
