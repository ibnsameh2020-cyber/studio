
"use client";

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
    <div className="w-full px-4">
      <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl text-center">
        <h3 className="text-xl font-headline font-semibold mb-8 text-primary uppercase tracking-widest">Key Credentials</h3>
        <div className="flex flex-wrap justify-center gap-3">
            {topCertBadges.map(badge => (
                <Badge key={badge} variant="secondary" className="text-sm py-2 px-5 bg-secondary/50 border-border/50 text-foreground hover:bg-primary transition-all duration-300">
                    {badge}
                </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
