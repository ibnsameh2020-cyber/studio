
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Lightbulb, ShieldCheck, Sun, Moon, Bell, Loader2, Settings, LogOut } from 'lucide-react';
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

type NotificationItem = (Article & { itemType: 'article' }) | (Resource & { itemType: 'resource' });

export default function Header() {
  const { user, loading, isAdmin, isAnonymous } = useUser();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const { data: articles, loading: articlesLoading } = useCollection<Article>('articles');
  const { data: resources, loading: resourcesLoading } = useCollection<Resource>('resources');

  const [newItems, setNewItems] = useState<NotificationItem[]>([]);
  const notificationsLoading = articlesLoading || resourcesLoading;
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (notificationsLoading) return;

    const lastViewedTimestamp = localStorage.getItem('last-viewed-notifications-timestamp');
    const lastViewedDate = lastViewedTimestamp ? new Date(parseInt(lastViewedTimestamp)) : new Date(0);
      
    const allItems: NotificationItem[] = [];

    if (articles) {
      allItems.push(...articles.map(a => ({ ...a, itemType: 'article' as const })));
    }
    
    if (resources) {
      allItems.push(...resources.map(r => ({ ...r, itemType: 'resource' as const })));
    }

    const filteredNewItems = allItems.filter(item => {
      if (!item.date) return false;
      const itemDate = item.date instanceof Timestamp ? item.date.toDate() : new Date(item.date);
      return itemDate > lastViewedDate;
    });

    filteredNewItems.sort((a, b) => {
      const dateA = a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date);
      const dateB = b.date instanceof Timestamp ? b.date.toDate() : new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    setNewItems(filteredNewItems);
  }, [articles, resources, notificationsLoading]);


  const handleNotificationsOpenChange = (open: boolean) => {
    if (!open && newItems.length > 0) {
        localStorage.setItem('last-viewed-notifications-timestamp', Date.now().toString());
        setNewItems([]);
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
                    <span className="hidden sm:inline">Sameh insights</span>
                </Link>
                
                <div className="flex-grow" />
                
                <div className="flex items-center gap-1">
                    {loading ? (
                    <Skeleton className="h-10 w-10 rounded-full" />
                    ) : (user && !isAnonymous) ? (
                        <div className="flex items-center gap-1">
                            {isAdmin && (
                                <Link
                                    href="/admin"
                                    className={cn(
                                        'group/admin-btn text-sm font-medium transition-all duration-300 ease-in-out rounded-full whitespace-nowrap flex items-center justify-center',
                                        'h-10 w-10', // Fixed size for mobile
                                        pathname.startsWith('/admin')
                                        ? 'bg-primary text-primary-foreground md:w-auto md:px-4 md:gap-1.5'
                                        : 'border border-primary/30 text-primary md:hover:w-auto md:hover:px-4 md:hover:gap-1.5 md:hover:bg-primary/10 md:hover:border-primary/80'
                                    )}
                                >
                                    <ShieldCheck className="h-5 w-5" />
                                    <span className={cn(
                                        'transition-opacity duration-200 hidden md:inline-block',
                                        pathname.startsWith('/admin')
                                        ? 'opacity-100 w-auto'
                                        : 'opacity-0 w-0 group-hover/admin-btn:opacity-100 group-hover/admin-btn:w-auto'
                                    )}>
                                        Admin Panel
                                    </span>
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
                        null
                    )}
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
                        {newItems.length > 0 && (
                             <span className="absolute top-4 right-4 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-background/80 backdrop-blur-lg border-border/50" align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notificationsLoading ? (
                        <DropdownMenuItem disabled>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                        </DropdownMenuItem>
                    ) : newItems.length > 0 ? (
                        newItems.map(item => (
                            <DropdownMenuItem key={item.id} asChild>
                                <Link href={item.itemType === 'article' ? `/articles` : `/resources/${item.id}`}>
                                    <div className="flex flex-col w-full overflow-hidden">
                                        <p className="font-semibold truncate">{item.itemType === 'article' ? item.headline : item.title}</p>
                                        <p className="text-xs text-muted-foreground">{item.itemType === 'article' ? 'New Insight' : 'New Resource'}</p>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem disabled>No new notifications.</DropdownMenuItem>
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
    </>
  );
}

