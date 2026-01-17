

import HeroSection from '@/components/sections/hero';
import CaseStudiesSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import ContactSection from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';
import AnimatedSection from '@/components/animated-section';
import InsightsSection from '@/components/sections/articles';
import { ServicesSection } from './services/page';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 z-0 -mx-28">
          <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
          <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
          <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
          <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
          <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
          <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
        </div>
        <HeroSection />
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 pb-24 md:pb-32">
            <AnimatedSection>
              <ServicesSection />
            </AnimatedSection>
            <CaseStudiesSection />
            <AnimatedSection>
              <ExperienceSection />
            </AnimatedSection>
            <InsightsSection />
            <AnimatedSection>
              <ContactSection />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
