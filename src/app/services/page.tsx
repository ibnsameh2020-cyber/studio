
"use client";

import AnimatedSection from '@/components/animated-section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, BrainCircuit, Users } from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="w-12 h-12 text-primary" />,
    title: 'Strategic PMO Setup & Enhancement',
    description: 'I establish and mature Project Management Offices, turning them from administrative hubs into strategic assets that drive execution and deliver measurable business value.',
  },
  {
    icon: <BrainCircuit className="w-12 h-12 text-primary" />,
    title: 'Digital Transformation Governance',
    description: 'I provide strategic oversight for complex digital transformation programs, ensuring they align with business objectives, manage risk, and deliver a clear return on investment (ROI).',
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: 'Executive & Team Coaching',
    description: 'I coach project leaders and their teams, equipping them with the strategic mindset and practical skills needed to navigate complexity and deliver excellence in a fast-paced digital world.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">My Expertise</h2>
          <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            How I can help you bridge the gap between strategy and execution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <AnimatedSection key={index} style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="h-full text-center bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer">
                <div className="mb-6">{service.icon}</div>
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-headline mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base text-muted-foreground flex-grow">
                  {service.description}
                </CardDescription>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
