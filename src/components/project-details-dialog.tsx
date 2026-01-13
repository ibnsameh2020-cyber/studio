
"use client";

import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function ProjectDetailsDialog({ project }: { project: Project }) {
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
      <div className="py-4">
        <p className="text-base text-muted-foreground min-h-[100px] animate-fade-in-up">
            {project.description}
        </p>
      </div>
    </>
  );
}
