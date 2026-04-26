
"use client";

import AnimatedSection from '@/components/animated-section';

export default function GlobalExpertiseHeader() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Global Expertise. Local Impact.</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
              My experience extends beyond borders. I have led strategic consultations, IT infrastructure deployments, and complex medical integrations across Egypt, North and Central Africa, the UK, and the Gulf countries.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
