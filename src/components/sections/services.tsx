"use client";

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BrainCircuit, ShieldQuestion, GanttChartSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const services = [
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: 'Transform Your PMO into a Value Engine',
    problem: 'Is your PMO a reporting bureaucracy? Many organizations suffer from "Zombie PMOs" that generate paperwork but fail to deliver strategic outcomes.',
    solution: 'I do not just build PMOs; I engineer Strategy Realization Offices. Using frameworks like the Balanced Scorecard and McKinsey 7S, I transform your PMO from a cost center into a strategic partner that drives execution velocity and aligns every project with Vision 2030.',
    deliverables: ['Governance Frameworks', 'PMO Setup/Re-engineering', 'Portfolio Optimization']
  },
  {
    icon: <ShieldQuestion className="w-8 h-8 text-primary" />,
    title: 'Rescuing High-Stakes Initiatives',
    problem: 'Your critical projects are over budget, behind schedule, or failing to meet quality standards. The financial drain must stop.',
    solution: 'I deploy a rapid "Triage & Stabilize" methodology. By auditing the root causes—technical, cultural, or procedural—I provide an immediate roadmap to bring the program back on track or strategically restructure it to minimize loss.',
    deliverables: ['Root Cause Analysis', 'Recovery Roadmap', 'Crisis Leadership']
  },
  {
    icon: <GanttChartSquare className="w-8 h-8 text-primary" />,
    title: 'Bridging the Gap Between Strategy & Technology',
    problem: 'Technology investments often fail not due to the software, but because of poor user adoption and a lack of strategic alignment.',
    solution: 'I ensure your digital transformation (ERP, IoT, Cloud) solves real business problems. I govern the transformation journey, ensuring that technology, people, and processes move in sync to achieve true operational maturity.',
    deliverables: ['Digital Maturity Assessment', 'Transformation Roadmap', 'Change Management (ACMP)']
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Future-Proof Your Portfolio with AI',
    problem: 'Traditional reporting is retrospective. You need to know what will happen, not just what has already happened.',
    solution: 'Leveraging Generative AI and Predictive Analytics, I help you build a "Cognitive PMO." We will implement systems that predict risks, automate routine reporting, and provide data-driven decision support for C-level executives.',
    deliverables: ['AI Use-Case Identification', 'Predictive Dashboard Setup', 'Data-Driven Governance']
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
                <Card className="h-full bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl cursor-pointer group min-h-[200px] justify-center">
                  <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm md:text-base font-headline leading-tight group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20">
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">{service.icon}</div>
                    <DialogTitle className="text-2xl font-headline text-primary">{service.title}</DialogTitle>
                  </div>
                </DialogHeader>
                <div className="space-y-6 pt-6 border-t border-border/50">
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">The Problem</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{service.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">My Solution</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{service.solution}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">Key Deliverables</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <Badge key={item} variant="secondary" className="text-sm px-3 py-1 font-medium">{item}</Badge>
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