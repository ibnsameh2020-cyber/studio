
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Lightbulb, Menu, X, LogIn, ShieldCheck, Sun, Moon, Sparkles, LayoutGrid, Trophy, Briefcase, Newspaper, User, Mail, ChevronLeft, ChevronRight, Bell, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth, useUser, useCollection } from '@/firebase';
import type { Article } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';
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
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

const baseNavItems = [
  { href: '#services', label: 'Services', sectionId: 'services', icon: <LayoutGrid className="w-4 h-4" /> },
  { href: '#case-studies', label: 'Case Studies', sectionId: 'case-studies', icon: <Trophy className="w-4 h-4" /> },
  { href: '#experience', label: 'Experience', sectionId: 'experience', icon: <Briefcase className="w-4 h-4" /> },
  { href: '/articles', label: 'Insights', sectionId: 'insights', icon: <Newspaper className="w-4 h-4" /> },
  // Resources will be inserted here conditionally
  { href: '/about', label: 'About', sectionId: 'about-cta', icon: <User className="w-4 h-4" /> },
  { href: '#contact', label: 'Contact', sectionId: 'contact', icon: <Mail className="w-4 h-4" /> },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const { user, loading, isAdmin } = useUser();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const { data: articles, loading: articlesLoading } = useCollection<Article>('articles');
  const [newArticles, setNewArticles] = useState<Article[]>([]);

  const navItems = useMemo(() => {
    const items = [...baseNavItems];
    if (user) {
      items.splice(4, 0, {
        href: '/resources',
        label: 'Resources',
        sectionId: 'exclusive-resources-cta',
        icon: <Sparkles className="w-4 h-4" />,
      });
    }
    return items;
  }, [user]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (articles) {
        const lastViewedTimestamp = localStorage.getItem('last-viewed-articles-timestamp');
        const lastViewedDate = lastViewedTimestamp ? new Date(parseInt(lastViewedTimestamp)) : new Date(0);

        const filteredNewArticles = articles.filter(article => {
            if (!article.date) return false;
            const articleDate = article.date instanceof Timestamp ? article.date.toDate() : new Date(article.date);
            return articleDate > lastViewedDate;
        });
        setNewArticles(filteredNewArticles);
    }
  }, [articles]);


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

  const handleNotificationsOpenChange = (open: boolean) => {
    if (!open) {
        localStorage.setItem('last-viewed-articles-timestamp', Date.now().toString());
        setNewArticles([]);
    }
  };

  const isLinkActive = (item: typeof navItems[0]) => {
    // For page links (e.g., /articles, /resources, /about)
    if (item.href.startsWith('/')) {
        // Active if we are on that page
        if (pathname.startsWith(item.href)) {
            return true;
        }
        // Also active if we are on the homepage and its corresponding section is in view
        if (pathname === '/' && item.sectionId && activeSection === item.sectionId) {
            return true;
        }
        return false;
    }
    // For hash links (e.g., #services) on the homepage
    if (pathname === '/') {
        return activeSection === item.sectionId;
    }
    return false;
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const inHeroSection = activeSection === 'hero' || activeSection === '';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-4'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-center">
            <div className="flex-grow flex h-16 items-center justify-between bg-background/30 backdrop-blur-lg border border-border/50 shadow-lg rounded-full px-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-headline font-bold">
                    <Lightbulb className="w-6 h-6 text-primary" />
                    <span>Sameh insights</span>
                </Link>
                
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-2">
                    <nav className="flex items-center justify-center gap-1 transition-all duration-300">
                      {navItems.map((item) => {
                            const isActive = isLinkActive(item);
                            const isVisible = inHeroSection || isActive;
                            const isIconOnly = inHeroSection && !isActive;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href.startsWith('/') ? item.href : `/#${item.href.substring(1)}`}
                                    className={cn(
                                        'group text-sm font-medium transition-all duration-300 ease-in-out rounded-full whitespace-nowrap flex items-center',
                                        {
                                            'max-w-0 opacity-0 p-0 pointer-events-none': !isVisible,
                                            'max-w-xs opacity-100': isVisible,
                                            
                                            'bg-primary text-primary-foreground': isActive,
                                            'text-muted-foreground hover:text-primary': !isActive,

                                            'h-10 px-4 gap-1.5': !isIconOnly,
                                            'h-10 w-10 justify-center p-0 gap-0 hover:w-auto hover:px-4 hover:gap-1.5': isIconOnly,
                                        }
                                    )}
                                >
                                    {item.icon}
                                    <span className={cn(
                                        'transition-all duration-300 overflow-hidden',
                                        { 'w-0 group-hover:w-auto': isIconOnly, 'w-auto': !isIconOnly }
                                    )}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
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
                            <Button variant="ghost" size="sm">
                                <LogIn className="w-4 h-4 mr-2" />
                                Sign In
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
                        <Button variant="ghost" size="sm" className="mr-2">
                        <LogIn className="w-5 h-5 mr-1" />
                        Sign In
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
            <DropdownMenu onOpenChange={handleNotificationsOpenChange}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "group h-16 w-16 rounded-full transition-all duration-300 ease-in-out ml-4 flex-shrink-0 relative",
                            "bg-background/30 backdrop-blur-lg border-border/50 shadow-lg"
                        )}
                        aria-label="Notifications"
                    >
                        <Bell className="h-6 w-6" />
                        {newArticles.length > 0 && (
                             <span className="absolute top-4 right-4 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-background/80 backdrop-blur-lg border-border/50" align="end">
                    <DropdownMenuLabel>New Insights</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {articlesLoading ? (
                        <DropdownMenuItem disabled>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                        </DropdownMenuItem>
                    ) : newArticles.length > 0 ? (
                        newArticles.map(article => (
                            <DropdownMenuItem key={article.id} asChild>
                                <Link href={`/articles`}>
                                    <div className="flex flex-col w-full overflow-hidden">
                                        <p className="font-semibold truncate">{article.headline}</p>
                                        <p className="text-xs text-muted-foreground">{article.category}</p>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem disabled>No new insights.</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                    "group h-16 w-16 rounded-full transition-all duration-300 ease-in-out ml-4 flex-shrink-0",
                    "bg-background/30 backdrop-blur-lg border-border/50 shadow-lg"
                )}
                aria-label="Toggle theme"
                >
                <Sun className="h-[1.8rem] w-[1.8rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.8rem] w-[1.8rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
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
                  'text-xl font-medium transition-colors hover:text-primary w-full text-center py-2 rounded-md flex items-center justify-center gap-2',
                  isLinkActive(item) ? 'bg-primary text-primary-foreground' : 'text-foreground'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={handleMenuLinkClick}
                className={cn(
                  'text-xl font-medium transition-colors hover:text-primary w-full text-center py-2 rounded-md',
                  pathname === '/admin' ? 'bg-primary text-primary-foreground' : 'text-foreground'
                )}
              >
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
