'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface SequentialStageProps {
  children: React.ReactNode;
  id: string;
  index: number;
}

export default function SequentialStage({ children, id, index }: SequentialStageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Find all elements marked for sequential one-by-one reveal
      const revealItems = cardRef.current?.querySelectorAll('[data-reveal]');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Increased scrub for smoother, slower catch-up
        }
      });

      // Stage 1: Section Rise (Full Viewport Overlay Entrance)
      tl.fromTo(cardRef.current,
        { y: '50vh', opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          ease: 'power2.out',
          duration: 1.2 
        }
      );

      // Stage 2: Slower Sequential Internal Reveal (One-by-one)
      if (revealItems && revealItems.length > 0) {
        revealItems.forEach((item, i) => {
          tl.fromTo(item,
            { y: '30vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              ease: 'power1.out',
              duration: 2, // Increased duration for slower appearance
            },
            '>-0.5' // Smoothly overlapped sequencing
          );
        });
      }
      
      // Small pause after sequence complete to allow full view
      tl.to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '300vh' }}>
      <section 
        id={id}
        className={cn(
          "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20",
          "bg-background/95 backdrop-blur-sm shadow-[0_-40px_80px_rgba(0,0,0,0.5)]"
        )}
        style={{ zIndex: (index + 1) * 10 }}
      >
        <div 
          ref={cardRef} 
          className={cn(
            "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            "flex flex-col items-center justify-center min-h-[40vh]"
          )}
        >
          <div ref={contentRef} className="w-full flex flex-col items-center">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
