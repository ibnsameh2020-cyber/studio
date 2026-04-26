
"use client";

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
  children: ReactNode;
  id: string;
  zIndex: number;
  className?: string;
}

export default function PinnedSection({ children, id, zIndex, className }: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !contentRef.current) return;

      // Pin the section to the top
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // Scroll distance for internal animation
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Internal Content Scrub Reveal (Coming to you effect)
      gsap.fromTo(contentRef.current, 
        { 
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id={id}
      className={cn(
        "min-h-screen w-full bg-background flex flex-col",
        "card-stack-edge",
        className
      )}
      style={{ zIndex }}
    >
      <div 
        ref={contentRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-[160px] pb-20 flex-grow"
      >
        {children}
      </div>
    </section>
  );
}
