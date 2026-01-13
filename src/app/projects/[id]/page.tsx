import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectDetailsClient from './project-details-client';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
