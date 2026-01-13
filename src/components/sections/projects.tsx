import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-3xl md:text-5xl font-headline font-bold">My Projects</h2>
        <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          A selection of my work, from web apps to design systems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
