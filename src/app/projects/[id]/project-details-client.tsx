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
    typeSpeed: 20,
    deleteSpeed: 0,
  });

  const projectImage = PlaceHolderImages.find(img => img.id === project.imagePlaceholderId);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
          {projectImage && (
            <Image
              src={projectImage.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={projectImage.imageHint}
            />
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>

        <div className="space-y-4">
            <h2 className="text-2xl font-headline font-semibold">About This Project</h2>
            <p className="text-lg text-muted-foreground min-h-[100px]">
                {typedDescription}
            </p>
        </div>


        <div className="flex gap-4 mt-8">
          {project.liveUrl && (
            <Button asChild>
              <Link href={project.liveUrl} target="_blank">
                Live Demo <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank">
                 <Github className="w-4 h-4 mr-2" /> GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
