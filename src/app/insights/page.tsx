
"use client";

import AnimatedSection from '@/components/animated-section';
import InsightCard from '@/components/insight-card';
import { useCollection, useUser } from '@/firebase';
import type { Insight } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function InsightsPage() {
  const { user, loading: userLoading } = useUser();
  const { data: insights, loading: insightsLoading } = useCollection<Insight>('insights');

  if (userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 text-center">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-8">
          These insights are for members only. Please sign in to continue.
        </p>
        <Link href="/login">
          <Button size="lg">Sign In to Access</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Deep Dive Insights</h1>
        <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Exclusive, bite-sized analyses on strategy, leadership, and AI governance.
        </p>
      </div>

      {insightsLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}

      {!insightsLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights?.map((insight, index) => (
            <AnimatedSection key={insight.id} style={{ animationDelay: `${index * 150}ms` }}>
              <InsightCard insight={insight} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
