"use client";

import AnimatedSection from '@/components/animated-section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, BrainCircuit, Users, ShieldQuestion, Target, GanttChartSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    icon: <Briefcase className="w-10 h-10 text-primary" />,
    title: 'Turn Your PMO into a Value Engine.',
    problem: 'Is your PMO just a reporting bureaucracy? Many organizations suffer from "Zombie PMOs" that generate paperwork but fail to deliver strategic outcomes.',
    solution: 'I don\'t just build PMOs; I engineer Strategy Realization Offices. Using frameworks like Balanced Scorecard and McKinsey 7S, I transform your PMO from a cost center into a strategic partner that drives execution velocity and aligns every project with Vision 2030.',
    deliverables: ['Governance Frameworks', 'PMO Setup/Re-engineering', 'Portfolio Optimization']
  },
  {
    icon: <ShieldQuestion className="w-10 h-10 text-primary" />,
    title: 'Rescuing High-Stakes Initiatives.',
    problem: 'Critical projects are over budget, behind schedule, or failing to meet quality standards. The bleeding needs to stop.',
    solution: 'I deploy a rapid "Triage & Stabilize" methodology. By auditing the root causes—whether technical, cultural, or procedural—I provide an immediate roadmap to bring the program back on track or strategically restructure it to minimize loss.',
    deliverables: ['Root Cause Analysis', 'Recovery Roadmap', 'Crisis Leadership']
  },
  {
    icon: <GanttChartSquare className="w-10 h-10 text-primary" />,
    title: 'Bridging the Gap Between Strategy & Tech.',
    problem: 'Technology investments often fail not because of the software, but because of poor adoption and lack of strategic alignment.',
    solution: 'I ensure your digital transformation (ERP, IoT, Cloud) solves actual business problems. I govern the transformation journey, ensuring that technology, people, and processes move in sync to achieve genuine operational maturity.',
    deliverables: ['Digital Maturity Assessment', 'Transformation Roadmap', 'Change Management (ACMP)']
  },
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: 'Future-Proof Your Portfolio with AI.',
    problem: 'Traditional reporting looks backward. You need to know what will happen, not what has happened.',
    solution: 'Leveraging the power of Generative AI and Predictive Analytics, I help you build a "Cognitive PMO." We implement systems that predict risks, automate routine reporting, and provide data-driven decision support for C-Level executives.',
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
        description: "A 2-week rapid audit to diagnose your current PMO maturity and identify quick wins."
    }
]

export function ServicesSection() {
  return (
    <section id="services">
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">My Expertise</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
              I help visionary leaders bridge the gap between strategy and execution, transforming cost centers into value engines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="h-full bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-8 flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 mt-1">{service.icon}</div>
                      <div className="flex-grow">
                          <CardHeader className="p-0">
                              <CardTitle className="text-2xl font-headline mb-4 text-primary">{service.title}</CardTitle>
                          </CardHeader>
                          <div className="space-y-6">
                              <div>
                                  <h3 className="font-semibold text-lg mb-1">The Problem</h3>
                                  <p className="text-sm text-muted-foreground">{service.problem}</p>
                              </div>
                              <div>
                                  <h3 className="font-semibold text-lg mb-1">My Solution</h3>
                                  <p className="text-sm text-muted-foreground">{service.solution}</p>
                              </div>
                               <div>
                                  <h3 className="font-semibold text-lg mb-2">Key Deliverables</h3>
                                  <div className="flex flex-wrap gap-2">
                                      {service.deliverables.map((item) => (
                                          <Badge key={item} variant="secondary">{item}</Badge>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      <div id="engagement" className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-headline font-bold">How We Can Work Together</h2>
                  <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                      Flexible engagement models to suit your strategic needs.
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
