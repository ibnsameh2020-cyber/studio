
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

export default function ExperienceSection() {
  return (
    <section id="experience">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold">Career Journey</h2>
        <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          My professional growth and key milestones over the years.
        </p>
      </div>
      <div className="relative md:p-0 px-4">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2"></div>
        
        {experience.map((item, index) => (
          <div key={item.id} className="relative flex items-start md:items-center md:justify-center mb-12" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Mobile View: Icon on left, card on right */}
            <div className="md:hidden flex items-start w-full">
              <div className="absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div className="pl-12 w-full">
                {/* Re-usable Card Component */}
                <ExperienceCard item={item} />
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex md:w-full md:items-center">
              {/* Logic to alternate sides */}
              {index % 2 === 0 ? (
                <>
                  {/* Content Side */}
                  <div className="w-full md:w-1/2 md:pr-8 md:text-right">
                    <ExperienceCard item={item} />
                  </div>
                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                      <Briefcase className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  {/* Spacer Side */}
                  <div className="hidden md:block w-1/2 pl-8"></div>
                </>
              ) : (
                <>
                  {/* Spacer Side */}
                  <div className="hidden md:block w-1/2 pr-8"></div>
                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                      <Briefcase className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  {/* Content Side */}
                  <div className="w-full md:w-1/2 md:pl-8">
                    <ExperienceCard item={item} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ExperienceCard = ({ item }: { item: typeof experience[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card/50 backdrop-blur-lg border border-border/30 w-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group hover:-translate-y-1">
          <CardHeader className="md:items-end flex-row md:flex-col items-start gap-4">
              <div>
                  <CardTitle className="font-headline text-lg md:text-xl text-left md:text-inherit">{item.title}</CardTitle>
                  <CardDescription className="text-left md:text-inherit">{item.company}</CardDescription>
              </div>
              <p className="text-sm text-primary mb-1 text-right md:text-inherit flex-shrink-0">{item.date}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-left md:text-inherit">{item.description}</p>
          </CardContent>
          <CardFooter className="flex md:justify-end">
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
