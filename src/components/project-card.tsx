import type { Project } from '@/data/projects';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <Card className={cn(
      "h-full w-full flex flex-col group overflow-hidden",
      "bg-card/50 backdrop-blur-lg border border-border/30 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    )}>
      <Link href={`/projects/${project.id}`} className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="font-headline">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
            <div className="flex items-center text-sm text-primary group-hover:underline">
                Read more
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
