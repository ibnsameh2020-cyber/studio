
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
 * PinnedSection - A premium stacking card component.
 * It pins the content at the top and allows internal scrolling for long sections
 * before the next section slides over it.
 */
export default function PinnedSection({ children, index }: PinnedSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = contentRef.current;
      const inner = innerRef.current;
      if (!section || !inner) return;

      const viewportHeight = window.innerHeight;
      const contentHeight = inner.offsetHeight;
      
      // Calculate how much extra scrolling is needed to see the whole card
      const scrollDistance = Math.max(0, contentHeight - viewportHeight + 120); // 120px for breathing room
      
      // We want a consistent "reveal" duration regardless of height
      const revealDistance = 400; 
      const totalDuration = revealDistance + scrollDistance;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${totalDuration}`,
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smoother follow
          anticipatePin: 1,
        }
      });

      // 1. Arrival Reveal: Content "Comes to You"
      // We target common container elements like cards or grid items inside the children
      const elementsToAnimate = inner.querySelectorAll('.card, .grid > div, h2, p, .badge');
      
      if (elementsToAnimate.length > 0) {
        tl.fromTo(elementsToAnimate, 
          { 
            y: 100, 
            opacity: 0, 
            scale: 0.9,
            transformOrigin: "center top"
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            stagger: 0.1,
            duration: 0.5, 
            ease: "power2.out" 
          }
        );
      } else {
        // Fallback for the whole container if no sub-elements found
        tl.fromTo(inner, 
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        );
      }

      // 2. Internal Scroll: If content is taller than screen, scroll through it
      if (scrollDistance > 0) {
        tl.to(inner, {
          y: -scrollDistance,
          duration: 1, // Normalized time within the scrub
          ease: "none"
        }, ">-0.1"); // Start slightly before the reveal ends for fluidity
      }

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div 
        ref={contentRef}
        className="w-full bg-background rounded-t-[40px] shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.3)] border-t border-white/10 relative overflow-hidden min-h-screen"
        style={{ zIndex: index + 10 }}
      >
        <div ref={innerRef} className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto will-change-transform">
            {children}
        </div>
      </div>
    </div>
  );
}
