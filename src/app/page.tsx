
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
          <div data-reveal className="mb-6"><CertificatesHeader /></div>
          <CertificatesSection />
        </>
      )
    },
    { 
      id: 'chapter-success-stories', 
      component: (
        <>
          <div data-reveal className="mb-6"><ProjectsHeader /></div>
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
          <div data-reveal className="mb-4"><ExperienceHeader /></div>
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
    },
    {
      id: 'chapter-about',
      component: <AboutMeCtaSection />
    }
  ];

  return (
    <div className="relative">
        {/* Global Fixed Atmospheric Background - Visible everywhere including Contact */}
        <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/4 h-[40rem] w-[40rem] bg-primary/20 rounded-full blur-[100px] animate-blob-2"></div>
            <div className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] bg-accent/20 rounded-full blur-[100px] animate-blob-1"></div>
            <div className="absolute -bottom-1/4 right-1/4 h-[35rem] w-[35rem] bg-primary/10 rounded-full blur-[100px] animate-blob-3"></div>
            <div className="absolute bottom-0 left-1/3 h-[25rem] w-[25rem] bg-accent/10 rounded-full blur-[100px] animate-blob-4"></div>
            <div className="absolute top-1/4 right-1/3 h-[28rem] w-[28rem] bg-primary/15 rounded-full blur-[100px] animate-blob-5"></div>
            <div className="absolute bottom-1/3 left-1/4 h-[32rem] w-[32rem] bg-accent/15 rounded-full blur-[100px] animate-blob-6"></div>
        </div>

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

        {/* Unified Ground Floor: No border, Transparent to show fixed bubble bg */}
        <div id="footer-area" className="relative z-30 bg-transparent pt-32 pb-16 space-y-32">
            <AnimatedSection>
                <div id="contact">
                    <ContactSection />
                </div>
            </AnimatedSection>
            
            <ClientLogosSection />
        </div>
    </div>
  );
}
