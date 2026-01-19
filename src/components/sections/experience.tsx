
import { experience } from '@/data/experience';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Briefcase, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TimelineItem from './timeline-item';

const ExperienceCard = ({ item, alignment = 'right' }: { item: typeof experience[0], alignment?: 'left' | 'right' }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card/50 backdrop-blur-lg border border-border/30 w-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group hover:-translate-y-1">
          <CardHeader className={`md:items-${alignment === 'left' ? 'start' : 'end'} flex-row md:flex-col items-start gap-4`}>
              <div>
                  <CardTitle className={`font-headline text-lg md:text-xl text-left md:text-${alignment}`}>{item.title}</CardTitle>
                  <CardDescription className={`text-left md:text-${alignment}`}>{item.company}</CardDescription>
              </div>
              <p className={`text-sm text-primary mb-1 text-right flex-shrink-0 md:text-${alignment}`}>{item.date}</p>
          </CardHeader>
          <CardContent>
            <p className={`text-sm text-muted-foreground text-left md:text-${alignment}`}>{item.description}</p>
          </CardContent>
          <CardFooter className={`flex md:justify-${alignment === 'left' ? 'start' : 'end'}`}>
              <div className="flex items-center text-sm text-primary group-hover:underline">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{item.title}</DialogTitle>
          <DialogDescription>
            {item.company} | {item.date}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-foreground animate-fade-in-up">{item.longDescription}</p>
        </div>
      </DialogContent>
    </Dialog>
);


export default function ExperienceSection() {
  return (
    <div id="experience" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-headline font-bold">Career Journey</h2>
                <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                My professional growth and key milestones over the years.
                </p>
            </div>
            <div className="relative max-w-5xl mx-auto md:p-0 px-4">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:hidden"></div>
                
                {experience.map((item, index) => (
                <TimelineItem
                    key={item.id}
                    align={index % 2 === 0 ? 'left' : 'right'}
                    isFirst={index === 0}
                    isLast={index === experience.length - 1}
                >
                    <div className="relative flex md:items-center mb-12">
                    
                    {/* Mobile View: Icon on left, card on right */}
                    <div className="md:hidden flex items-start w-full">
                        <div className="absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                            <Briefcase className="w-4 h-4 text-primary-foreground" />
                        </div>
                        </div>
                        <div className="pl-12 w-full">
                        <ExperienceCard item={item} />
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:flex w-full items-center">
                        {index % 2 === 0 ? (
                        // Left side card
                        <div className="w-full flex justify-end">
                            <div className="w-1/2 pr-16">
                            <ExperienceCard item={item} alignment="right" />
                            </div>
                            <div className="w-1/2"></div>
                        </div>
                        ) : (
                        // Right side card
                        <div className="w-full flex justify-start">
                            <div className="w-1/2"></div>
                            <div className="w-1/2 pl-16">
                            <ExperienceCard item={item} alignment="left" />
                            </div>
                        </div>
                        )}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                            <Briefcase className="w-4 h-4 text-primary-foreground" />
                        </div>
                        </div>
                    </div>
                    </div>
                </TimelineItem>
                ))}
            </div>
        </section>
    </div>
  );
}
