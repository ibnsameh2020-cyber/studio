
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, Briefcase } from 'lucide-react';
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
const DURATION = 3500;

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % sentences.length);
        }, DURATION);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-32 md:h-24 flex items-center justify-center mb-12">
            {sentences.map((sentence, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center text-center",
                        currentIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                >
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        {sentence}
                    </p>
                </div>
            ))}
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
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center flex-grow flex flex-col justify-center">
        {/* Current Role Card */}
        <AnimatedSection>
            <div className="inline-flex items-center gap-3 bg-card/60 backdrop-blur-md border border-border/30 rounded-2xl px-5 py-3 mb-10 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center bg-primary/20 rounded-full">
                    <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left leading-tight">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Current Focus</p>
                    <p className="text-sm font-semibold">Strategic Planning & Cost-Efficiency Consultant @ SIO</p>
                </div>
            </div>
        </AnimatedSection>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold mb-6 tracking-tight">
          Strategy is Vision.<br />Execution is Reality.
        </h1>
        <p className="text-2xl md:text-3xl text-primary font-headline font-semibold mb-12">I Bridge the Gap.</p>
        
        <SwitchingHeroText />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <Link href="/#services">
            <Button size="lg" className="rounded-full px-8 group text-base">
              My Strategy
              <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            </Button>
          </Link>
          <Link href="/articles">
            <Button size="lg" variant="outline" className="rounded-full px-8 group text-base backdrop-blur-sm">
              Read My Manifesto
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Trusted Hands Scroller */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-10">Trusted by Global Entities</p>
            <div 
                className="flex w-fit animate-marquee-scroll hover:[animation-play-state:paused]"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
            >
                {[...clientLogos, ...clientLogos].map((client, index) => (
                    <div key={`${client.name}-${index}`} className="flex-shrink-0 mx-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
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
