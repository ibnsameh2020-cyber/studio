
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import { useTypingEffect } from '@/hooks/use-typing-effect';
import Link from 'next/link';

const heroTexts = ["Creative Developer", "UI/UX Enthusiast", "Problem Solver"];

export default function HeroSection() {
  const typedText = useTypingEffect(heroTexts);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold mb-4">
          Eng. Sameh Moussa
        </h1>
        <p className="text-xl sm:text-2xl md:text-4xl text-primary font-headline mb-8 h-10 md:h-12">
          A <span className="relative">
              {typedText}
              <span className="animate-ping absolute top-1/2 -right-1 h-full w-1 bg-accent rounded-full"></span>
            </span>
        </p>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground mb-10">
          I design and build beautiful, high-performance web applications that provide exceptional user experiences.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#projects">
              <Button size="lg" className="group">
                View My Work
                <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
              </Button>
            </Link>
            <a href="/resume.pdf" download="Sameh-Moussa-Resume.pdf">
                <Button size="lg" className="group bg-cv-teal text-cv-pine hover:bg-cv-teal/90">
                    Download Resume
                    <Download className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
                </Button>
            </a>
        </div>
      </div>
    </section>
  );
}
