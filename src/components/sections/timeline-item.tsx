
"use client";

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import React from 'react';

type TimelineItemProps = {
  children: React.ReactNode;
  align: 'left' | 'right';
  isFirst?: boolean;
  isLast?: boolean;
};

export default function TimelineItem({ children, align }: TimelineItemProps) {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });

  const animationClass = () => {
    if (!inView) {
      if (align === 'left') {
        return 'opacity-0 translate-x-12';
      }
      return 'opacity-0 -translate-x-12';
    }
    if (align === 'left') {
      return 'opacity-100 translate-x-0 animate-slide-in-from-right';
    }
    return 'opacity-100 translate-x-0 animate-slide-in-from-left';
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        animationClass()
      )}
    >
      {children}
    </div>
  );
}
