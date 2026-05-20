'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import LinkedInBadge from '@/components/linkedin-badge';

export default function AboutMeCtaSection() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-portrait');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8 items-stretch max-w-7xl mx-auto">
        {/* Big About Me Card */}
        <div className="lg:col-span-3 bg-card/40 backdrop-blur-md border border-border/20 rounded-2xl p-6 md:p-12 shadow-2xl transition-all duration-300 hover:border-primary/50 flex flex-col justify-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
                <div className="md:col-span-3 space-y-4 md:space-y-6 text-center md:text-left order-2 md:order-1">
                    <h2 className="text-2xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground inline-block leading-tight">
                    Beyond the Portfolio
                    </h2>
                    {/* Hiding paragraph on mobile to ensure layout fits perfectly */}
                    <p className="hidden md:block text-base md:text-lg text-muted-foreground leading-relaxed">
                    Discover the journey, philosophy, and strategic mindset that drive my work. Learn more about my evolution from engineering to strategic governance.
                    </p>
                    <div className="pt-2 md:pt-0">
                      <Link href="/about">
                        <Button size="lg" className="group h-10 md:h-11 px-6 text-sm md:text-base">
                            Read My Story
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                </div>
                <div className="md:col-span-2 relative aspect-square max-w-[140px] md:max-w-xs mx-auto w-full order-1 md:order-2">
                    {aboutImage && (
                    <div className="relative w-full h-full rounded-full shadow-[0_0_40px_0px_hsl(var(--primary)/0.4)] md:shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
                        <Image
                            src={aboutImage.imageUrl}
                            alt="Eng. Sameh Moussa"
                            fill
                            quality={100}
                            data-ai-hint={aboutImage.imageHint}
                            className="object-contain drop-shadow-xl"
                        />
                    </div>
                    )}
                </div>
            </div>
        </div>

        {/* LinkedIn Badge Card */}
        <div className="lg:col-span-1 min-h-[300px] md:min-h-full">
            <LinkedInBadge />
        </div>
      </div>
    </div>
  );
}
