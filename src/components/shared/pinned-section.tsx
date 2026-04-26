'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
  children: React.ReactNode;
  index: number;
}

/**
 * PinnedSection - Creates a stacking card effect where cards slide over each other.
 * Supports variable height sections naturally.
 */
export default function PinnedSection({ children, index }: PinnedSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Content reveal animation: internal elements "come to you" as you scroll
      gsap.fromTo(contentRef.current, 
        { 
          y: 80, 
          scale: 0.98, 
          opacity: 0.8 
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className="sticky top-0 w-full"
      style={{ zIndex: index + 10 }}
    >
      <div 
        ref={contentRef}
        className="w-full bg-background rounded-t-[40px] shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.5)] border-t border-white/10 relative overflow-hidden"
      >
        <div className="pt-20">
            {children}
        </div>
      </div>
    </div>
  );
}
