
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import { useTypingEffect } from '@/hooks/use-typing-effect';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const heroTexts = ["A Strategic PMO Leader", "A Digital Transformation Expert", "An AI Governance Advisor"];

const animatedSentences = [
    "I translate complex strategies into measurable reality.",
    "A Strategic PMO Leader with over 20 years of experience.",
    "Managing $100M+ portfolios for government and private entities.",
    "Ensuring digital initiatives deliver genuine ROI and excellence."
];

const AnimatedHeroText = () => {
    const [index, setIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    
    const sentence = animatedSentences[index];

    const changeSentence = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            setIndex(prevIndex => (prevIndex + 1) % animatedSentences.length);
            setIsExiting(false);
        }, 500); // Exit animation duration
    }, []);

    useEffect(() => {
        if (!isPaused) {
            timeoutRef.current = setTimeout(changeSentence, 4000); // Sentence display duration
        }
        
        // Pause/resume progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.animationPlayState = isPaused ? 'paused' : 'running';
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [index, isPaused, changeSentence]);
    
    return (
        <div 
            className="relative h-28 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-muted-foreground text-base md:text-lg mb-10 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                key={index} // Re-render component to restart animation
                className={cn(
                    "text-center absolute bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-xl p-4 shadow-lg shadow-primary/20 w-full max-w-2xl",
                    isExiting ? 'animate-slide-out-up-fade' : 'animate-slide-in-up-fade'
                )}
            >
                <p className="text-foreground">{sentence}</p>
            </div>
            <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-border/20 mx-auto w-1/2">
                <div
                    ref={progressBarRef}
                    key={index} // Reset progress bar on sentence change
                    className="h-full bg-primary animate-progress-bar"
                />
            </div>
        </div>
    );
};

export default function HeroSection() {
  const typedText = useTypingEffect(heroTexts);
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Downloading Resume",
      description: "Your download has started.",
    });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold mb-4">
          Eng. Sameh Moussa
        </h1>
        <p className="text-xl sm:text-2xl md:text-4xl text-primary font-headline mb-8 h-10 md:h-12">
          <span className="relative">
              {typedText}
              <span className="animate-ping absolute top-1/2 -right-1 h-full w-1 bg-accent rounded-full"></span>
            </span>
        </p>
        
        <AnimatedHeroText />
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#projects">
              <Button size="lg" className="group">
                View My Work
                <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
              </Button>
            </Link>
            <a href="/resume.pdf" download="Sameh-Moussa-Strategic-PMO-Leader.pdf" onClick={handleDownload}>
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
