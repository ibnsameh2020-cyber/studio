
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
          scrub: 1,
        }
      });

      // Stage 1: The Section Rise (Overlay entrance)
      tl.fromTo(cardRef.current,
        { y: '100vh', opacity: 1 },
        { 
          y: 0, 
          ease: 'none',
          duration: 1
        }
      );

      // Stage 2: Cinematic One-by-One Reveal (Stalking)
      if (revealItems && revealItems.length > 0) {
        revealItems.forEach((item) => {
          tl.fromTo(item,
            { y: '40vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              ease: 'power2.out',
              duration: 2.5,
            },
            '>-0.8' // Significant overlap for a smooth continuous flow
          );
        });
      }
      
      // Stage 3: Hold the full view briefly
      tl.to({}, { duration: 1 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '300vh' }}>
      <section 
        id={id}
        className={cn(
          "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20",
          "bg-background/95 backdrop-blur-sm shadow-[0_-30px_60px_rgba(0,0,0,0.6)]"
        )}
        style={{ zIndex: (index + 1) * 10 }}
      >
        {/* Animated Atmospheric Background */}
        <div aria-hidden="true" className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
            <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
            <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
            <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
            <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
            <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
        </div>

        <div 
          ref={cardRef} 
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
