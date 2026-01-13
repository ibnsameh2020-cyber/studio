import Link from 'next/link';
import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-headline font-bold">My Projects</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          A selection of my work, from web apps to design systems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div key={project.id} className={`${project.layout.colSpan} ${project.layout.rowSpan}`}>
            <Link href={`/projects/${project.id}`} className="block h-full">
              <ProjectCard project={project} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
