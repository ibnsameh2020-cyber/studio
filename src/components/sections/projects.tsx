
import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';
import AnimatedSection from '../animated-section';

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative overflow-hidden">
      <div className="relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Success Stories</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              A deep dive into how I've delivered value and driven results in my key projects.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} style={{ animationDelay: `${index * 150}ms` }}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
