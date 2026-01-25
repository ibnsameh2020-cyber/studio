'use client';

import AnimatedSection from '../animated-section';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { certificates } from '@/data/certificates';
import type { Certificate } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const topCertBadges = [
    'KPI Professional (KPIP)',
    'ITIL 4 Leader: Digital & IT Strategy',
    'Certified PMO Professional',
    'CPHIMS',
    'HL7® FHIR® Fundamentals',
    'COBIT 5 Foundation',
    'CNSS',
    'Big Data Analytics',
];

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
    const certImage = PlaceHolderImages.find(img => img.id === certificate.imagePlaceholderId);
    return (
        <Card className="h-full w-full flex flex-col bg-card/30 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group cursor-pointer">
            {certImage && (
                <div className="relative aspect-video overflow-hidden rounded-md mb-4">
                     <Image
                        src={certImage.imageUrl}
                        alt={certificate.title}
                        fill
                        data-ai-hint={certImage.imageHint}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
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
  const featuredCertificates = certificates.slice(0, 3);

  return (
    <section id="certificates-section" className="py-20 md:py-32">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-headline font-bold">Strategic Excellence & Technical Mastery</h2>
                    <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                        A comprehensive collection of my global certifications, manufacturer licenses, and professional endorsements in Digital Transformation and Healthcare IT.
                    </p>
                </div>
            </AnimatedSection>
            
            <AnimatedSection>
                <div className="max-w-4xl mx-auto mb-8 text-center">
                    <h3 className="text-xl font-headline font-semibold mb-4 text-primary">Highlights</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {topCertBadges.map(badge => (
                            <Badge key={badge} variant="secondary" className="text-sm py-1 px-3">{badge}</Badge>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredCertificates.map((cert, index) => (
                    <AnimatedSection key={cert.title} style={{ animationDelay: `${index * 150}ms` }}>
                        <Link href="/certificates">
                            <CertificateCard certificate={cert} />
                        </Link>
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
    </section>
  );
}
