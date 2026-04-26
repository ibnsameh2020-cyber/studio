
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
 * PinnedSection - Creates a high-end stacking card effect.
 * Handles variable height content by virtually scrolling long cards
 * before allowing the next card to overlap.
 */
export default function PinnedSection({ children, index }: PinnedSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = contentRef.current;
      const inner = innerRef.current;
      if (!section || !inner) return;

      const viewportHeight = window.innerHeight;
      const contentHeight = inner.offsetHeight;
      const scrollDistance = Math.max(0, contentHeight - viewportHeight + 100); // 100px buffer

      // Create a timeline for this specific card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${viewportHeight + scrollDistance}`,
          pin: true,
          pinSpacing: true, // Pushes next card down so we can scroll through this one
          scrub: true,
          anticipatePin: 1,
        }
      });

      // 1. Initial "Coming to You" reveal
      tl.fromTo(inner, 
        { scale: 0.9, opacity: 0.5, y: 100 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      // 2. If content is long, scroll through it internally
      if (scrollDistance > 0) {
        tl.to(inner, {
          y: -scrollDistance,
          duration: 1,
          ease: "none"
        });
      }

      // We use z-index in CSS to ensure the stacking order is correct
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full overflow-visible">
      <div 
        ref={contentRef}
        className="w-full bg-background rounded-t-[40px] shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.5)] border-t border-white/10 relative overflow-hidden min-h-screen"
        style={{ zIndex: index + 10 }}
      >
        <div ref={innerRef} className="pt-24 pb-32">
            {children}
        </div>
      </div>
    </div>
  );
}
