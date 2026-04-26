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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Find all elements marked for sequential reveal
      const revealItems = cardRef.current?.querySelectorAll('[data-reveal]');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth interaction
        }
      });

      // Stage 1: The Section Rise (Background layer entrance)
      tl.fromTo(cardRef.current,
        { y: '100vh', opacity: 1 },
        { 
          y: 0, 
          ease: 'none',
          duration: 1
        }
      );

      // Stage 2: Cinematic Sequential Reveal (One-by-one surfacing)
      if (revealItems && revealItems.length > 0) {
        revealItems.forEach((item) => {
          tl.fromTo(item,
            { y: '50vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              ease: 'power1.out',
              duration: 2, // Slower reveal for each item
            },
            '>-0.5' // Smoothly overlapped sequence
          );
        });
      }
      
      // Stage 3: Hold the full view briefly before the next card stacks
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
          "bg-background/95 backdrop-blur-sm shadow-[0_-40px_80px_rgba(0,0,0,0.6)]"
        )}
        style={{ zIndex: (index + 1) * 10 }}
      >
        <div 
          ref={cardRef} 
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
        >
          <div className="w-full flex flex-col items-center">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
