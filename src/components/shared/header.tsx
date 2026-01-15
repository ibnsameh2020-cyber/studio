
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Lightbulb, Menu, X, Download, LogIn, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth, useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '/articles', label: 'Blog', sectionId: 'articles' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const { user, loading, isAdmin } = useUser();
  const { signOut } = useAuth();


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
    // For page links like /articles
    if (item.href.startsWith('/')) {
        if (typeof window !== 'undefined') {
            const onBlogPage = window.location.pathname === item.href;
            const onBlogSection = activeSection === item.sectionId;
            return onBlogPage || onBlogSection;
        }
        return false;
    }
    // For anchor links like #projects
    return activeSection === item.href.substring(1);
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
    return name.charAt(0);
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
                  href={item.href.startsWith('/') ? item.href : `/#${item.href.substring(1)}`}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-full',
                    isLinkActive(item) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
             {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="group">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              )}
            {loading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <Link href="/login">
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
                        <LogIn className="w-5 h-5 text-primary" />
                    </Button>
                </Link>
            )}
          </div>
          
          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            {loading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="mr-2">
                  <LogIn className="w-5 h-5" />
                </Button>
              </Link>
            )}
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
                href={item.href.startsWith('/') ? item.href : `/#${item.href.substring(1)}`}
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
