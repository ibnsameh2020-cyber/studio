
"use client";

import AnimatedSection from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';

const topCertBadges = [
    'KPI Professional (KPIP)',
    'ITIL 4 Leader: Digital & IT Strategy',
    'Certified PMO Professional',
    'CPHIMS',
    'HL7® FHIR® Fundamentals',
    'COBIT 5 Foundation',
    'CNSS',
    'Big Data Analytics',
];

export default function CertificatesHighlights() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
             <div className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 md:p-12 shadow-xl text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                <h3 className="text-xl font-headline font-semibold mb-8 text-primary uppercase tracking-widest">Key Credentials</h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {topCertBadges.map(badge => (
                        <Badge key={badge} variant="secondary" className="text-sm py-2 px-5 bg-secondary/50 border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                            {badge}
                        </Badge>
                    ))}
                </div>
             </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
