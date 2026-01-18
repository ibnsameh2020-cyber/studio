
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const sentences = [
    "Most transformations fail not because of bad strategy, but because of disconnected execution.",
    "As a Strategic Advisor for Government & Healthcare sectors, I turn $120M+ portfolios from 'cost centers' into 'public value engines'.",
    "I use AI governance, Value Engineering, and Human-Centric Leadership to bridge the gap."
];
const DURATION = 5000; // ms

const SwitchingHeroText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, DURATION);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-base md:text-lg mb-10">
            <div className="relative overflow-hidden bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl w-full min-h-[150px] md:min-h-[130px] flex items-center justify-center">
                <p key={currentIndex} className="text-center animate-fade-in-up">
                    {sentences[currentIndex]}
                </p>
                <div className="absolute bottom-0 left-0 h-1 bg-primary-foreground/20 w-full">
                    <div
                        key={currentIndex}
                        className="h-1 bg-primary-foreground"
                        style={{ animation: `progress-bar ${DURATION / 1000}s linear forwards` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default function HeroSection() {

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
          Strategy is Vision. Execution is Reality.
        </h1>
        <p className="text-xl sm:text-2xl md:text-4xl text-primary font-headline mb-8 h-10 md:h-12">
            I Bridge the Gap.
        </p>
        
        <SwitchingHeroText />
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#services">
              <Button size="lg" className="group">
                Audit My Portfolio Strategy
                <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
              </Button>
            </Link>
            <Link href="/articles">
                <Button size="lg" variant="outline" className="group">
                    Explore my manifesto
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
