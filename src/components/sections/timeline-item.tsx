
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
      return 'opacity-0';
    }
    if (align === 'left') {
      return 'animate-slide-in-from-right';
    }
    return 'animate-slide-in-from-left';
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-500",
        animationClass()
      )}
    >
      {children}
    </div>
  );
}
