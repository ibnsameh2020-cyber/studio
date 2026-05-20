
"use client";

import { useState } from 'react';
import { certificates } from '@/data/certificates';
import type { Certificate } from '@/lib/types';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import LinkedInBadge from '@/components/linkedin-badge';

const certificateCategories: Certificate['category'][] = [
    'Strategic Leadership & Governance',
    'Technical Licenses & Authorizations',
    'Digital Innovation & Analytics',
    'Professional Endorsements'
];

const allDisplayCategories = ['View All', ...certificateCategories];

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
    if (certificate.isLinkedInBadge) {
        return <LinkedInBadge />;
    }

    const certImage = PlaceHolderImages.find(img => img.id === certificate.imagePlaceholderId);
    
    const CardInner = (
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

    if (certificate.url) {
        return (
            <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                {CardInner}
            </a>
        );
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                {CardInner}
            </DialogTrigger>
            {certImage && (
                <DialogContent className="sm:max-w-4xl p-4 bg-background/80 backdrop-blur-lg">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{certificate.title}</DialogTitle>
                        <DialogDescription>
                            A high-resolution image of the {certificate.title} certificate from {certificate.issuer}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative aspect-[1.414] w-full"> {/* A4 paper approx aspect ratio */}
                        <Image
                            src={certImage.imageUrl}
                            alt={certificate.title}
                            fill
                            quality={100}
                            className="object-contain"
                        />
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};


export default function CertificatesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCertificates = searchTerm
        ? certificates.filter(cert =>
            cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.category.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : certificates;

    return (
        <div className="relative overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
                <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
                <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
                <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
                <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
                <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 relative">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold">Strategic Excellence & Technical Mastery</h1>
                    <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                        A comprehensive collection of my global certifications, manufacturer licenses, and professional endorsements in Digital Transformation and Healthcare IT.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-8 text-center">
                    <h2 className="text-xl font-headline font-semibold mb-4 text-primary">Highlights</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {topCertBadges.map(badge => (
                            <Badge key={badge} variant="secondary" className="text-sm py-1 px-3">{badge}</Badge>
                        ))}
                    </div>
                </div>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search certificates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10"
                        />
                    </div>
                </div>
                
                {searchTerm ? (
                    <div className="mt-8">
                        <h2 className="text-2xl font-headline font-bold text-center mb-4">Search Results</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCertificates.map(cert => (
                                <div key={cert.title}>
                                    <CertificateCard certificate={cert} />
                                </div>
                            ))}
                        </div>
                        {filteredCertificates.length === 0 && (
                            <p className="text-center text-muted-foreground mt-8">No results found for "{searchTerm}".</p>
                        )}
                    </div>
                ) : (
                    <Tabs defaultValue="View All" className="w-full">
                        <TabsList className="flex h-auto flex-wrap justify-center gap-2 mb-8 bg-transparent border-none p-0 shadow-none">
                            {allDisplayCategories.map(category => (
                                <TabsTrigger 
                                    key={category} 
                                    value={category} 
                                    className="whitespace-normal h-auto rounded-full border border-border/20 bg-card/50 text-foreground hover:bg-accent/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary/50"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="View All">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {certificates.map(cert => (
                                    <div key={cert.title}>
                                        <CertificateCard certificate={cert} />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        
                        {certificateCategories.map(category => (
                            <TabsContent key={category} value={category}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {certificates
                                        .filter(cert => cert.category === category)
                                        .map(cert => (
                                            <div key={cert.title}>
                                                <CertificateCard certificate={cert} />
                                            </div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}

            </div>
        </div>
    );
}
