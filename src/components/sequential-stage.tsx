
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
      // We use a 200vh space:
      // 0-100%: Section background slides up naturally via sticky
      // During sticky: Internal content surfaces from bottom to top
      gsap.fromTo(contentRef.current,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=100%', // Scroll space for the content reveal
            scrub: true,
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '200vh' }}>
      <section 
        id={id}
        className={cn(
          "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden",
          "bg-background border-t border-white/5",
          "shadow-[0_-40px_80px_rgba(0,0,0,0.5)]"
        )}
        style={{ zIndex: (index + 1) * 10 }}
      >
        <div ref={contentRef} className="w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </section>
    </div>
  );
}
