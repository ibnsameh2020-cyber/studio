
"use client";

import AnimatedSection from '@/components/animated-section';

export default function ProjectsHeader() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Featured Success Stories</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              A deep dive into how I have delivered value and driven results across key projects.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
