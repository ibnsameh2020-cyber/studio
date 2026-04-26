
"use client";

import { experience } from '@/data/experience';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Briefcase, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AnimatedSection from '../animated-section';
import { cn } from '@/lib/utils';

const ExperienceNode = ({ item, isLast }: { item: typeof experience[0], isLast: boolean }) => (
    <div className="relative flex flex-col items-center">
        {/* The Timeline Node */}
        <div className="relative z-10 mb-8">
            <div className="h-14 w-14 rounded-full bg-background border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-6 h-6" />
            </div>
            {/* The Date Badge above node */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.date}</span>
            </div>
        </div>

        {/* The Card */}
        <Dialog>
            <DialogTrigger asChild>
                <Card className="w-full max-w-[280px] bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer group min-h-[220px]">
                    <CardHeader className="p-0 flex-grow">
                        <CardTitle className="text-base font-headline leading-tight group-hover:text-primary transition-colors mb-2">
                            {item.title}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-foreground/80 italic">
                            {item.company}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-0 mt-6 flex justify-center">
                        <div className="flex items-center text-xs font-semibold text-primary uppercase tracking-tighter group-hover:underline">
                            View Impact
                            <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardFooter>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-primary/10 rounded-xl"><Briefcase className="w-6 h-6 text-primary" /></div>
                        <div>
                            <DialogTitle className="text-2xl font-headline text-primary">{item.title}</DialogTitle>
                            <p className="text-sm text-muted-foreground">{item.company} | {item.date}</p>
                        </div>
                    </div>
                </DialogHeader>
                <div className="py-6 border-t border-border/50">
                    <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-up">{item.longDescription}</p>
                </div>
            </DialogContent>
        </Dialog>

        {/* Horizontal Connector Line (Desktop Only) */}
        {!isLast && (
            <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-gradient-to-r from-primary to-primary/20 z-0"></div>
        )}
    </div>
);

export default function ExperienceSection() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timeline Container */}
        <div className="relative">
            {/* Main Horizontal Line - Subtle Background Line */}
            <div className="hidden lg:block absolute top-7 left-0 w-full h-px bg-border/20 z-0"></div>
            
            {/* Grid for items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 max-w-7xl mx-auto items-start">
                {experience.map((item, index) => (
                    <AnimatedSection key={item.id} style={{ animationDelay: `${index * 150}ms` }}>
                        <ExperienceNode 
                            item={item} 
                            isLast={index === experience.length - 1} 
                        />
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
