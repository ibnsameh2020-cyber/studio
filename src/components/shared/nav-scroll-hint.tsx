"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

/**
 * A minimal overlay that prompts the user to scroll down.
 * Only appears when a navigation item is clicked and the automatic scroll finishes.
 */
export default function NavScrollHint() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleNavClick = () => {
      // Wait for smooth scroll to finish (approx 1 second)
      const timer = setTimeout(() => {
        setShow(true);
        
        // Auto-hide after 4 seconds
        const hideTimer = setTimeout(() => setShow(false), 4000);
        
        // Or hide immediately if user starts manual scrolling
        const onManualScroll = () => {
          setShow(false);
          window.removeEventListener('scroll', onManualScroll);
        };
        
        // Small delay before listening for manual scroll so it doesn't 
        // immediately trigger from the tail-end of the auto-scroll
        setTimeout(() => {
            window.addEventListener('scroll', onManualScroll);
        }, 100);

        return () => {
          clearTimeout(hideTimer);
          window.removeEventListener('scroll', onManualScroll);
        };
      }, 1000);

      return () => clearTimeout(timer);
    };

    window.addEventListener('nav-item-clicked', handleNavClick);
    return () => window.removeEventListener('nav-item-clicked', handleNavClick);
  }, []);

  // Only show on the homepage
  if (!show || pathname !== '/') return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-700">
        <p className="text-primary text-base md:text-xl font-headline font-bold tracking-[0.2em] uppercase text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
          Scroll down to explore
        </p>
        <div className="animate-bounce mt-2">
            <ChevronDown className="w-6 h-6 text-primary/80" />
        </div>
      </div>
    </div>
  );
}
