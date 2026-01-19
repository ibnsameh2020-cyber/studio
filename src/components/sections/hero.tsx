
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const sentences = [
    "Most transformations fail not because of bad strategy, but because of disconnected execution.",
    "As a Strategic Advisor for Government & Healthcare sectors, I turn $120M+ portfolios from 'cost centers' into 'public value engines'.",
    "I use AI governance, Value Engineering, and Human-Centric Leadership to bridge the gap."
];
const DURATION = 3000; // ms

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

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sentences.length) % sentences.length);
    };

    return (
        <div 
            className="relative w-full max-w-2xl mx-auto flex items-center justify-center text-base md:text-lg mb-10 h-[220px] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {sentences.map((sentence, index) => {
                const position = (index - currentIndex + sentences.length) % sentences.length;
                const isCurrent = position === 0;

                let styles: React.CSSProperties = {
                    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'absolute',
                    width: '95%',
                };

                if (isCurrent) { // Current card, comes from bottom
                    styles = {
                        ...styles,
                        transform: 'translateY(0) scale(1)',
                        opacity: 1,
                        zIndex: 30,
                    };
                } else if (position === sentences.length - 1) { // Previous card, goes to back
                    styles = {
                        ...styles,
                        transform: 'translateY(-1.5rem) scale(0.95) rotate(-3deg)',
                        opacity: 1,
                        zIndex: 25,
                    };
                } else { // All other cards are hidden below, waiting their turn
                    styles = {
                        ...styles,
                        transform: 'translateY(2rem) scale(0.8)',
                        opacity: 0,
                        zIndex: 20,
                    };
                }

                return (
                    <div
                        key={index}
                        style={styles}
                    >
                        <div
                            className={cn(
                                "relative overflow-hidden rounded-2xl p-6 shadow-xl w-full min-h-[150px] md:min-h-[130px] flex items-center justify-center",
                                isCurrent 
                                    ? "bg-primary text-primary-foreground border border-primary" 
                                    : "bg-primary/20 backdrop-blur-lg border border-primary/50 text-foreground"
                            )}
                        >
                            <p className="text-center px-6">{sentence}</p>
                            {isCurrent && (
                                <>
                                    <div className="absolute top-4 right-4 text-xs font-mono text-primary-foreground/70">
                                        {currentIndex + 1} of {sentences.length}
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 bg-primary-foreground/20 w-full">
                                        <div
                                            key={currentIndex}
                                            className="h-1 bg-primary-foreground"
                                            style={{ animation: `progress-bar ${DURATION / 1000}s linear forwards` }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
            
            {/* Navigation controls */}
            <div className="absolute inset-0 z-40 flex justify-between items-center">
                <div 
                    onClick={prevCard} 
                    className="h-full w-1/2 cursor-pointer"
                    aria-label="Previous card"
                >
                    <ChevronLeft className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div 
                    onClick={nextCard} 
                    className="h-full w-1/2 cursor-pointer"
                    aria-label="Next card"
                >
                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
