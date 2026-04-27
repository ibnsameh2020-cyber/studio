
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Find all elements marked for sequential reveal
      const revealItems = contentRef.current?.querySelectorAll('[data-reveal]');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Part 1: Content Entrance (from bottom)
      tl.fromTo(contentRef.current,
        { y: '50vh', opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          ease: 'power2.out',
          duration: 1.5
        }
      );

      // Part 2: Cinematic One-by-One Reveal (Stalking)
      if (revealItems && revealItems.length > 0) {
        revealItems.forEach((item) => {
          tl.fromTo(item,
            { y: '20vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              ease: 'power2.out',
              duration: 2.5,
            },
            '>-1' // Significant overlap for a smooth continuous flow
          );
        });
      }
      
      // Part 3: Hold the full view briefly
      tl.to({}, { duration: 1.5 });

      // Part 4: Content Exit (to top)
      tl.to(contentRef.current, {
        y: '-30vh',
        opacity: 0,
        ease: 'power2.in',
        duration: 1.5
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '300vh' }}>
      <section 
        id={id}
        className={cn(
          "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-transparent"
        )}
      >
        <div 
          ref={contentRef} 
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
        >
          <div className="w-full flex flex-col items-center">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
