
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition, useRef } from 'react';
import emailjs from '@emailjs/browser';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, CalendarCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("A valid work email is required."),
  organization: z.string().optional(),
  challenge: z.string({ required_error: "Please select your primary challenge."}),
  details: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const challenges = [
    "I need to establish or fix a PMO.",
    "We are struggling with Digital Transformation.",
    "I need an expert speaker for an event.",
    "I want to discuss AI Governance.",
    "Other / General Inquiry.",
];

export default function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    startTransition(() => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        toast({
            title: 'Configuration Error',
            description: 'EmailJS is not configured.',
            variant: 'destructive',
        });
        return;
      }
      
      if (!formRef.current) return;

      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then(() => {
          toast({
            title: 'Request Sent!',
            description: 'Thank you! I will review your inquiry and respond within 24 business hours.',
          });
          form.reset();
        }, (error) => {
          toast({
            title: 'Error',
            description: `Could not send message. ${error.text || 'Please check console.'}`,
            variant: 'destructive',
          });
        });
    });
  };
  
  const clientLogos = [
    {
      name: 'Saudi Irrigation Organization',
      logo: (
        <div className="relative w-40 h-40">
          <Image
            src="https://i0.wp.com/new-24.net/wp-content/uploads/2020/10/%D8%A7%D9%84%D8%B1%D9%8A.png?fit=827%2C827&ssl=1"
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
                    <div>
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
                
                <div className="md:col-span-3 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-2xl shadow-primary/10">
                    <Form {...form}>
                        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} className="bg-background/70 h-11"/>
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
                                            <Input placeholder="name@company.com" {...field} className="bg-background/70 h-11"/>
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
                                        <Input placeholder="your-company.com" {...field} className="bg-background/70 h-11"/>
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
                                        <SelectTrigger className="bg-background/70 h-11">
                                            <SelectValue placeholder="Select a challenge..." />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {challenges.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
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
                                        <Textarea placeholder="Tell me briefly about the project scope or the specific problem you are facing..." rows={4} {...field} className="bg-background/70"/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-2 flex flex-col items-center">
                                <Button type="submit" size="lg" className="group w-full" disabled={isPending}>
                                    {isPending ? (
                                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                                    ) : (
                                        <><Send className="w-5 h-5 mr-2" /> Request Consultation</>
                                    )}
                                </Button>
                                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2"><ShieldCheck size={14}/> I personally review every inquiry and typically respond within 24 business hours.</p>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            <div className="mt-12 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-2xl shadow-primary/10">
                <h4 className="text-center text-xl font-headline font-semibold mb-6">You are in good company.</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
                  {clientLogos.map((client) => (
                    <div
                      key={client.name}
                      title={client.name}
                      className="flex items-center justify-center p-2 text-muted-foreground transition-all duration-300 h-40"
                    >
                      {client.logo}
                    </div>
                  ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
