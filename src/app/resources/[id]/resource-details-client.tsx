
"use client";

import type { Resource } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

const formatDate = (date: any) => {
  if (!date) return '';
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};


export default function ResourceDetailsClient({ resource }: { resource: Resource }) {
  const isRTL = resource.language === 'rtl';

  return (
    <div className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
            <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
            <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
            <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
            <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
            <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
        </div>
        <div 
        className={cn(
            "container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 relative",
            isRTL && "font-arabic"
        )}
        dir={resource.language || 'ltr'}
        >
        <div className="max-w-4xl mx-auto">
            
            {resource.imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg border border-border/20">
                <Image 
                src={resource.imageUrl}
                alt={resource.title}
                fill
                className="object-cover"
                priority
                />
            </div>
            )}

            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{resource.title}</h1>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Eng. Sameh Moussa</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Published on {formatDate(resource.date)}</span>
                    </div>
                </div>
            </div>

            <article 
              className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 mb-12"
              dangerouslySetInnerHTML={{ __html: resource.content as string }} 
            />

            <div className="flex flex-wrap gap-2" dir="ltr">
            {Array.isArray(resource.tags) && resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            </div>

        </div>
        </div>
    </div>
  );
}
