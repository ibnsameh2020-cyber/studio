"use client";

import { Button } from '@/components/ui/button';
import { Mail, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactSection() {
  
  const clientLogos = [
    {
      name: 'Saudi Irrigation Organization',
      logo: (
        <div className="relative w-40 h-40">
          <Image
            src="https://i0.wp.com/new-24.net/wp-content/uploads/2020/10/%D8%A7%D9%84%D8%B1%D9%89.png?fit=827%2C827&ssl=1"
            alt="Saudi Irrigation Organization Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      name: 'Salehiya',
      logo: (
        <div className="relative w-40 h-40">
          <Image
            src="https://i.ibb.co/Cptfs8Df/d28f4af5-6a73-482d-9161-94a56db6b1bf-removalai-preview.png"
            alt="Salehiya Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      name: 'Rosmiman®',
      logo: (
        <div className="relative w-40 h-16">
          <Image
            src="https://rosmiman.com/wp-content/uploads/2019/09/logo_new.png"
            alt="Rosmiman Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      name: 'Repotech',
      logo: (
        <div className="relative w-40 h-16">
          <Image
            src="https://i.ibb.co/XxLMZTyf/6fc6bfab-28d0-465a-830c-b5234bb1da2e-removalai-preview.png"
            alt="Repotech Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 h-full w-full bg-transparent"
          style={{
            backgroundSize: '24px 24px',
            backgroundImage:
              'linear-gradient(to right, hsl(var(--border) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.1) 1px, transparent 1px)',
          }}
        ></div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.15),transparent)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary inline-block">
                Ready to Turn Strategy into Reality?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                I partner with visionary leaders to build resilient PMOs and drive digital transformation. Tell me about your next milestone.
            </p>
        </div>
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-2 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-2xl shadow-primary/10 h-full">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-primary/10 rounded-full inline-block shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
                                <CalendarCheck className="w-12 h-12 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-primary mb-2">Book a Strategic Discovery Call</h3>
                        <p className="text-muted-foreground mb-6">Skip the back-and-forth emails. Schedule a 15-minute introductory discussion to see if we are a good fit.</p>
                        <Link href="https://calendly.com/your-link" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="w-full group">
                                Schedule Now
                                <CalendarCheck className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-4 text-center">Priority given to Government & Enterprise inquiries.</p>
                    </div>
                </div>
                
                <div className="md:col-span-3 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-2xl shadow-primary/10 flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-headline font-bold text-primary mb-4">Get In Touch</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                        The contact form is currently under maintenance. For all inquiries, please reach out to me directly via email.
                    </p>
                    <a href="mailto:contact@samehinsights.com" className="w-full max-w-xs">
                        <Button size="lg" className="w-full group">
                            contact@samehinsights.com
                            <Mail className="w-5 h-5 ml-2" />
                        </Button>
                    </a>
                </div>
            </div>

            <div className="mt-12 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-2xl shadow-primary/10">
                <h4 className="text-center text-xl font-headline font-semibold mb-8">You are in good company.</h4>
                <div
                    className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                >
                    <div className="flex animate-marquee-scroll group-hover:[animation-play-state:paused]">
                        {clientLogos.concat(clientLogos).map((client, index) => (
                           <div
                                key={`${client.name}-${index}`}
                                className="flex-shrink-0 mx-8"
                            >
                                <div
                                    title={client.name}
                                    className="bg-card/20 backdrop-blur-sm border border-border/20 rounded-2xl shadow-lg flex items-center justify-center h-40 w-64 p-6"
                                >
                                    {client.logo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}