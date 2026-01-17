'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Unlock } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import { useUser } from '@/firebase';

export default function ExclusiveResourcesCtaSection() {
  const { user } = useUser();

  return (
    <AnimatedSection>
      <section id="exclusive-resources-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 md:p-12 shadow-xl text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full inline-block shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
                    {user ? (
                        <Unlock className="w-12 h-12 text-primary" />
                    ) : (
                        <Lock className="w-12 h-12 text-primary" />
                    )}
                </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
              {user ? "Explore Exclusive Resources" : "Unlock Exclusive Resources"}
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              {user
                ? "You have access to exclusive, bite-sized resources on strategy, leadership, and AI governance."
                : "Become a member to access exclusive, bite-sized resources on strategy, leadership, and AI governance—updated regularly."}
            </p>
            <div className="mt-8">
                <Link href="/resources">
                    <Button size="lg" className="group">
                    {user ? "Explore Resources" : "Sign Up to Access"}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
