'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutMeCtaSection() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-portrait');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-300 hover:border-primary/80">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground inline-block">
              Beyond the Portfolio
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover the journey, philosophy, and strategic mindset that drive my work. Learn more about my evolution from engineering to strategic governance.
            </p>
            <Link href="/about">
              <Button size="lg" className="group">
                Read My Story
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-square max-w-xs mx-auto w-full">
            {aboutImage && (
              <div className="relative w-full h-full rounded-full shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
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
    </div>
  );
}
