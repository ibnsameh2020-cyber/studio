
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Lightbulb, Moon, Sun, Menu, X, Download } from 'lucide-react';
import { Button } from '../ui/button';

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '/articles', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const toggleTheme = useCallback(() => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);


  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // More reliable trigger point
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
        if (observer.current) {
            observer.current.observe(section);
        }
    });

    return () => {
      sections.forEach((section) => {
        if(observer.current) {
            observer.current.unobserve(section)
        }
      });
    };
  }, []);
  
  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isLinkActive = (item: typeof navItems[0]) => {
    if (item.href.startsWith('/')) {
        if (typeof window !== 'undefined') {
            return window.location.pathname === item.href;
        }
        return false;
    }
    return activeSection === item.href.substring(1);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-all duration-300'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between bg-background/30 backdrop-blur-lg border border-border/50 shadow-lg rounded-full">
          <Link href="/" className="flex items-center gap-2 text-lg font-headline font-bold">
            <Lightbulb className="w-6 h-6 text-primary" />
            <span>Sameh insights</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-full',
                    isLinkActive(item) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full hover:bg-background/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label="Toggle theme"
            >
              <Sun className="w-5 h-5 text-primary hidden dark:block" />
              <Moon className="w-5 h-5 text-primary dark:hidden" />
            </Button>
          </div>
          
          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="mr-2 hover:bg-transparent hover:text-inherit focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label="Toggle theme"
            >
              <Sun className="w-5 h-5 text-primary hidden dark:block" />
              <Moon className="w-5 h-5 text-primary dark:hidden" />
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="hover:bg-transparent hover:text-inherit focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-24 left-4 right-4 z-40 bg-background/90 backdrop-blur-lg border border-border/50 shadow-2xl rounded-2xl p-6 animate-in fade-in-20 slide-in-from-top-4">
          <nav className="flex flex-col items-center justify-center flex-grow gap-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMenuLinkClick}
                className={cn(
                  'text-xl font-medium transition-colors hover:text-primary w-full text-center py-2 rounded-md',
                  isLinkActive(item) ? 'bg-primary text-primary-foreground' : 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
