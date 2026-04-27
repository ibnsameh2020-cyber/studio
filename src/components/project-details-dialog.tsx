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
    <div className="flex flex-col h-full max-h-[95vh] md:max-h-[85vh]">
      <DialogHeader className="px-3 pt-3 md:px-6 md:pt-6 pb-2">
        <Badge variant="secondary" className="mb-1 w-fit text-[8px] md:text-[10px] uppercase tracking-widest">{project.category}</Badge>
        <DialogTitle className="font-headline text-sm md:text-2xl leading-tight text-primary">{project.title}</DialogTitle>
        <DialogDescription asChild>
            <div className="pt-1 flex flex-wrap gap-x-3 gap-y-1 text-[9px] md:text-xs text-muted-foreground font-medium">
                <p><strong>Client:</strong> {project.client}</p>
                {project.partner && <p><strong>Partner:</strong> {project.partner}</p>}
            </div>
        </DialogDescription>
      </DialogHeader>
      
      <ScrollArea className="flex-grow px-3 pb-3 md:px-6 md:pb-6">
        <div className="py-2 grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8 items-start">
          {/* Left Column: Visuals & Tech */}
          <div className="space-y-3">
              {projectImage && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/30 shadow-md">
                  <Image
                  src={projectImage.imageUrl}
                  alt={project.title}
                  fill
                  data-ai-hint={projectImage.imageHint}
                  className="object-cover"
                  />
              </div>
              )}
               <div className="flex flex-wrap gap-1">
                  {project.techStack.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-[7px] md:text-[9px] py-0 leading-none h-4 px-1.5">{skill}</Badge>
                  ))}
              </div>
          </div>

          {/* Right Column: Key Details */}
          <div className="space-y-3">
             {project.scale && (
                <div className="space-y-0.5">
                    <h3 className="text-[8px] md:text-[11px] font-headline font-bold text-primary/80 uppercase tracking-widest">Impact / Scale</h3>
                    <p className="text-[9px] md:text-sm text-muted-foreground leading-snug">{project.scale}</p>
                </div>
            )}
            {project.scope && (
                <div className="space-y-0.5">
                    <h3 className="text-[8px] md:text-[11px] font-headline font-bold text-primary/80 uppercase tracking-widest">Scope</h3>
                    <p className="text-[9px] md:text-sm text-muted-foreground leading-snug">{project.scope}</p>
                </div>
            )}
            {project.role && (
                <div className="space-y-0.5">
                    <h3 className="text-[8px] md:text-[11px] font-headline font-bold text-primary/80 uppercase tracking-widest">My Strategy</h3>
                    <p className="text-[9px] md:text-sm text-muted-foreground leading-snug">{project.role}</p>
                </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
