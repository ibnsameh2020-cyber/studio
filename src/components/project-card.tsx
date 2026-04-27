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
                {/* This div creates the permanent highlight effect on the image */}
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
            <CardHeader className="pb-4">
              <Badge variant="secondary" className="mb-2 w-fit">{project.category}</Badge>
              <CardTitle className="font-headline text-base">{project.title}</CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto pb-6">
                <div className="flex items-center text-sm text-primary group-hover:underline">
                    View Case Study
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
            </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <ProjectDetailsDialog project={project} />
      </DialogContent>
    </Dialog>
  );
}
