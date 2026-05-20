'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { certificates } from '@/data/certificates';
import type { Certificate } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import LinkedInBadge from '@/components/linkedin-badge';

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
    if (certificate.isLinkedInBadge) {
        return <LinkedInBadge />;
    }

    const certImage = PlaceHolderImages.find(img => img.id === certificate.imagePlaceholderId);
    return (
        <Card className="h-full w-full flex flex-col bg-card/30 backdrop-blur-md border border-white/10 p-2 md:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl group cursor-pointer">
            {certImage && (
                <div className="relative aspect-video overflow-hidden rounded-md mb-2 bg-black/20">
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
                        <div className="absolute bottom-1 right-1 z-10 p-1 bg-background/50 backdrop-blur-sm rounded-full opacity-100 transition-opacity duration-300">
                            <ArrowUpRight className="w-3 h-3 text-primary" />
                        </div>
                    )}
                </div>
            )}
            <CardHeader className="p-0">
                <CardTitle className="font-headline text-[10px] md:text-lg leading-tight">{certificate.title}</CardTitle>
                <CardDescription className="text-[8px] md:text-sm">{certificate.issuer}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default function CertificatesSection() {
  const featuredCertificates = certificates.slice(0, 4);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto items-stretch">
            {featuredCertificates.map((cert) => (
                <div key={cert.title} data-reveal className="h-full">
                    {cert.isLinkedInBadge ? (
                        <LinkedInBadge />
                    ) : cert.url ? (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                            <CertificateCard certificate={cert} />
                        </a>
                    ) : (
                        <Link href="/certificates" className="block h-full">
                            <CertificateCard certificate={cert} />
                        </Link>
                    )}
                </div>
            ))}
        </div>
        <div data-reveal className="text-center mt-6 md:mt-12">
            <Link href="/certificates">
                <Button size="sm" className="group text-[10px] md:text-base py-1 px-3 md:py-2 md:px-8 h-auto md:h-11">
                    View All Credentials
                    <ArrowRight className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
    </div>
  );
}
