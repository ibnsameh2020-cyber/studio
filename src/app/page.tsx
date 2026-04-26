import AboutMeCtaSection from '@/components/sections/about-me-cta';
import ContactSection from '@/components/sections/contact';
import ExclusiveResourcesCtaSection from '@/components/sections/exclusive-resources-cta';
import ExperienceSection from '@/components/sections/experience';
import HeroSection from '@/components/sections/hero';
import InsightsSection from '@/components/sections/articles';
import ProjectsSection from '@/components/sections/projects';
import ServicesSection from '@/components/sections/services';
import CertificatesSection from '@/components/sections/certificates';
import PinnedSection from '@/components/shared/pinned-section';

export default function Home() {
  return (
    <div className="relative">
        {/* Global Fixed Background Blobs */}
        <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
          <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
          <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
          <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
          <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
          <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
        </div>

        {/* Hero Section acts as the base layer */}
        <div className="relative z-0">
          <HeroSection />
        </div>

        {/* Stacking Card Sequence */}
        <PinnedSection index={1}><ServicesSection /></PinnedSection>
        <PinnedSection index={2}><CertificatesSection /></PinnedSection>
        <PinnedSection index={3}><ProjectsSection /></PinnedSection>
        <PinnedSection index={4}><ExperienceSection /></PinnedSection>
        <PinnedSection index={5}><InsightsSection /></PinnedSection>
        <PinnedSection index={6}><ExclusiveResourcesCtaSection /></PinnedSection>
        <PinnedSection index={7}><AboutMeCtaSection /></PinnedSection>
        
        {/* Contact section forms the final card */}
        <div className="relative z-[100] bg-background border-t border-white/10 rounded-t-[40px] shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.5)] pt-20">
            <ContactSection />
        </div>
    </div>
  );
}
