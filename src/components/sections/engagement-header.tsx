
"use client";

import AnimatedSection from '@/components/animated-section';

export default function EngagementHeader() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">How We Can Work Together</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              Flexible engagement models designed to suit your strategic needs.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
