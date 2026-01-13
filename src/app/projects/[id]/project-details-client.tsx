
"use client";

import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, ArrowUpRight } from 'lucide-react';
import { useTypingEffect } from '@/hooks/use-typing-effect';

export default function ProjectDetailsClient({ project }: { project: Project }) {
  const typedDescription = useTypingEffect([project.description], {
    loop: false,
    typeSpeed: 10,
    deleteSpeed: 0,
  });

  const projectImage = PlaceHolderImages.find(img => img.id === project.imagePlaceholderId);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12">
            <div className="space-y-4">
                {projectImage && (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-border/30 shadow-lg">
                        <Image
                        src={projectImage.imageUrl}
                        alt={project.title}
                        fill
                        data-ai-hint={projectImage.imageHint}
                        className="object-cover"
                        />
                    </div>
                )}
                <div className="flex gap-2">
                    {project.githubUrl && (
                        <Button asChild variant="secondary" className="flex-1">
                            <Link href={project.githubUrl} target="_blank">
                                <Github className="w-4 h-4 mr-2" />
                                View Code
                            </Link>
                        </Button>
                    )}
                    {project.liveUrl && (
                        <Button asChild className="flex-1">
                            <Link href={project.liveUrl} target="_blank">
                                <ArrowUpRight className="w-4 h-4 mr-2" />
                            Live Demo
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
            <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-headline font-semibold">About This Project</h2>
                <p className="text-base md:text-lg text-muted-foreground min-h-[100px]">
                    {typedDescription}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}
