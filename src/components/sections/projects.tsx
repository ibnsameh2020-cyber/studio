
import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';
import AnimatedSection from '../animated-section';

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden">
       <div aria-hidden="true" className="absolute inset-0 z-0 -mx-28">
        <div className="absolute top-0 left-1/2 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
        <div className="absolute top-1/2 left-1/3 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
        <div className="absolute top-1/4 right-0 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
      </div>
      <div className="relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">My Projects</h2>
            <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              A selection of my work, from web apps to design systems.
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
