
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
      const revealItems = contentRef.current?.querySelectorAll('[data-reveal]');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onToggle: (self) => {
            if (self.isActive) {
              window.dispatchEvent(new CustomEvent('section-active', { detail: { sectionId: id } }));
            }
          }
        }
      });

      tl.fromTo(contentRef.current,
        { y: '5vh', opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          ease: 'power2.out',
          duration: 0.2
        }
      );

      if (revealItems && revealItems.length > 0) {
        revealItems.forEach((item) => {
          tl.fromTo(item,
            { y: '15vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              ease: 'power2.out',
              duration: 2.5,
            },
            '>-0.5'
          );
        });
      }
      
      tl.to({}, { duration: 3 });
    });

    return () => ctx.revert();
  }, [id]);

  return (
    <div ref={wrapperRef} id={id} className="relative w-full" style={{ height: '300vh' }}>
      <section 
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
