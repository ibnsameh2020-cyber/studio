
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import AnimatedSection from '../animated-section';

const sentences = [
    "Most transformations fail not because of poor strategy, but because of disconnected execution.",
    "As a strategic advisor for the government and healthcare sectors, I transform $120M+ portfolios from 'cost centers' into 'public value engines'.",
    "I use AI Governance, Value Engineering, and Human-Centric Leadership to bridge the gap."
];
const DURATION = 3000;

const clientLogos = [
    { name: 'Saudi Irrigation Organization', src: "https://i.ibb.co/kzQmy89/70bee6de-6292-4040-bd78-4b8ed275e938-removalai-preview.png" },
    { name: 'Salehiya', src: "https://i.ibb.co/pBk2bKKy/536ae902-2fc5-4679-91e6-7af31fcbfea9-removalai-preview.png" },
    { name: 'Rosmiman', src: "https://i.ibb.co/Rps1TB7f/rosmiman-Logo.png" },
    { name: 'Repotech', src: "https://i.ibb.co/B202P1JK/R.png" },
    { name: 'Olympus', src: "https://i.ibb.co/j9fm4yYz/Olympus-Corporation-logo-svg.png" },
    { name: 'Ministry of Health', src: "https://i.ibb.co/r2hpzd1G/Logo-ministry-of-health-saudi-arabia-identity-transparent-PNG.png" },
];

const SwitchingHeroText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isHovered) {
            timer = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
            }, DURATION);
        }
        return () => clearTimeout(timer);
    }, [currentIndex, isHovered]);

    return (
        <div 
            className="relative w-full max-w-2xl mx-auto flex items-center justify-center text-base md:text-lg mb-10 h-[220px] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {sentences.map((sentence, index) => {
                const position = (index - currentIndex + sentences.length) % sentences.length;
                const isCurrent = position === 0;

                return (
                    <div
                        key={index}
                        className={cn(
                            "absolute w-[95%] transition-all duration-700 ease-in-out",
                            isCurrent ? "translate-y-0 opacity-100 z-30 scale-100" : 
                            position === sentences.length - 1 ? "-translate-y-6 opacity-60 z-20 scale-95 rotate-[-2deg]" :
                            "translate-y-8 opacity-0 z-10 scale-90"
                        )}
                    >
                        <div className={cn(
                            "relative overflow-hidden rounded-2xl p-8 shadow-2xl flex items-center justify-center min-h-[140px]",
                            isCurrent ? "bg-primary text-primary-foreground" : "bg-primary/20 backdrop-blur-lg border border-primary/30 text-foreground"
                        )}>
                            <p className="text-center font-medium">{sentence}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 bg-background">
      {/* Animated Bubble Background */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
          <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
          <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
          <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
          <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
          <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center flex-grow flex flex-col justify-center">
        {/* Current Role Card */}
        <AnimatedSection>
            <div className="inline-flex items-center gap-3 bg-card/40 backdrop-blur-md border border-border/30 rounded-full px-4 py-2 mb-8 shadow-lg">
                <div className="flex h-8 w-8 items-center justify-center bg-primary/20 rounded-full">
                    <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left leading-tight">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Current Focus</p>
                    <p className="text-xs font-semibold">Strategic Planning & Cost-Efficiency Consultant @ SIO</p>
                </div>
            </div>
        </AnimatedSection>

        <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
          Strategy is Vision.<br />Execution is Reality.
        </h1>
        <p className="text-xl md:text-2xl text-foreground font-headline mb-12">I Bridge the Gap.</p>
        
        <SwitchingHeroText />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/#services">
            <Button size="lg" className="rounded-full px-8 group">
              My Strategy
              <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            </Button>
          </Link>
          <Link href="/articles">
            <Button size="lg" variant="outline" className="rounded-full px-8 group">
              Read My Manifesto
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Trusted Hands Scroller */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold mb-8">Trusted by Global Entities</p>
            <div 
                className="flex w-fit animate-marquee-scroll hover:[animation-play-state:paused]"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
            >
                {[...clientLogos, ...clientLogos].map((client, index) => (
                    <div key={`${client.name}-${index}`} className="flex-shrink-0 mx-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                        <div className="relative h-12 w-32">
                            <Image
                                src={client.src}
                                alt={client.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
