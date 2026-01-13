import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <Card className={cn(
      "h-full w-full flex flex-col group overflow-hidden",
      "bg-card/50 backdrop-blur-lg border border-border/30 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    )}>
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
      </CardFooter>
    </Card>
  );
}
