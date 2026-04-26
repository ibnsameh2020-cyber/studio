
"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Lightbulb, Menu, X, ShieldCheck, Sun, Moon, Sparkles, LayoutGrid, Trophy, Briefcase, Newspaper, User, Mail, Bell, Loader2, Settings, LogOut, GraduationCap } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth, useUser, useCollection } from '@/firebase';
import type { Article, Resource } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

const baseNavItems = [
  { id: 'services', href: '/#services', label: 'Services', icon: <LayoutGrid className="w-5 h-5" /> },
  { id: 'certificates-section', href: '/#certificates-section', label: 'Certificates', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'case-studies', href: '/#case-studies', label: 'Success Stories', icon: <Trophy className="w-5 h-5" /> },
  { id: 'experience', href: '/#experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'insights', href: '/#insights', label: 'Insights', icon: <Newspaper className="w-5 h-5" /> },
  { id: 'about-cta', href: '/#about-cta', label: 'About', icon: <User className="w-5 h-5" /> },
  { id: 'contact', href: '/#contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
];

const sectionIds = ['hero', 'services', 'certificates-section', 'case-studies', 'experience', 'insights', 'exclusive-resources-cta', 'about-cta', 'contact'];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, isAdmin, isAnonymous } = useUser();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('hero');

  const { data: articles, loading: articlesLoading } = useCollection<Article>('articles');
  const { data: resources, loading: resourcesLoading } = useCollection<Resource>('resources');
  const [newItems, setNewItems] = useState<any[]>([]);

  const navItems = useMemo(() => {
    let items = [...baseNavItems];
    return items;
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      let currentSection = 'hero';
      const viewportMidpoint = window.innerHeight / 2;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportMidpoint && rect.bottom >= viewportMidpoint) {
            currentSection = id;
            break; 
          }
        }
      }
      if (window.scrollY < 200) currentSection = 'hero';
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header className="fixed top-8 left-0 right-0 z-[9999] px-4 pointer-events-none">
      <div className="container mx-auto max-w-5xl flex items-center justify-between bg-background/60 backdrop-blur-xl border border-border/50 shadow-2xl rounded-full px-6 py-2 pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 text-lg font-headline font-bold">
          <Lightbulb className="w-6 h-6 text-primary" />
          <span className="hidden sm:inline">Sameh insights</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-all duration-300 rounded-full px-4 py-2 hover:bg-accent/50',
                activeSection === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon" className="md:hidden rounded-full">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
          
          {loading ? <Skeleton className="h-8 w-8 rounded-full" /> : user && !isAnonymous ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} />
                    <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background/80 backdrop-blur-lg">
                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                {isAdmin && <DropdownMenuItem asChild><Link href="/admin">Admin Panel</Link></DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="rounded-full hidden sm:flex">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-3xl p-6 pointer-events-auto animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent text-lg"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
