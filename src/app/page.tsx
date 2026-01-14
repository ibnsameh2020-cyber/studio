
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import ContactSection from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';
import AnimatedSection from '@/components/animated-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 z-0 -mx-28 overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
          <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
          <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
        </div>
        <div className="relative z-10">
          <HeroSection />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 pb-24 md:pb-32">
            <ProjectsSection />
            <AnimatedSection>
              <ExperienceSection />
            </AnimatedSection>
            <AnimatedSection>
              <ContactSection />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
