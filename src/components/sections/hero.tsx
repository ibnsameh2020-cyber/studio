
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Trophy, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const sentences = [
    "Most transformations fail not because of poor strategy, but because of disconnected execution.",
    "As a strategic advisor for the government and healthcare sectors, I transform $120M+ portfolios from 'cost centers' into 'public value engines'.",
    "I use AI Governance, Value Engineering, and Human-Centric Leadership to bridge the gap."
];

const sideLogos = [
    "https://i.ibb.co/kzQmy89/70bee6de-6292-4040-bd78-4b8ed275e938-removalai-preview.png",
    "https://i.ibb.co/pBk2bKKy/536ae902-2fc5-4679-91e6-7af31fcbfea9-removalai-preview.png",
    "https://i.ibb.co/Rps1TB7f/rosmiman-Logo.png",
    "https://i.ibb.co/B202P1JK/R.png",
    "https://i.ibb.co/GvghpwsX/Method.png",
    "https://i.ibb.co/G4MnBprK/ESG.webp",
    "https://i.ibb.co/j9fm4yYz/Olympus-Corporation-logo-svg.png",
    "https://i.ibb.co/DgTk9pVf/KFMC.png"
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
  const heroRef = useRef<HTMLDivElement>(null);
  const ipmImage = PlaceHolderImages.find(img => img.id === 'cert-algorithmic-pmo');

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-32 pb-16">
      
      {/* Left-Side Vertical Logo Frame (Translucent Black Box) */}
      <div className="absolute top-1/2 -translate-y-[25%] left-8 lg:left-16 hidden lg:block z-30">
        <div className="h-[380px] w-64 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">
            {/* Integrated Header Label - Softened background and higher z-index to mask logos */}
            <div className="pt-6 pb-4 px-4 text-center bg-black/40 backdrop-blur-md z-20 border-b border-white/5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">You are in good company</p>
            </div>

            {/* Masking blurs - positioned correctly to mask logo entry/exit points */}
            <div className="absolute inset-x-0 top-[60px] h-12 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex-grow relative overflow-hidden z-0">
                <div className="flex flex-col animate-marquee-scroll-down">
                    {[...sideLogos, ...sideLogos].map((logo, idx) => (
                        <div key={idx} className="h-[130px] w-full flex items-center justify-center p-3">
                            <div className="relative w-48 h-24 bg-primary/30 backdrop-blur-sm border border-primary/50 rounded-2xl shadow-xl flex items-center justify-center transition-transform hover:scale-105 duration-300 p-4">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={logo}
                                        alt="Partner Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center animate-fade-in-up flex-grow justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-headline font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
          Strategy is Vision. Execution is Reality.
        </h1>
        <p className="text-xl sm:text-2xl md:text-4xl text-foreground font-headline mb-8 h-10 md:h-12">
            I Bridge the Gap.
        </p>
        
        <div className="w-full">
            <SwitchingHeroText />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/#services">
              <Button size="lg" className="group">
                Audit My Portfolio Strategy
                <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
              </Button>
            </Link>
            <Link href="/articles">
                <Button size="lg" variant="outline" className="group">
                    Explore My Manifesto
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>

        {/* Mobile/Tablet recognition badge - Enhanced Visibility */}
        <div className="mt-8 lg:hidden animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center gap-4 px-5 py-3 bg-primary/10 backdrop-blur-xl border border-primary/30 rounded-2xl hover:bg-primary/20 transition-all group shadow-2xl shadow-primary/5">
                        <div className="relative w-12 h-12 flex-shrink-0">
                             <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse"></div>
                             {ipmImage ? (
                                <Image src={ipmImage.imageUrl} alt="IPM" fill className="object-contain drop-shadow-md" />
                             ) : (
                                <div className="h-full w-full rounded-full bg-primary/20 flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-primary" />
                                </div>
                             )}
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">IPM Featured Author</p>
                            <p className="text-[12px] font-headline font-bold text-foreground uppercase tracking-tight leading-none">Global Recognition 2026</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary ml-2" />
                    </button>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 w-[95vw] h-[85vh] max-w-5xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>IPM Author Profile</DialogTitle>
                        <DialogDescription>Credential verification for Eng. Sameh Moussa.</DialogDescription>
                    </DialogHeader>
                    <iframe 
                        src="https://hub.instituteprojectmanagement.com/ipm-author-2026/same7mousa/" 
                        className="w-full h-full rounded-lg"
                        title="IPM Author Profile"
                    ></iframe>
                </DialogContent>
            </Dialog>
        </div>
      </div>
      
      {/* Right-Side Stack - Vertically Centered */}
      <div className="absolute top-1/2 -translate-y-1/2 right-8 lg:right-16 w-64 hidden lg:block z-30 space-y-4">
        {/* IPM Author Badge - Fully Visible Design */}
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer group relative bg-card/60 backdrop-blur-2xl border border-primary/40 rounded-2xl shadow-[0_0_50px_rgba(255,191,0,0.1)] overflow-hidden transition-all duration-500 hover:shadow-primary/30 hover:border-primary/80 hover:-translate-y-2 p-6 flex flex-col items-center">
                    {/* The Badge Visual - Visible and Striking */}
                    <div className="relative mb-4 w-28 h-28">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full border-2 border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 p-2 overflow-hidden">
                            {ipmImage ? (
                                <Image
                                    src={ipmImage.imageUrl}
                                    alt="IPM Badge Visual"
                                    fill
                                    className="object-contain drop-shadow-[0_0_15px_rgba(255,191,0,0.4)] transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <Trophy className="w-12 h-12 text-primary drop-shadow-[0_0_10px_rgba(255,191,0,0.6)]" />
                            )}
                        </div>
                        {/* Years Overlay */}
                        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[9px] font-bold px-2.5 py-1 rounded-full shadow-xl border border-background">
                            2026
                        </div>
                    </div>
                    
                    <div className="text-center space-y-1.5">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-2 duration-700">IPM Global Author</p>
                        <h3 className="text-sm font-headline font-bold text-foreground leading-tight">Institute of Project Management</h3>
                        <p className="text-[10px] text-muted-foreground italic">"The Algorithmic PMO"</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-primary/10 w-full flex items-center justify-center gap-2 text-[10px] text-primary font-bold uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">
                        Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 border-0 w-[90vw] h-[90vh] max-w-5xl bg-background/95 backdrop-blur-xl">
                <DialogHeader className="sr-only">
                    <DialogTitle>IPM Author Profile</DialogTitle>
                    <DialogDescription>Verification of IPM Author status for Eng. Sameh Moussa.</DialogDescription>
                </DialogHeader>
                <iframe 
                    src="https://hub.instituteprojectmanagement.com/ipm-author-2026/same7mousa/" 
                    className="w-full h-full rounded-lg"
                    title="IPM Author Profile"
                ></iframe>
            </DialogContent>
        </Dialog>

        {/* Current Role Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-primary/30 rounded-xl shadow-2xl shadow-primary/10 overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:border-primary/60 hover:-translate-y-1">
            <div className="bg-primary px-4 py-2">
                <h3 className="font-headline text-sm font-bold text-primary-foreground text-center tracking-wide">My Current Role</h3>
            </div>
            <div className="p-4">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Strategic Planning & PMO Advisor
                    <span className="block my-1.5 text-primary/50">·</span>
                    Driving Efficiency in Major Government Portfolios
                    <span className="block my-1.5 text-primary/50">·</span>
                    Digital Transformation & Governance
                </p>
            </div>
        </div>
      </div>

    </section>
  );
}
