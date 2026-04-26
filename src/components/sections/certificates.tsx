
'use client';

import AnimatedSection from '../animated-section';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { certificates } from '@/data/certificates';
import type { Certificate } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
    const certImage = PlaceHolderImages.find(img => img.id === certificate.imagePlaceholderId);
    return (
        <Card className="h-full w-full flex flex-col bg-card/30 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group cursor-pointer">
            {certImage && (
                <div className="relative aspect-video overflow-hidden rounded-md mb-4 bg-black/20">
                     <Image
                        src={certImage.imageUrl}
                        alt={certificate.title}
                        fill
                        data-ai-hint={certImage.imageHint}
                        className={cn(
                            "transition-transform duration-300 group-hover:scale-105",
                            certificate.url ? 'object-contain' : 'object-cover'
                        )}
                    />
                    {certificate.url && (
                        <div className="absolute bottom-2 right-2 z-10 p-1.5 bg-background/50 backdrop-blur-sm rounded-full opacity-100 transition-opacity duration-300">
                            <ArrowUpRight className="w-4 h-4 text-primary" />
                        </div>
                    )}
                </div>
            )}
            <CardHeader className="p-0">
                <CardTitle className="font-headline text-lg">{certificate.title}</CardTitle>
                <CardDescription>{certificate.issuer}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default function CertificatesSection() {
  // Only show the top 3 featured certificates on the home page grid card
  const featuredCertificates = certificates.slice(0, 3);

  return (
    <div className="py-24">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredCertificates.map((cert, index) => (
                    <AnimatedSection key={cert.title} style={{ animationDelay: `${index * 150}ms` }}>
                        {cert.url ? (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                <CertificateCard certificate={cert} />
                            </a>
                        ) : (
                            <Link href="/certificates">
                                <CertificateCard certificate={cert} />
                            </Link>
                        )}
                    </AnimatedSection>
                ))}
            </div>

            <AnimatedSection>
                <div className="text-center mt-12">
                    <Link href="/certificates">
                        <Button size="lg" className="group">
                            View All Credentials
                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </AnimatedSection>
       </div>
    </div>
  );
}
