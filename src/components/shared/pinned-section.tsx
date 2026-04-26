
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
 * PinnedSection - A wrapper component that creates a "Stacking Card" effect.
 * Each section pins to the top of the viewport and allows the next section 
 * to slide over it.
 */
export default function PinnedSection({ children, index }: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Initialize GSAP context for safe memory management in React
    let ctx = gsap.context(() => {
      
      // Reveal Animation: Internal boxes "Come to You" as the card enters
      gsap.fromTo(contentRef.current, 
        { 
          y: 100, 
          scale: 0.95, 
          opacity: 0.8 
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );

      // Card Stacking: Pins the section at the top so the next one can overlap it
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        pin: true,
        pinSpacing: false,
        end: "bottom top",
      });

    }, sectionRef);

    // Clean up to prevent memory leaks and "context is not a function" errors
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden"
      style={{ zIndex: index + 10 }}
    >
      <div 
        ref={contentRef}
        className="w-full min-h-screen bg-background rounded-t-[40px] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.5)] border-t border-white/5 relative z-10"
      >
        {children}
      </div>
    </section>
  );
}
