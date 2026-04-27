
"use client";

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BrainCircuit, ShieldQuestion, GanttChartSquare, Maximize2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: 'Transform Your PMO into a Value Engine',
    problem: 'Is your PMO a reporting bureaucracy? Many organizations suffer from "Zombie PMOs" that fail to deliver strategic outcomes.',
    solution: 'I engineer Strategy Realization Offices. Using frameworks like the Balanced Scorecard, I transform PMOs from cost centers into strategic partners.',
    deliverables: ['Governance Frameworks', 'PMO Setup/Re-engineering', 'Portfolio Optimization']
  },
  {
    icon: <ShieldQuestion className="w-8 h-8 text-primary" />,
    title: 'Rescuing High-Stakes Initiatives',
    problem: 'Your critical projects are over budget or failing. The financial drain must stop.',
    solution: 'I deploy a rapid "Triage & Stabilize" methodology. By auditing root causes, I provide an immediate roadmap to bring programs back on track.',
    deliverables: ['Root Cause Analysis', 'Recovery Roadmap', 'Crisis Leadership']
  },
  {
    icon: <GanttChartSquare className="w-8 h-8 text-primary" />,
    title: 'Bridging the Gap: Strategy & Tech',
    problem: 'Tech investments often fail due to poor user adoption and a lack of strategic alignment.',
    solution: 'I ensure your digital transformation (ERP, IoT, Cloud) solves real problems, ensuring technology, people, and processes move in sync.',
    deliverables: ['Digital Maturity Assessment', 'Transformation Roadmap', 'Change Management']
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Future-Proof Your Portfolio with AI',
    problem: 'Traditional reporting is retrospective. You need to know what will happen, not just what has happened.',
    solution: 'Leveraging AI and Predictive Analytics, I help you build a "Cognitive PMO" that predicts risks and provides data-driven decision support.',
    deliverables: ['AI Use-Case Identification', 'Predictive Dashboards', 'Data-Driven Governance']
  }
];

export default function ServicesSection() {
  return (
    <div className="w-full">
      <div className="flex flex-row gap-4 items-stretch justify-center max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <div key={index} className="flex-1 min-w-[240px] max-w-[320px]" data-reveal>
            <Dialog>
              <DialogTrigger asChild>
                <Card className="h-full bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl cursor-pointer group min-h-[220px] justify-center relative overflow-hidden">
                  <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm md:text-base font-headline leading-tight group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <div className="mt-4 flex items-center text-[10px] font-bold text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Learn More
                    <Maximize2 className="w-3 h-3 ml-2" />
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20 w-[95vw] max-h-[90vh] overflow-y-auto p-4 md:p-6">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">{service.icon}</div>
                    <DialogTitle className="text-lg md:text-2xl font-headline text-primary leading-tight">{service.title}</DialogTitle>
                  </div>
                </DialogHeader>
                <div className="space-y-4 pt-4 border-t border-border/50">
                  <div className="space-y-1">
                    <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-primary/70">The Problem</h3>
                    <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">{service.problem}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-primary/70">My Solution</h3>
                    <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">{service.solution}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-primary/70">Key Deliverables</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {service.deliverables.map((item) => (
                        <Badge key={item} variant="secondary" className="text-[10px] md:text-sm px-2 py-0.5 font-medium">{item}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
