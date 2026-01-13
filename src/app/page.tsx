import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import ContactSection from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';
import AnimatedSection from '@/components/animated-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 pb-24 md:pb-32">
          <AnimatedSection>
            <ProjectsSection />
          </AnimatedSection>
          <AnimatedSection>
            <ExperienceSection />
          </AnimatedSection>
          <AnimatedSection>
            <ContactSection />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
