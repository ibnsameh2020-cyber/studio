
import HeroSection from '@/components/sections/hero';
import ServicesSection from '@/components/sections/services';
import CertificatesSection from '@/components/sections/certificates';
import ProjectsSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import InsightsSection from '@/components/sections/articles';
import ExclusiveResourcesCtaSection from '@/components/sections/exclusive-resources-cta';
import AboutMeCtaSection from '@/components/sections/about-me-cta';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="certificates-section">
        <CertificatesSection />
      </div>
      <div id="case-studies">
        <ProjectsSection />
      </div>
      <div id="experience">
        <ExperienceSection />
      </div>
      <div id="insights">
        <InsightsSection />
      </div>
      <div id="exclusive-resources-cta">
        <ExclusiveResourcesCtaSection />
      </div>
      <div id="about-cta">
        <AboutMeCtaSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}
