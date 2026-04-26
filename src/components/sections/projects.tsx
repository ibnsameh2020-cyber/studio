
import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';
import AnimatedSection from '../animated-section';

export default function ProjectsSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
