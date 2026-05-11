
'use client';

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
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Observer for contact section to activate the 'Contact' label in header
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(new CustomEvent('section-active', { detail: { sectionId: 'contact' } }));
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    // ScrollTrigger to clear active section when returning to Hero (top of page)
    const heroTrigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      onEnterBack: () => {
        window.dispatchEvent(new CustomEvent('section-active', { detail: { sectionId: null } }));
      },
      // Ensure it clears if the page loads or refreshes at the very top
      onRefresh: (self) => {
        if (self.progress === 0 && self.direction === -1) {
          window.dispatchEvent(new CustomEvent('section-active', { detail: { sectionId: null } }));
        }
      }
    });

    return () => {
      observer.disconnect();
      heroTrigger.kill();
    };
  }, []);

  const chapters = [
    { 
      id: 'services', 
      component: (
        <>
          <div data-reveal className="mb-12"><ExpertiseHeader /></div>
          <ServicesSection />
        </>
      )
    },
    { 
      id: 'engagement', 
      component: (
        <>
          <div data-reveal className="mb-12"><EngagementHeader /></div>
          <EngagementSection />
        </>
      )
    },
    { 
      id: 'certificates-section', 
      component: (
        <>
          <div data-reveal className="mb-6"><CertificatesHeader /></div>
          <CertificatesSection />
        </>
      )
    },
    { 
      id: 'case-studies', 
      component: (
        <>
          <div data-reveal className="mb-6"><ProjectsHeader /></div>
          <ProjectsSection />
        </>
      )
    },
    { 
      id: 'global', 
      component: (
        <>
          <div data-reveal className="mb-12"><GlobalExpertiseHeader /></div>
          <GlobalExpertiseCompetencies />
        </>
      )
    },
    { 
      id: 'experience', 
      component: (
        <>
          <div data-reveal className="mb-4"><ExperienceHeader /></div>
          <ExperienceSection />
        </>
      )
    },
    { 
      id: 'insights', 
      component: <InsightsSection /> 
    },
    { 
      id: 'exclusive-resources-cta', 
      component: <ExclusiveResourcesCtaSection /> 
    },
    {
      id: 'about-cta',
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
                <div id="contact" ref={contactRef}>
                    <ContactSection />
                </div>
            </AnimatedSection>
            
            <ClientLogosSection />
        </div>
    </div>
  );
}
