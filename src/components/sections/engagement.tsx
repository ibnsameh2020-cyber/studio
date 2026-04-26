
"use client";

import AnimatedSection from '@/components/animated-section';
import { Card } from '@/components/ui/card';

const engagementModels = [
    {
        title: "Strategic Advisory",
        description: "Retainer-based partnership for ongoing executive guidance."
    },
    {
        title: "Project-Based Consulting",
        description: "End-to-end management of a specific transformation program."
    },
    {
        title: "The 'Portfolio Health Check'",
        description: "A two-week rapid audit to diagnose your current PMO maturity and identify quick wins."
    }
]

export default function EngagementSection() {
  return (
    <div id="engagement" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {engagementModels.map((model, index) => (
                  <AnimatedSection key={index} style={{ animationDelay: `${index * 150}ms` }}>
                      <Card className="h-full text-center bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                         <div className="mb-4 text-primary font-bold text-2xl">{index+1}</div>
                         <h3 className="text-xl font-headline font-semibold mb-2">{model.title}</h3>
                         <p className="text-base text-muted-foreground flex-grow">{model.description}</p>
                      </Card>
                  </AnimatedSection>
              ))}
          </div>
      </div>
    </div>
  );
}
