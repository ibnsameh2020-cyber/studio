
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CalendarCheck } from 'lucide-react';
import Image from 'next/image';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';


const contactSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    organization: z.string().min(2, { message: 'Organization is required.' }),
    challenge: z.string().min(1, { message: 'Please select a challenge.' }),
    details: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const challengeOptions = {
    'fix-pmo': 'I need to establish or fix a PMO.',
    'digital-transformation': 'We are struggling with Digital Transformation.',
    'expert-speaker': 'I need an expert speaker for an event.',
    'ai-governance': 'I want to discuss AI Governance.',
    'other': 'Other / General Inquiry.'
};


export default function ContactSection() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const mobileLogosRef = useRef<HTMLDivElement>(null);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            organization: '',
            challenge: '',
            details: '',
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
        if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
          toast({
            variant: 'destructive',
            title: 'Configuration Error',
            description: 'Web3Forms access key is not configured. Please add it to the .env file.',
          });
          setIsSubmitting(false);
          return;
        }

        const formData = new FormData();
        formData.append("access_key", accessKey);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("organization", data.organization);
        const fullChallengeText = challengeOptions[data.challenge as keyof typeof challengeOptions] || data.challenge;
        formData.append("Primary Challenge", fullChallengeText);
        formData.append("details", data.details || 'Not provided');
        formData.append("subject", `New Inquiry from ${data.name} - ${data.organization}`);
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                toast({
                    title: 'Message Sent!',
                    description: 'Thank you for your inquiry. I will get back to you shortly.',
                });
                form.reset();
            } else {
                console.error("Web3Forms Error:", result);
                toast({
                    variant: 'destructive',
                    title: 'Submission Failed',
                    description: result.message || 'An unknown error occurred.',
                });
            }
        } catch (error) {
            console.error('Form Submission Error:', error);
            toast({
                variant: 'destructive',
                title: 'Submission Failed',
                description: 'A network error occurred. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const clientLogos = [
        {
          name: 'Saudi Irrigation Organization',
          logo: (
            <div className="relative w-40 h-40">
              <Image
                src="https://i.ibb.co/kzQmy89/70bee6de-6292-4040-bd78-4b8ed275e938-removalai-preview.png"
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
                src="https://i.ibb.co/pBk2bKKy/536ae902-2fc5-4679-91e6-7af31fcbfea9-removalai-preview.png"
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
                    src="https://i.ibb.co/Rps1TB7f/rosmiman-Logo.png"
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
                src="https://i.ibb.co/B202P1JK/R.png"
                alt="Repotech Logo"
                fill
                className="object-contain"
              />
            </div>
          ),
        },
        {
          name: 'Method',
          logo: (
            <div className="relative w-40 h-40">
              <Image
                src="https://i.ibb.co/GvghpwsX/Method.png"
                alt="Method Logo"
                fill
                className="object-contain"
              />
            </div>
          ),
        },
        {
          name: 'ESG',
          logo: (
            <div className="relative w-40 h-40">
              <Image
                src="https://i.ibb.co/G4MnBprK/ESG.webp"
                alt="ESG Logo"
                fill
                className="object-contain"
              />
            </div>
          ),
        },
        {
          name: 'Olympus',
          logo: (
            <div className="relative w-40 h-16">
              <Image
                src="https://i.ibb.co/j9fm4yYz/Olympus-Corporation-logo-svg.png"
                alt="Olympus Logo"
                fill
                className="object-contain"
              />
            </div>
          )
        },
        {
            name: 'King Fahd Medical City',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/DgTk9pVf/KFMC.png" alt="King Fahd Medical City Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'King Faisal Specialist Hospital & Research Centre',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/ns1mnvgH/King-Faisal-Specialist-Hospital-Research-Centre-1.webp" alt="King Faisal Specialist Hospital & Research Centre Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'Ministry of Health Saudi Arabia',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/r2hpzd1G/Logo-ministry-of-health-saudi-arabia-identity-transparent-PNG.png" alt="Ministry of Health Saudi Arabia Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'King Saud Medical City',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/Df9zpCcg/ksmc.png" alt="King Saud Medical City Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'Royal Commission for Jubail and Yanbu',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/6Rgm389d/RCJY-Logo-New-svg.png" alt="Royal Commission for Jubail and Yanbu Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'Princess Noura University',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/p6VLhk9c/PNU.png" alt="Princess Noura University Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'Saudi Arabian National Guard',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/3V1Xrk9/image.png" alt="Saudi Arabian National Guard Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'King Fahd Armed Forces Hospital',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/6JmXmbQZ/3d2f8725-2402-4bf4-841b-7aa21d304504-removalai-preview.png" alt="King Fahd Armed Forces Hospital Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'Unión Fenosa Gas',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/gZTwVs5z/b87e9262-3c1c-4bc7-b282-ae06918f4581-removalai-preview.png" alt="Unión Fenosa Gas Logo" fill className="object-contain" />
              </div>
            ),
        },
        {
            name: 'SEGAS',
            logo: (
              <div className="relative w-40 h-24">
                <Image src="https://i.ibb.co/gZhkDrGv/a45997d6-35a4-43fc-971b-904816869ae8-removalai-preview.png" alt="SEGAS Logo" fill className="object-contain" />
              </div>
            ),
        },      
    ];

    // This effect handles the mobile auto-scrolling
    useEffect(() => {
        const logosElement = mobileLogosRef.current;
        if (!logosElement) return;

        let scrollInterval: NodeJS.Timeout;
        const startScrolling = () => {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                if (logosElement.scrollWidth > logosElement.clientWidth) {
                    const isAtLoopPoint = logosElement.scrollLeft >= logosElement.scrollWidth / 2;
                    if (isAtLoopPoint) {
                        logosElement.scrollLeft = 0;
                    } else {
                        logosElement.scrollLeft += 1;
                    }
                }
            }, 30);
        };

        let resumeTimeout: NodeJS.Timeout;
        const handleTouchStart = () => {
            clearInterval(scrollInterval);
            clearTimeout(resumeTimeout);
        };

        const handleTouchEnd = () => {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(startScrolling, 2000); // Resume after 2s of no touching
        };

        startScrolling();
        logosElement.addEventListener('touchstart', handleTouchStart, { passive: true });
        logosElement.addEventListener('touchend', handleTouchEnd, { passive: true });
        logosElement.addEventListener('touchcancel', handleTouchEnd, { passive: true });

        return () => {
            clearInterval(scrollInterval);
            clearTimeout(resumeTimeout);
            if (logosElement) {
                logosElement.removeEventListener('touchstart', handleTouchStart);
                logosElement.removeEventListener('touchend', handleTouchEnd);
                logosElement.removeEventListener('touchcancel', handleTouchEnd);
            }
        };
    }, []);

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
                            <div className="h-24 w-24 flex items-center justify-center bg-primary/10 rounded-full shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
                                <CalendarCheck className="w-12 h-12 text-primary -translate-x-px" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-primary mb-2">Book a Strategic Discovery Call</h3>
                        <p className="text-muted-foreground mb-6">Skip the back-and-forth emails. Schedule a 15-minute introductory call to see if we are a good fit.</p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" className="w-full group">
                                    Schedule Now
                                    <CalendarCheck className="w-5 h-5 ml-2" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="p-0 border-0 w-[90vw] h-[90vh] max-w-5xl">
                                <DialogHeader className="sr-only">
                                  <DialogTitle>Schedule a Discovery Call</DialogTitle>
                                  <DialogDescription>
                                    Use the calendar below to book a 15-minute introductory call.
                                  </DialogDescription>
                                </DialogHeader>
                                <iframe 
                                    src="https://cal.com/eng.samehmoussa/15min?layout=column_view" 
                                    className="w-full h-full rounded-lg"
                                    frameBorder="0"
                                    title="Schedule a Discovery Call"
                                ></iframe>
                            </DialogContent>
                        </Dialog>
                        <p className="text-xs text-muted-foreground mt-4 text-center">Priority is given to government and enterprise inquiries.</p>
                    </div>
                </div>
                
                <div className="md:col-span-3 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-2xl shadow-primary/10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Work Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name@company.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="organization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Organization / Company Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://your-company.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="challenge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What is your primary challenge?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a challenge..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="fix-pmo">I need to establish or fix a PMO.</SelectItem>
                                                <SelectItem value="digital-transformation">We are struggling with Digital Transformation.</SelectItem>
                                                <SelectItem value="expert-speaker">I need an expert speaker for an event.</SelectItem>
                                                <SelectItem value="ai-governance">I want to discuss AI Governance.</SelectItem>
                                                <SelectItem value="other">Other / General Inquiry.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="details"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Details (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tell me a bit more about your project or needs." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col items-center">
                                <Button type="submit" size="lg" className="w-full max-w-xs" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Request Consultation"}
                                </Button>
                                <p className="text-xs text-muted-foreground mt-4 text-center">
                                    I personally review every inquiry and typically respond within 24 business hours.
                                </p>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            <div className="mt-12 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl">
                <h4 className="text-center text-xl font-headline font-semibold mb-8">You are in good company.</h4>
                
                {/* Desktop: Animated Marquee */}
                <div 
                    className="hidden md:block w-full overflow-hidden"
                    style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
                >
                    <div className="flex w-fit animate-marquee-scroll hover:[animation-play-state:paused]">
                        {[...clientLogos, ...clientLogos].map((client, index) => (
                            <div key={`${client.name}-d-${index}`} className="flex-shrink-0 mx-4">
                                <div title={client.name} className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl shadow-lg flex items-center justify-center h-40 w-64 p-6">
                                    {client.logo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Mobile: JS-powered auto-scroll */}
                <div ref={mobileLogosRef} className="md:hidden w-full overflow-x-auto flex space-x-4">
                    {[...clientLogos, ...clientLogos].map((client, index) => (
                        <div key={`${client.name}-m-${index}`} className="flex-shrink-0">
                            <div title={client.name} className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl shadow-lg flex items-center justify-center h-40 w-64 p-6">
                                {client.logo}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
