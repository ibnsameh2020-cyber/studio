
"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Lightbulb, Menu, X, LogIn, ShieldCheck, Sun, Moon, Sparkles, LayoutGrid, Trophy, Briefcase, Newspaper, User, Mail, Bell, Loader2, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth, useUser, useCollection } from '@/firebase';
import type { Article } from '@/lib/types';
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
  { id: 'services', href: '/#services', label: 'Services', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'case-studies', href: '/#case-studies', label: 'Success Stories', icon: <Trophy className="w-4 h-4" /> },
  { id: 'experience', href: '/#experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'insights', href: '/#insights', label: 'Insights', icon: <Newspaper className="w-4 h-4" /> },
  { id: 'about-cta', href: '/#about-cta', label: 'About', icon: <User className="w-4 h-4" /> },
  { id: 'contact', href: '/#contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
];

const sectionIds = ['hero', 'services', 'case-studies', 'experience', 'insights', 'exclusive-resources-cta', 'about-cta', 'contact'];


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, isAdmin } = useUser();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState('hero');

  const { data: articles, loading: articlesLoading } = useCollection<Article>('articles');
  const [newArticles, setNewArticles] = useState<Article[]>([]);

  const navItems = useMemo(() => {
    const items = [...baseNavItems];
    if (user) {
      const insightsIndex = items.findIndex(item => item.id === 'insights');
      if (insightsIndex !== -1) {
        items.splice(insightsIndex + 1, 0, {
          id: 'exclusive-resources-cta',
          href: '/#exclusive-resources-cta',
          label: 'Resources',
          icon: <Sparkles className="w-4 h-4" />,
        });
      }
    }
    return items;
  }, [user]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
      
      // Fallback for top of page
      if (window.scrollY < 200) {
        currentSection = 'hero';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

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

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleMenuLinkClick();
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  const handleNotificationsOpenChange = (open: boolean) => {
    if (!open) {
        localStorage.setItem('last-viewed-articles-timestamp', Date.now().toString());
        setNewArticles([]);
    }
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

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
                <nav className="hidden md:flex items-center space-x-1">
                  {navItems.map((item) => {
                    const isPageLink = !item.href.startsWith('/#') && item.href !== '/';
                    const isLinkActive = isPageLink
                      ? pathname.startsWith(item.href)
                      : activeSection === item.id;

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          'group/nav-item text-sm font-medium transition-all duration-300 ease-in-out rounded-full whitespace-nowrap flex items-center justify-center',
                          'h-10',
                           (activeSection === 'hero' && pathname ==='/')
                           ? 'w-10 text-muted-foreground hover:w-auto hover:px-4 hover:gap-1.5 hover:bg-accent/50 hover:text-foreground'
                           : isLinkActive
                           ? 'w-auto px-4 gap-1.5 bg-primary text-primary-foreground'
                           : 'w-10 text-muted-foreground hover:w-auto hover:px-4 hover:gap-1.5 hover:bg-accent/50 hover:text-foreground'
                        )}
                      >
                        {item.icon}
                        <span className={cn(
                          'transition-opacity duration-200',
                          (activeSection === 'hero' && pathname ==='/')
                          ? 'opacity-0 w-0 group-hover/nav-item:opacity-100 group-hover/nav-item:w-auto'
                          : isLinkActive
                          ? 'opacity-100 w-auto'
                          : 'opacity-0 w-0 group-hover/nav-item:opacity-100 group-hover/nav-item:w-auto'
                        )}>
                          {item.label}
                        </span>
                      </Link>
                    )
                  })}
                </nav>
                
                <div className="hidden md:flex items-center gap-1">
                    {loading ? (
                    <Skeleton className="h-10 w-10 rounded-full" />
                    ) : user ? (
                        <div className="flex items-center gap-1">
                            {isAdmin && (
                                <Link href="/admin" passHref>
                                    <Button variant={pathname.startsWith('/admin') ? 'default' : 'ghost'} size="icon" title="Admin Panel" className="h-10 w-10 rounded-full">
                                        <ShieldCheck className="h-5 w-5" />
                                    </Button>
                                </Link>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-background/80 backdrop-blur-lg border-border/50" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings">
                                                <Settings className="w-4 h-4" />
                                                <span>Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={signOut}>
                                        <LogOut className="w-4 h-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
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
                    <>
                        {isAdmin && (
                            <Link href="/admin" passHref>
                                <Button variant={pathname.startsWith('/admin') ? 'default' : 'ghost'} size="icon" title="Admin Panel" className="h-10 w-10 rounded-full">
                                    <ShieldCheck className="h-5 w-5" />
                                </Button>
                            </Link>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                </Avatar>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-background/80 backdrop-blur-lg border-border/50" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={signOut}>
                                    <LogOut className="w-4 h-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
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
                        <Bell className="h-6 h-6" />
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
            {navItems.map((item) => {
                 const isPageLink = !item.href.startsWith('/#') && item.href !== '/';
                 const isLinkActive = isPageLink
                   ? pathname.startsWith(item.href)
                   : activeSection === item.id;
                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                        'text-xl font-medium transition-colors hover:text-primary w-full text-center py-2 rounded-md flex items-center justify-center gap-2',
                        isLinkActive ? 'bg-primary text-primary-foreground' : 'text-foreground'
                        )}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                )
            })}
          </nav>
        </div>
      )}
    </>
  );
}
