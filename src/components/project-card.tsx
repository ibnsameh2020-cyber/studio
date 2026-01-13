import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import LikeButton from './like-button';
import { cn } from '@/lib/utils';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectImage = PlaceHolderImages.find(img => img.id === project.imagePlaceholderId);

  return (
    <Card className={cn(
      "h-full w-full flex flex-col group overflow-hidden",
      "bg-card/50 backdrop-blur-lg border border-border/30 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    )}>
      <div className="relative w-full h-48 overflow-hidden">
        {projectImage && (
          <Image
            src={projectImage.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={projectImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent" />
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
            {project.liveUrl && (
            <Button asChild variant="outline" size="sm">
                <Link href={project.liveUrl}>
                Live Demo <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
            )}
        </div>
        <LikeButton projectId={project.id} />
      </CardFooter>
    </Card>
  );
}
