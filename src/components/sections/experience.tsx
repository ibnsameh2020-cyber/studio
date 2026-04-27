
"use client";

import { experience } from '@/data/experience';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, Briefcase } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

export default function ExperienceSection() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative pt-4 md:pt-8">
        <div className="absolute top-[30px] md:top-[40px] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent hidden lg:block rounded-full"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 items-stretch relative z-10">
          {experience.map((item) => (
            <div key={item.id} data-reveal className="relative flex flex-col pt-2 md:pt-12">
              <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 z-20 flex-col items-center">
                <div className="h-6 w-6 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_rgba(255,191,0,0.6)] animate-pulse"></div>
                <div className="h-12 w-0.5 bg-gradient-to-b from-primary to-transparent mt-2"></div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Card className={cn(
                    "h-full bg-card/40 backdrop-blur-md border border-border/20 shadow-xl p-3 md:p-6 flex flex-col items-center text-center",
                    "transition-all duration-300 hover:border-primary/50 hover:shadow-2xl cursor-pointer group min-h-[140px] md:min-h-[250px]"
                  )}>
                    <CardHeader className="p-0 flex-grow">
                      <div className="flex justify-center mb-1 md:mb-4">
                        <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Briefcase className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                      </div>
                      <CardTitle className="text-[10px] md:text-base font-headline leading-tight group-hover:text-primary transition-colors mb-0.5 md:mb-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-[8px] md:text-xs font-medium text-foreground/80 italic mb-0.5 md:mb-2">
                        {item.company}
                      </CardDescription>
                      <p className="text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-widest">{item.date}</p>
                    </CardHeader>
                    <CardFooter className="p-0 mt-2 md:mt-6 flex justify-center">
                      <div className="flex items-center text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-tighter group-hover:underline">
                        View Impact
                        <ArrowRight className="w-2 h-2 md:w-3 md:h-3 ml-1" />
                      </div>
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20 w-[95vw] max-h-[90vh] overflow-y-auto p-3 md:p-6">
                  <DialogHeader>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1 bg-primary/10 rounded-xl shrink-0"><Briefcase className="w-4 h-4 text-primary" /></div>
                      <div>
                        <DialogTitle className="text-xs md:text-2xl font-headline text-primary leading-tight">{item.title}</DialogTitle>
                        <p className="text-[9px] md:text-sm text-muted-foreground">{item.company} | {item.date}</p>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="py-2 border-t border-border/50">
                    <p className="text-[10px] md:text-lg text-muted-foreground leading-tight md:leading-relaxed">{item.longDescription}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
