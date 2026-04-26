
"use client";

import { experience } from '@/data/experience';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Briefcase } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AnimatedSection from '../animated-section';

const ExperienceCard = ({ item }: { item: typeof experience[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer group min-h-[280px]">
          <div className="mb-6 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
            <Briefcase className="w-6 h-6" />
          </div>
          <CardHeader className="p-0 flex-grow">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{item.date}</p>
              <CardTitle className="text-base font-headline leading-tight group-hover:text-primary transition-colors mb-2">
                {item.title}
              </CardTitle>
              <CardDescription className="text-sm font-medium text-foreground/80 italic">
                {item.company}
              </CardDescription>
          </CardHeader>
          <CardFooter className="p-0 mt-6 flex justify-center">
              <div className="flex items-center text-xs font-semibold text-primary uppercase tracking-tighter group-hover:underline">
                  Details
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
);


export default function ExperienceSection() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {experience.map((item, index) => (
            <AnimatedSection key={item.id} style={{ animationDelay: `${index * 150}ms` }}>
              <ExperienceCard item={item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
