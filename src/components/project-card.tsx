import type { Project } from '@/lib/types';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import ProjectDetailsDialog from './project-details-dialog';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectImage = PlaceHolderImages.find(img => img.id === project.imagePlaceholderId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={cn(
          "h-full w-full flex flex-col group overflow-hidden cursor-pointer",
          "bg-card/50 backdrop-blur-lg border border-border/30 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
        )}>
            {projectImage && (
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 z-10 pointer-events-none rounded-t-lg ring-1 ring-inset ring-primary/60"></div>
                <Image
                  src={projectImage.imageUrl}
                  alt={project.title}
                  fill
                  data-ai-hint={projectImage.imageHint}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <CardHeader className="p-2 md:p-4 md:pb-4">
              <Badge variant="secondary" className="mb-1 md:mb-2 w-fit text-[8px] md:text-xs">{project.category}</Badge>
              <CardTitle className="font-headline text-[10px] md:text-base leading-tight">{project.title}</CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto p-2 md:p-6 md:pt-0">
                <div className="flex items-center text-[8px] md:text-sm text-primary group-hover:underline font-bold uppercase tracking-tighter">
                    View Case Study
                    <ArrowRight className="w-2.5 h-2.5 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
            </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="p-0 border-none sm:max-w-4xl bg-background/95 backdrop-blur-xl">
        <ProjectDetailsDialog project={project} />
      </DialogContent>
    </Dialog>
  );
}
