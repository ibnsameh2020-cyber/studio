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
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-headline font-bold">Career Journey</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          My professional growth and key milestones over the years.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
        
        {experience.map((item, index) => (
          <div key={item.id} className="relative flex items-center justify-center mb-12 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Logic to alternate sides */}
            {index % 2 === 0 ? (
              <>
                {/* Content Side */}
                <div className="w-full md:w-1/2 md:pr-8 md:text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="bg-card/50 backdrop-blur-lg border border-border/30 w-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group hover:-translate-y-1">
                        <CardHeader>
                          <p className="text-sm text-primary mb-1">{item.date}</p>
                          <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                          <CardDescription>{item.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end">
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
                        <p className="text-sm text-foreground">{item.longDescription}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Spacer Side */}
                <div className="hidden md:block w-1/2 pl-8"></div>
              </>
            ) : (
              <>
                {/* Spacer Side */}
                <div className="hidden md:block w-1/2 pr-8"></div>
                {/* Content Side */}
                <div className="w-full md:w-1/2 md:pl-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="bg-card/50 backdrop-blur-lg border border-border/30 w-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group hover:-translate-y-1">
                        <CardHeader>
                          <p className="text-sm text-primary mb-1">{item.date}</p>
                          <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                          <CardDescription>{item.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                        <CardFooter>
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
                        <p className="text-sm text-foreground">{item.longDescription}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
