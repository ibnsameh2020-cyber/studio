
import AboutMeCtaSection from '@/components/sections/about-me-cta';
import ContactSection from '@/components/sections/contact';
import ExclusiveResourcesCtaSection from '@/components/sections/exclusive-resources-cta';
import ExperienceSection from '@/components/sections/experience';
import HeroSection from '@/components/sections/hero';
import InsightsSection from '@/components/sections/articles';
import ProjectsSection from '@/components/sections/projects';
import ServicesSection from '@/components/sections/services';
import CertificatesSection from '@/components/sections/certificates';
import ExpertiseHeader from '@/components/sections/expertise-header';
import EngagementSection from '@/components/sections/engagement';
import EngagementHeader from '@/components/sections/engagement-header';
import { cn } from '@/lib/utils';

export default function Home() {
  const sections = [
    { id: 'expertise-header', component: <ExpertiseHeader /> },
    { id: 'services', component: <ServicesSection /> },
    { id: 'engagement-header', component: <EngagementHeader /> },
    { id: 'engagement', component: <EngagementSection /> },
    { id: 'certificates', component: <CertificatesSection /> },
    { id: 'case-studies', component: <ProjectsSection /> },
    { id: 'experience', component: <ExperienceSection /> },
    { id: 'insights', component: <InsightsSection /> },
    { id: 'exclusive-resources-cta', component: <ExclusiveResourcesCtaSection /> },
    { id: 'about-cta', component: <AboutMeCtaSection /> },
    { id: 'contact', component: <ContactSection /> },
  ];

  return (
    <div className="relative overflow-clip">
        {/* Fixed Animated Background - Signature Blobs */}
        <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
          <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
          <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
          <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
          <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
          <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
        </div>

        {/* Hero Section - Foundation */}
        <div className="relative z-10">
          <HeroSection />
        </div>

        {/* Layered Stacking Sections */}
        <div className="relative z-20">
          {sections.map((section, index) => (
            <section 
              key={section.id} 
              id={section.id}
              className={cn(
                "relative w-full -mt-20 pt-20", // Negative margin creates the overlap
                "bg-background border-t border-white/10 rounded-t-[40px] md:rounded-t-[60px]",
                "shadow-[0_-30px_60px_rgba(0,0,0,0.3)] transition-all duration-500"
              )}
              style={{ zIndex: (index + 1) * 10 }}
            >
              <div className="w-full">
                {section.component}
              </div>
            </section>
          ))}
        </div>
    </div>
  );
}
