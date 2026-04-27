import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div key={project.id} data-reveal className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
