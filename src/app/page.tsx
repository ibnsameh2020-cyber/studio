
import HeroSection from '@/components/sections/hero';
import ServicesSection from '@/components/sections/services';
import CertificatesSection from '@/components/sections/certificates';
import ProjectsSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import InsightsSection from '@/components/sections/articles';
import ExclusiveResourcesCtaSection from '@/components/sections/exclusive-resources-cta';
import AboutMeCtaSection from '@/components/sections/about-me-cta';
import ContactSection from '@/components/sections/contact';
import PinnedSection from '@/components/shared/pinned-section';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero doesn't pin, it scrolls naturally */}
      <HeroSection />

      {/* Layered Cards Stacking with increasing z-index */}
      <PinnedSection id="services" zIndex={10}>
        <ServicesSection />
      </PinnedSection>

      <PinnedSection id="certificates-section" zIndex={20}>
        <CertificatesSection />
      </PinnedSection>

      <PinnedSection id="case-studies" zIndex={30}>
        <ProjectsSection />
      </PinnedSection>

      <PinnedSection id="experience" zIndex={40}>
        <ExperienceSection />
      </PinnedSection>

      <PinnedSection id="insights" zIndex={50}>
        <InsightsSection />
      </PinnedSection>

      <PinnedSection id="exclusive-resources-cta" zIndex={60}>
        <ExclusiveResourcesCtaSection />
      </PinnedSection>

      <PinnedSection id="about-cta" zIndex={70}>
        <AboutMeCtaSection />
      </PinnedSection>

      <PinnedSection id="contact" zIndex={80} className="rounded-b-none">
        <ContactSection />
      </PinnedSection>
    </div>
  );
}
