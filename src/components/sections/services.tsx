
"use client";

import AnimatedSection from '@/components/animated-section';
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
    icon: <Briefcase className="w-10 h-10 text-primary" />,
    title: 'Transform Your PMO into a Value Engine',
    problem: 'Is your PMO a reporting bureaucracy? Many organizations suffer from "Zombie PMOs" that generate paperwork but fail to deliver strategic outcomes.',
    solution: 'I do not just build PMOs; I engineer Strategy Realization Offices. Using frameworks like the Balanced Scorecard and McKinsey 7S, I transform your PMO from a cost center into a strategic partner that drives execution velocity and aligns every project with Vision 2030.',
    deliverables: ['Governance Frameworks', 'PMO Setup/Re-engineering', 'Portfolio Optimization']
  },
  {
    icon: <ShieldQuestion className="w-10 h-10 text-primary" />,
    title: 'Rescuing High-Stakes Initiatives',
    problem: 'Your critical projects are over budget, behind schedule, or failing to meet quality standards. The financial drain must stop.',
    solution: 'I deploy a rapid "Triage & Stabilize" methodology. By auditing the root causes—technical, cultural, or procedural—I provide an immediate roadmap to bring the program back on track or strategically restructure it to minimize loss.',
    deliverables: ['Root Cause Analysis', 'Recovery Roadmap', 'Crisis Leadership']
  },
  {
    icon: <GanttChartSquare className="w-10 h-10 text-primary" />,
    title: 'Bridging the Gap Between Strategy & Technology',
    problem: 'Technology investments often fail not due to the software, but because of poor user adoption and a lack of strategic alignment.',
    solution: 'I ensure your digital transformation (ERP, IoT, Cloud) solves real business problems. I govern the transformation journey, ensuring that technology, people, and processes move in sync to achieve true operational maturity.',
    deliverables: ['Digital Maturity Assessment', 'Transformation Roadmap', 'Change Management (ACMP)']
  },
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: 'Future-Proof Your Portfolio with AI',
    problem: 'Traditional reporting is retrospective. You need to know what will happen, not just what has already happened.',
    solution: 'Leveraging Generative AI and Predictive Analytics, I help you build a "Cognitive PMO." We will implement systems that predict risks, automate routine reporting, and provide data-driven decision support for C-level executives.',
    deliverables: ['AI Use-Case Identification', 'Predictive Dashboard Setup', 'Data-Driven Governance']
  }
];

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

export default function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">My Expertise</h2>
          <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            I help visionary leaders bridge the gap between strategy and execution, transforming cost centers into value engines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <AnimatedSection key={index} style={{ animationDelay: `${index * 150}ms` }}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="h-full bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer group min-h-[240px] justify-center">
                    <div className="mb-6 text-primary transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg font-headline leading-tight group-hover:text-primary transition-colors">
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
            </AnimatedSection>
          ))}
        </div>
      </div>

      <div id="engagement" className="pt-24 pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-headline font-bold">How We Can Work Together</h2>
                  <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                      Flexible engagement models designed to suit your strategic needs.
                  </p>
              </div>
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
    </section>
  );
}
