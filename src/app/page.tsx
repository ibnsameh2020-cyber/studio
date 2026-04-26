
import AboutMeCtaSection from '@/components/sections/about-me-cta';
import ContactSection from '@/components/sections/contact';
import ExclusiveResourcesCtaSection from '@/components/sections/exclusive-resources-cta';
import ExperienceSection from '@/components/sections/experience';
import ExperienceHeader from '@/components/sections/experience-header';
import HeroSection from '@/components/sections/hero';
import InsightsSection from '@/components/sections/articles';
import ProjectsSection from '@/components/sections/projects';
import ProjectsHeader from '@/components/sections/projects-header';
import ServicesSection from '@/components/sections/services';
import CertificatesSection from '@/components/sections/certificates';
import CertificatesHeader from '@/components/sections/certificates-header';
import CertificatesHighlights from '@/components/sections/certificates-highlights';
import ExpertiseHeader from '@/components/sections/expertise-header';
import EngagementSection from '@/components/sections/engagement';
import EngagementHeader from '@/components/sections/engagement-header';
import GlobalExpertiseHeader from '@/components/sections/global-expertise-header';
import GlobalExpertiseCompetencies from '@/components/sections/global-expertise-competencies';
import SequentialStage from '@/components/sequential-stage';

export default function Home() {
  const sections = [
    { id: 'expertise-header', component: <ExpertiseHeader /> },
    { id: 'services', component: <ServicesSection /> },
    { id: 'engagement-header', component: <EngagementHeader /> },
    { id: 'engagement', component: <EngagementSection /> },
    { id: 'certificates-header', component: <CertificatesHeader /> },
    { id: 'certificates-highlights', component: <CertificatesHighlights /> },
    { id: 'certificates-grid', component: <CertificatesSection /> },
    { id: 'case-studies-header', component: <ProjectsHeader /> },
    { id: 'case-studies-grid', component: <ProjectsSection /> },
    { id: 'global-expertise-header', component: <GlobalExpertiseHeader /> },
    { id: 'global-expertise-competencies', component: <GlobalExpertiseCompetencies /> },
    { id: 'experience-header', component: <ExperienceHeader /> },
    { id: 'experience-grid', component: <ExperienceSection /> },
    { id: 'insights', component: <InsightsSection /> },
    { id: 'exclusive-resources-cta', component: <ExclusiveResourcesCtaSection /> },
    { id: 'about-cta', component: <AboutMeCtaSection /> },
    { id: 'contact', component: <ContactSection /> },
  ];

  return (
    <div className="relative">
        {/* Foundation Hero */}
        <HeroSection />

        {/* Sequential Stages */}
        <div className="relative z-20">
          {sections.map((section, index) => (
            <SequentialStage 
              key={section.id} 
              id={section.id} 
              index={index}
            >
              {section.component}
            </SequentialStage>
          ))}
        </div>
    </div>
  );
}
