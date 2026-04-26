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
          scrub: true,
        }
      });

      if (!revealItems || revealItems.length === 0) {
        // Simple case: Reveal whole content
        tl.fromTo(contentRef.current,
          { y: '100vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' }
        );
      } else {
        // Complex case: Reveal items one by one
        // 1. First, bring in the background/container if needed (already handled by stage position mostly)
        // 2. Sequence the children
        revealItems.forEach((item, i) => {
          tl.fromTo(item,
            { y: '100vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              ease: 'power1.out',
              duration: 1,
            },
            i === 0 ? 0 : '>-0.2' // Slight overlap for fluidity
          );
          
          // Add a small pause at the end of each reveal so they "wait" for the user to see them
          tl.to({}, { duration: 0.5 });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Determine height based on potential content complexity
  // We need enough scroll space to reveal items one by one.
  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '400vh' }}>
      <section 
        id={id}
        className={cn(
          "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden",
          "bg-background",
          "shadow-[0_-40px_80px_rgba(0,0,0,0.6)]"
        )}
        style={{ zIndex: (index + 1) * 10 }}
      >
        <div ref={contentRef} className="w-full h-full flex flex-col items-center justify-center p-4">
          {children}
        </div>
      </section>
    </div>
  );
}
