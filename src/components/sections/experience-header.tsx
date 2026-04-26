
"use client";

import AnimatedSection from '@/components/animated-section';

export default function ExperienceHeader() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Career Journey</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              My professional growth and key milestones over the years, orchestrating large-scale transformations.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
