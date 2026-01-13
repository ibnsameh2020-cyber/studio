"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Code, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
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
  
  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-headline font-bold">
          <Code className="w-6 h-6 text-primary" />
          <span>Prismfolio</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          <nav className="flex items-center space-x-1 bg-background/50 p-1 rounded-full border border-border/20">
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
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-background/50 border border-border/20 hover:bg-background/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
          </Button>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="mr-2 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
          </Button>
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="icon"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-background z-50 flex flex-col p-4">
            <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={handleMenuLinkClick} className="flex items-center gap-2 text-lg font-headline font-bold">
                    <Code className="w-6 h-6 text-primary" />
                    <span>Prismfolio</span>
                </Link>
                <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon">
                    <X className="w-6 h-6" />
                </Button>
            </div>
          <nav className="flex flex-col items-center justify-center flex-grow gap-y-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMenuLinkClick}
                className={cn(
                  'text-2xl font-medium transition-colors hover:text-primary',
                  activeSection === item.href.substring(1) ? 'text-primary' : 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
