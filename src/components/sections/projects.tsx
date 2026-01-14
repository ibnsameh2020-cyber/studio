import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';
import AnimatedSection from '../animated-section';

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold">My Projects</h2>
        <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          A selection of my work, from web apps to design systems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <AnimatedSection key={project.id} style={{ animationDelay: `${index * 150}ms` }}>
             <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
