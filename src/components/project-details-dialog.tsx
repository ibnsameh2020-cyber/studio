
"use client";

import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProjectDetailsDialog({ project }: { project: Project }) {
  const projectImage = PlaceHolderImages.find(img => img.id === project.imagePlaceholderId);
  return (
    <>
      <DialogHeader>
        <Badge variant="secondary" className="mb-2 w-fit">{project.category}</Badge>
        <DialogTitle className="font-headline text-2xl">{project.title}</DialogTitle>
        <DialogDescription asChild>
            <div className="pt-2">
                <p className="text-sm text-muted-foreground"><strong>Client:</strong> {project.client}</p>
                {project.partner && <p className="text-sm text-muted-foreground"><strong>Partner:</strong> {project.partner}</p>}
            </div>
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
            {projectImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border/30">
                <Image
                src={projectImage.imageUrl}
                alt={project.title}
                fill
                data-ai-hint={projectImage.imageHint}
                className="object-cover"
                />
            </div>
            )}
             <div className="flex flex-wrap gap-2">
                {project.techStack.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                ))}
            </div>
        </div>

        <div className="space-y-6">
           {project.scale && (
              <div className="space-y-1">
                  <h3 className="text-lg font-headline font-semibold text-primary">The Scale / Challenge</h3>
                  <p className="text-sm text-muted-foreground">{project.scale}</p>
              </div>
          )}
          {project.scope && (
              <div className="space-y-1">
                  <h3 className="text-lg font-headline font-semibold text-primary">Scope</h3>
                  <p className="text-sm text-muted-foreground">{project.scope}</p>
              </div>
          )}
          {project.role && (
              <div className="space-y-1">
                  <h3 className="text-lg font-headline font-semibold text-primary">My Role</h3>
                  <p className="text-sm text-muted-foreground">{project.role}</p>
              </div>
          )}
        </div>
      </div>
    </>
  );
}
