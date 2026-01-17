
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
        <DialogTitle className="font-headline text-2xl">{project.title}</DialogTitle>
        <DialogDescription asChild>
            <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
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
        </div>

        <div className="space-y-6">
           {project.situation && (
              <div className="space-y-1">
                  <h3 className="text-lg font-headline font-semibold text-primary">Situation</h3>
                  <p className="text-sm text-muted-foreground">{project.situation}</p>
              </div>
          )}
          {project.task && (
              <div className="space-y-1">
                  <h3 className="text-lg font-headline font-semibold text-primary">Task</h3>
                  <p className="text-sm text-muted-foreground">{project.task}</p>
              </div>
          )}
          {project.action && (
              <div className="space-y-1">
                  <h3 className="text-lg font-headline font-semibold text-primary">Action</h3>
                  <p className="text-sm text-muted-foreground">{project.action}</p>
              </div>
          )}
          {project.result && (
              <div className="space-y-1">
                  <h3 className="text-lg font-headline font-semibold text-primary">Result</h3>
                  <p className="text-sm text-muted-foreground">{project.result}</p>
              </div>
          )}
        </div>
      </div>
    </>
  );
}
