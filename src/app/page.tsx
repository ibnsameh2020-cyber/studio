

import HeroSection from '@/components/sections/hero';
import AnimatedSection from '@/components/animated-section';
import InsightsSection from '@/components/sections/articles';
import AboutMeCtaSection from '@/components/sections/about-me-cta';
import ExclusiveResourcesCtaSection from '@/components/sections/exclusive-resources-cta';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold">My Expertise</h2>
                    <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    I help visionary leaders bridge the gap between strategy and execution, transforming cost centers into value engines.
                    </p>
                    <Link href="/services" className="inline-block mt-6">
                        <Button size="lg" className="group">
                            Explore My Services
                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </AnimatedSection>
            <AnimatedSection>
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold">Featured Success Stories</h2>
                    <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    A deep dive into how I've delivered value and driven results in my key projects.
                    </p>
                    <Link href="/projects" className="inline-block mt-6">
                        <Button size="lg" className="group">
                            View Case Studies
                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </AnimatedSection>
            <InsightsSection />
            <ExclusiveResourcesCtaSection />
            <AboutMeCtaSection />
             <AnimatedSection>
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary inline-block">
                        Ready to Turn Strategy into Reality?
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                        I partner with visionary leaders to build resilient PMOs and drive digital transformation. Tell me about your next milestone.
                    </p>
                    <Link href="/contact" className="inline-block mt-6">
                        <Button size="lg" className="group">
                            Get In Touch
                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
