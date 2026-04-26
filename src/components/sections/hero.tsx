
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const sentences = [
    "Most transformations fail not because of poor strategy, but because of disconnected execution.",
    "As a strategic advisor for the government and healthcare sectors, I transform $120M+ portfolios from 'cost centers' into 'public value engines'.",
    "I use AI Governance, Value Engineering, and Human-Centric Leadership to bridge the gap."
];
const DURATION = 3000;

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

const clientLogos = [
    { name: 'SIO', url: 'https://i.ibb.co/kzQmy89/70bee6de-6292-4040-bd78-4b8ed275e938-removalai-preview.png' },
    { name: 'Salehiya', url: 'https://i.ibb.co/pBk2bKKy/536ae902-2fc5-4679-91e6-7af31fcbfea9-removalai-preview.png' },
    { name: 'Rosmiman', url: 'https://i.ibb.co/Rps1TB7f/rosmiman-Logo.png' },
    { name: 'KFMC', url: 'https://i.ibb.co/DgTk9pVf/KFMC.png' },
    { name: 'MOH', url: 'https://i.ibb.co/r2hpzd1G/Logo-ministry-of-health-saudi-arabia-identity-transparent-PNG.png' },
    { name: 'Olympus', url: 'https://i.ibb.co/j9fm4yYz/Olympus-Corporation-logo-svg.png' },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 bg-background">
      {/* Moatly Vertical Marquee Left */}
      <div className="absolute top-1/2 -translate-y-1/2 left-8 w-40 h-[60vh] hidden xl:block pointer-events-none opacity-50">
        <div className="flex flex-col gap-8 animate-marquee-y">
          {[...clientLogos, ...clientLogos].map((client, i) => (
            <div key={i} className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl p-6 h-32 flex items-center justify-center">
               <Image src={client.url} alt={client.name} width={100} height={100} className="object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Moatly Floating Advisory Card Right */}
      <div className="absolute top-1/3 right-8 w-72 hidden xl:block">
        <div className="bg-card/60 backdrop-blur-xl border border-primary/30 rounded-3xl p-6 shadow-2xl shadow-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Active Advisory</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Currently leading Strategic Planning & PMO Maturity at <span className="text-foreground font-bold">Saudi Irrigation Organization</span>.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
          Strategy is Vision.<br />Execution is Reality.
        </h1>
        <p className="text-xl md:text-2xl text-foreground font-headline mb-12">I Bridge the Gap.</p>
        
        <SwitchingHeroText />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#services">
            <Button size="lg" className="rounded-full px-8 group">
              Audit My Strategy
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
      </div>
    </section>
  );
}
