
"use client";

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
        description: "A rapid audit to diagnose your current PMO maturity and identify quick wins."
    }
]

export default function EngagementSection() {
  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap gap-3 items-stretch justify-center max-w-6xl mx-auto px-4">
          {engagementModels.map((model, index) => (
              <div key={index} className="flex-1 min-w-[140px] md:min-w-[240px] sm:max-w-[340px]" data-reveal>
                <Card className="h-full text-center bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-3 md:p-8 flex flex-col items-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1">
                   <div className="mb-1 md:mb-4 text-primary font-bold text-lg md:text-3xl">{index+1}</div>
                   <h3 className="text-[10px] md:text-lg font-headline font-semibold mb-1 md:mb-4 leading-tight">{model.title}</h3>
                   <p className="text-[9px] md:text-sm text-muted-foreground flex-grow leading-tight">{model.description}</p>
                </Card>
              </div>
          ))}
      </div>
    </div>
  );
}
