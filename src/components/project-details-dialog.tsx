
"use client";

import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ProjectDetailsDialog({ project }: { project: Project }) {
  const projectImage = PlaceHolderImages.find(img => img.id === project.imagePlaceholderId);
  return (
    <div className="flex flex-col h-full max-h-[85vh]">
      <DialogHeader className="px-4 pt-4 pb-2">
        <Badge variant="secondary" className="mb-1 w-fit text-[10px] uppercase tracking-wider">{project.category}</Badge>
        <DialogTitle className="font-headline text-xl md:text-2xl leading-tight">{project.title}</DialogTitle>
        <DialogDescription asChild>
            <div className="pt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <p><strong>Client:</strong> {project.client}</p>
                {project.partner && <p><strong>Partner:</strong> {project.partner}</p>}
            </div>
        </DialogDescription>
      </DialogHeader>
      
      <ScrollArea className="flex-grow px-4 pb-4">
        <div className="py-2 grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
              {projectImage && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/30 shadow-sm">
                  <Image
                  src={projectImage.imageUrl}
                  alt={project.title}
                  fill
                  data-ai-hint={projectImage.imageHint}
                  className="object-cover"
                  />
              </div>
              )}
               <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-[10px] py-0">{skill}</Badge>
                  ))}
              </div>
          </div>

          <div className="space-y-4">
             {project.scale && (
                <div className="space-y-1">
                    <h3 className="text-sm font-headline font-semibold text-primary uppercase tracking-tighter">The Scale / Challenge</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{project.scale}</p>
                </div>
            )}
            {project.scope && (
                <div className="space-y-1">
                    <h3 className="text-sm font-headline font-semibold text-primary uppercase tracking-tighter">Scope</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{project.scope}</p>
                </div>
            )}
            {project.role && (
                <div className="space-y-1">
                    <h3 className="text-sm font-headline font-semibold text-primary uppercase tracking-tighter">My Role</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{project.role}</p>
                </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
