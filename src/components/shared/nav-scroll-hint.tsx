"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

/**
 * A minimal overlay that prompts the user to scroll down.
 * Only appears when a navigation item is clicked and the automatic scroll finishes.
 */
export default function NavScrollHint() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleNavClick = () => {
      isNavigatingRef.current = true;
      setShow(false); // Hide if already showing to reset state
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };

    const handleScroll = () => {
      if (!isNavigatingRef.current) {
        // If user scrolls manually while hint is showing, hide it instantly
        if (show) setShow(false);
        return;
      }

      // If we are currently navigating, we use a debounce to detect when the scroll stops
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = setTimeout(() => {
        // Auto-scroll has likely stopped
        isNavigatingRef.current = false;
        setShow(true);
        
        // Auto-hide after 4 seconds of visibility
        const hideTimer = setTimeout(() => setShow(false), 4000);
        return () => clearTimeout(hideTimer);
      }, 150); // 150ms of no scroll events indicates the movement finished
    };

    window.addEventListener('nav-item-clicked', handleNavClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('nav-item-clicked', handleNavClick);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [show]);

  // Only show on the homepage
  if (!show || pathname !== '/') return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-700">
        <p className="text-primary text-base md:text-xl font-headline font-bold tracking-[0.2em] uppercase text-center drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]">
          Scroll down to explore
        </p>
        <div className="animate-bounce mt-2">
            <ChevronDown className="w-6 h-6 text-primary/80" />
        </div>
      </div>
    </div>
  );
}
