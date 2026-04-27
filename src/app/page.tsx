import AboutMeCtaSection from '@/components/sections/about-me-cta';
import ContactSection from '@/components/sections/contact';
import ClientLogosSection from '@/components/sections/client-logos';
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
import ExpertiseHeader from '@/components/sections/expertise-header';
import EngagementSection from '@/components/sections/engagement';
import EngagementHeader from '@/components/sections/engagement-header';
import GlobalExpertiseHeader from '@/components/sections/global-expertise-header';
import GlobalExpertiseCompetencies from '@/components/sections/global-expertise-competencies';
import SequentialStage from '@/components/sequential-stage';
import AnimatedSection from '@/components/animated-section';

export default function Home() {
  const chapters = [
    { 
      id: 'chapter-expertise', 
      component: (
        <>
          <div data-reveal className="mb-12"><ExpertiseHeader /></div>
          <ServicesSection />
        </>
      )
    },
    { 
      id: 'chapter-engagement', 
      component: (
        <>
          <div data-reveal className="mb-12"><EngagementHeader /></div>
          <EngagementSection />
        </>
      )
    },
    { 
      id: 'chapter-certificates', 
      component: (
        <>
          <div data-reveal className="mb-12"><CertificatesHeader /></div>
          <CertificatesSection />
        </>
      )
    },
    { 
      id: 'chapter-success-stories', 
      component: (
        <>
          <div data-reveal className="mb-12"><ProjectsHeader /></div>
          <ProjectsSection />
        </>
      )
    },
    { 
      id: 'chapter-global', 
      component: (
        <>
          <div data-reveal className="mb-12"><GlobalExpertiseHeader /></div>
          <GlobalExpertiseCompetencies />
        </>
      )
    },
    { 
      id: 'chapter-experience', 
      component: (
        <>
          <div data-reveal className="mb-12"><ExperienceHeader /></div>
          <ExperienceSection />
        </>
      )
    },
    { 
      id: 'chapter-insights', 
      component: <InsightsSection /> 
    },
    { 
      id: 'chapter-resources', 
      component: <ExclusiveResourcesCtaSection /> 
    }
  ];

  return (
    <div className="relative">
        <HeroSection />

        <div className="relative z-20">
          {chapters.map((chapter, index) => (
            <SequentialStage 
              key={chapter.id} 
              id={chapter.id} 
              index={index}
            >
              {chapter.component}
            </SequentialStage>
          ))}
        </div>

        {/* Unified Ground Floor: Connected About + Contact + Logos */}
        <div id="footer-area" className="relative z-30 bg-background pt-32 pb-16 space-y-32">
            <AnimatedSection>
                <AboutMeCtaSection />
            </AnimatedSection>
            <AnimatedSection>
                <div id="contact">
                    <ContactSection />
                </div>
            </AnimatedSection>
            <AnimatedSection>
                <ClientLogosSection />
            </AnimatedSection>
        </div>
    </div>
  );
}
