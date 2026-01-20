'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Unlock, Calendar, Loader2 } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import { useUser, useCollection } from '@/firebase';
import type { Resource } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Timestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const formatDate = (date: any) => {
    if (!date) return '';
    if (date instanceof Timestamp) {
        return date.toDate().toLocaleDateString('en-US');
    }
    return new Date(date).toLocaleDateString('en-US');
};

const LoggedOutView = () => (
    <div className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 md:p-12 shadow-xl text-center">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full inline-block shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
                <Lock className="w-12 h-12 text-primary" />
            </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
            Unlock Exclusive Resources
        </h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Become a member to access exclusive, bite-sized resources on strategy, leadership, and AI governance—updated regularly.
        </p>
        <div className="mt-8">
            <Link href="/login">
                <Button size="lg" className="group">
                    Sign Up to Access
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
    </div>
);

const LoggedInView = () => {
    const { data: resources, loading } = useCollection<Resource>('resources');
    const recentResources = resources ? resources.slice(0, 3) : [];

    return (
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground inline-block">
                    Exclusive Resources
                </h2>
                <p className="text-base text-muted-foreground">
                    You have access to exclusive, in-depth resources on strategy, leadership, and AI governance.
                </p>
                 <Link href="/resources" className="inline-block mt-4">
                    <Button variant="outline" className="group">
                        Explore All Resources
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
            
            <div className="space-y-4">
                {loading && (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}
                {!loading && recentResources.map((resource) => (
                    <Link href={`/resources/${resource.id}`} key={resource.id}>
                        <Card className="p-4 flex items-center gap-4 bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group">
                            {resource.imageUrl && (
                                <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                    <Image
                                        src={resource.imageUrl}
                                        alt={resource.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className={cn("flex-grow", 'text-left')}>
                                <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{resource.title}</h3>
                                <div className={cn("flex items-center gap-2 text-xs text-muted-foreground mt-1", 'justify-start')}>
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(resource.date)}</span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default function ExclusiveResourcesCtaSection() {
  const { user } = useUser();

  return (
    <AnimatedSection>
      <section id="exclusive-resources-cta" className="relative z-10 py-20 md:py-32">
         <div 
          className="absolute inset-0 z-[-1] h-full w-full bg-transparent"
          style={{
            backgroundSize: '30px 30px',
            backgroundImage:
              'linear-gradient(to right, hsl(var(--border) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.1) 1px, transparent 1px)',
          }}
        ></div>
        <div className="absolute inset-0 z-[-2] bg-[radial-gradient(circle_500px_at_50%_100px,hsl(var(--primary)/0.1),transparent)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {user ? <LoggedInView /> : <LoggedOutView />}
        </div>
      </section>
    </AnimatedSection>
  );
}
