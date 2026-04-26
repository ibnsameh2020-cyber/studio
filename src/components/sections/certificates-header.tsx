
"use client";

import AnimatedSection from '@/components/animated-section';

export default function CertificatesHeader() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Strategic Excellence & Technical Mastery</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
              My expertise is backed by global certifications, publications, and professional endorsements in Digital Transformation and Healthcare IT.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
