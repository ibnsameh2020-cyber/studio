
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
    <div className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
            <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
            <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
            <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
            <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
            <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 relative">
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
    </div>
  );
}
