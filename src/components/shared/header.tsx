"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Code, Moon, Sun } from 'lucide-react';

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = navItems.map(item => {
        const href = item.href;
        if (typeof window === 'undefined') return null;
        return document.querySelector(href);
      });

      let currentSection = '';

      sections.forEach(section => {
        if (section) {
          const sectionId = section.id;
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            currentSection = sectionId;
          }
        }
      });

      if(currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-full max-w-2xl'
      )}
    >
      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8 rounded-full transition-all duration-300 flex items-center justify-between",
        isScrolled ? 'bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg' : 'bg-transparent'
      )}>
        <Link href="/" className="flex items-center gap-2 text-lg font-headline font-bold">
          <Code className="w-6 h-6 text-primary" />
          <span className={cn('transition-all')}>Prismfolio</span>
        </Link>
        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-2 bg-background/50 p-1 rounded-full border border-transparent">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-full',
                  activeSection === item.href.substring(1) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-background/50 p-2 flex items-center justify-center border border-transparent hover:border-primary/50"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </div>
    </header>
  );
}
