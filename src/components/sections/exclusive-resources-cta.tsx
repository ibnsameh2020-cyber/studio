'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { useCollection } from '@/firebase';
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

export default function ExclusiveResourcesCtaSection() {
  const { data: resources, loading } = useCollection<Resource>('resources');
  const recentResources = resources ? resources.slice(0, 3) : [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6" data-reveal>
                    <h2 className="text-3xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground inline-block">
                        Exclusive Resources
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Explore exclusive, in-depth resources on strategy, leadership, and AI governance.
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
                        <div key={resource.id} data-reveal>
                            <Link href={`/resources/${resource.id}`}>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
