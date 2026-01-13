import { experience } from '@/data/experience';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section id="experience">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-headline font-bold">Career Journey</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          My professional growth and key milestones over the years.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
        
        {experience.map((item, index) => (
          <div key={item.id} className="relative flex items-center justify-center mb-12">
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
              <Card className="bg-card/50 backdrop-blur-lg border border-border/30 w-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <p className="text-sm text-primary mb-1">{item.date}</p>
                  <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>

             {/* Spacer for mobile */}
             <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
