
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
        description: "A two-week rapid audit to diagnose your current PMO maturity and identify quick wins."
    }
]

export default function EngagementSection() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center max-w-6xl mx-auto">
              {engagementModels.map((model, index) => (
                  <Card key={index} className="flex-1 h-full text-center bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 min-w-[280px]">
                     <div className="mb-4 text-primary font-bold text-3xl">{index+1}</div>
                     <h3 className="text-xl font-headline font-semibold mb-4">{model.title}</h3>
                     <p className="text-base text-muted-foreground flex-grow">{model.description}</p>
                  </Card>
              ))}
          </div>
      </div>
    </div>
  );
}
