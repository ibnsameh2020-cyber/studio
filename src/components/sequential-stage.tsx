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
          scrub: 0.5,
        }
      });

      // Stage 1: Card Rise (Physical Overlay Entrance)
      tl.fromTo(cardRef.current,
        { y: '30vh', opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          ease: 'power2.out',
          duration: 0.8 
        }
      );

      // Stage 2: Sequential Internal Reveal (One-by-one)
      if (revealItems && revealItems.length > 0) {
        revealItems.forEach((item, i) => {
          tl.fromTo(item,
            { y: '20vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              ease: 'power1.out',
              duration: 1,
            },
            '>-0.4' // Smoothly overlapped sequencing
          );
        });
      }
      
      // Small pause after sequence complete
      tl.to({}, { duration: 0.2 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '150vh' }}>
      <section 
        id={id}
        className={cn(
          "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20",
          "bg-transparent"
        )}
        style={{ zIndex: (index + 1) * 10 }}
      >
        <div 
          ref={cardRef} 
          className={cn(
            "w-fit mx-auto bg-background/95 backdrop-blur-md shadow-[0_-30px_60px_rgba(0,0,0,0.5)]",
            "border-x border-border/10 p-6 md:p-12 lg:p-16 flex flex-col items-center justify-center",
            "min-h-[40vh] max-w-[95vw]"
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