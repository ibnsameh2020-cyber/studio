
"use client";

import AnimatedSection from '@/components/animated-section';

export default function ExpertiseHeader() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">My Expertise</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
              I help visionary leaders bridge the gap between strategy and execution, transforming cost centers into value engines.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
