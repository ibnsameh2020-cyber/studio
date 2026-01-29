"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const toggleVisibility = () => {
    // Show button when scrolled down
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Hide button when footer is visible
    const footer = document.querySelector('footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < window.innerHeight) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const showButton = isVisible && !isFooterVisible;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "group fixed bottom-6 right-6 flex items-center justify-center h-14 w-14 bg-primary text-primary-foreground shadow-lg z-50 rounded-full transition-all duration-300 ease-in-out",
        "hover:bg-primary/90",
        showButton ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
