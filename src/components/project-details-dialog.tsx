
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
      <DialogHeader className="px-3 pt-3 md:px-4 md:pt-4 pb-1 md:pb-2">
        <Badge variant="secondary" className="mb-0.5 md:mb-1 w-fit text-[8px] md:text-[9px] uppercase tracking-wider">{project.category}</Badge>
        <DialogTitle className="font-headline text-xs md:text-2xl leading-tight">{project.title}</DialogTitle>
        <DialogDescription asChild>
            <div className="pt-0.5 md:pt-1 flex flex-wrap gap-x-2 md:gap-x-3 gap-y-0.5 text-[8px] md:text-xs text-muted-foreground">
                <p><strong>Client:</strong> {project.client}</p>
                {project.partner && <p><strong>Partner:</strong> {project.partner}</p>}
            </div>
        </DialogDescription>
      </DialogHeader>
      
      <ScrollArea className="flex-grow px-3 pb-3 md:px-4 md:pb-4">
        <div className="py-1 md:py-2 grid md:grid-cols-2 gap-3 md:gap-6 items-start">
          <div className="space-y-2 md:space-y-3">
              {projectImage && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/30 shadow-sm max-w-[180px] md:max-w-none mx-auto">
                  <Image
                  src={projectImage.imageUrl}
                  alt={project.title}
                  fill
                  data-ai-hint={projectImage.imageHint}
                  className="object-cover"
                  />
              </div>
              )}
               <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                  {project.techStack.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-[7px] md:text-[9px] py-0 leading-none h-4">{skill}</Badge>
                  ))}
              </div>
          </div>

          <div className="space-y-2 md:space-y-3">
             {project.scale && (
                <div className="space-y-0 md:space-y-0.5">
                    <h3 className="text-[8px] md:text-[10px] font-headline font-semibold text-primary uppercase tracking-tighter">The Scale / Challenge</h3>
                    <p className="text-[9px] md:text-sm text-muted-foreground leading-tight">{project.scale}</p>
                </div>
            )}
            {project.scope && (
                <div className="space-y-0 md:space-y-0.5">
                    <h3 className="text-[8px] md:text-[10px] font-headline font-semibold text-primary uppercase tracking-tighter">Scope</h3>
                    <p className="text-[9px] md:text-sm text-muted-foreground leading-tight">{project.scope}</p>
                </div>
            )}
            {project.role && (
                <div className="space-y-0 md:space-y-0.5">
                    <h3 className="text-[8px] md:text-[10px] font-headline font-semibold text-primary uppercase tracking-tighter">My Role</h3>
                    <p className="text-[9px] md:text-sm text-muted-foreground leading-tight">{project.role}</p>
                </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
