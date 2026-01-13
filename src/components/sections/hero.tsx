"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useTypingEffect } from '@/hooks/use-typing-effect';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const heroTexts = ["Creative Developer", "UI/UX Enthusiast", "Problem Solver"];

export default function HeroSection() {
  const typedText = useTypingEffect(heroTexts);
  const avatarImage = PlaceHolderImages.find(img => img.id === 'hero-avatar');

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10"></div>
      <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {avatarImage && (
          <Image
            src={avatarImage.imageUrl}
            alt={avatarImage.description}
            width={160}
            height={160}
            data-ai-hint={avatarImage.imageHint}
            className="rounded-full mb-6 border-4 border-primary/50 shadow-lg"
            priority
          />
        )}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold mb-4">
          John Doe
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl text-primary font-headline mb-8">
          A <span className="relative">
              {typedText}
              <span className="animate-ping absolute top-1/2 -right-1 h-full w-1 bg-accent rounded-full"></span>
            </span>
        </p>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
          I design and build beautiful, high-performance web applications that provide exceptional user experiences.
        </p>
        <Link href="#projects">
          <Button size="lg" className="group">
            View My Work
            <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
