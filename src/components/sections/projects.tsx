
import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';
import AnimatedSection from '../animated-section';
import { Globe, Hospital, Building, Bot } from 'lucide-react';
import { Separator } from '../ui/separator';

const GlobalFootprint = () => {
    const competencies = [
        { icon: <Bot className="w-5 h-5 mr-3 text-primary" />, text: "Smart Ecosystems: IoT & Smart Cities" },
        { icon: <Hospital className="w-5 h-5 mr-3 text-primary" />, text: "Digital Health: Medical Archiving, HMS, & Integration" },
        { icon: <Building className="w-5 h-5 mr-3 text-primary" />, text: "Enterprise Tech: ERP, CRM, & Low Current Systems" },
        { icon: <Globe className="w-5 h-5 mr-3 text-primary" />, text: "Facility Intelligence: CAFM & Infrastructure Management" }
    ];

    return (
        <AnimatedSection>
            <div className="mt-24 md:mt-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold">Global Expertise. Local Impact.</h2>
                    <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                        My experience extends beyond borders. I have led strategic consultations, IT infrastructure deployments, and complex medical integrations across Egypt, North & Middle Africa, the UK, and the Gulf Countries.
                    </p>
                </div>
                 <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl">
                    <h3 className="text-xl font-headline font-semibold text-center mb-6">Core Competencies Across Regions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {competencies.map(item => (
                            <div key={item.text} className="flex items-center">
                                {item.icon}
                                <span className="text-muted-foreground">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};


export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative overflow-hidden">
      <div className="relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Featured Success Stories</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              A deep dive into how I've delivered value and driven results in my key projects.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} style={{ animationDelay: `${index * 150}ms` }}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
        <GlobalFootprint />
      </div>
    </section>
  );
}
