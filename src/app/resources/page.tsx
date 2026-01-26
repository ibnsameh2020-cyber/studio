
"use client";

import AnimatedSection from '@/components/animated-section';
import ResourceCard from '@/components/resource-card';
import { useCollection } from '@/firebase';
import type { Resource } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function ResourcesPage() {
  const { data: resources, loading: resourcesLoading } = useCollection<Resource>('resources');

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
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-headline font-bold">Exclusive Resources</h1>
            <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Exclusive, bite-sized analyses on strategy, leadership, and AI governance.
            </p>
        </div>

        {resourcesLoading && (
            <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        )}

        {!resourcesLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources?.map((resource, index) => (
                <AnimatedSection key={resource.id} style={{ animationDelay: `${index * 150}ms` }}>
                <ResourceCard resource={resource} />
                </AnimatedSection>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
