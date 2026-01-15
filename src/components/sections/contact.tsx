
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
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, Mail, Phone, ArrowRight, Copy } from 'lucide-react';
import Link from 'next/link';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    startTransition(() => {
      // Make sure to add your EmailJS credentials to your .env.local file
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        toast({
            title: 'Configuration Error',
            description: 'EmailJS is not configured. Please add credentials to your .env file.',
            variant: 'destructive',
        });
        console.error("EmailJS credentials missing in .env.local file. Make sure to use NEXT_PUBLIC_ prefix.");
        return;
      }
      
      if (!formRef.current) {
        toast({
            title: 'Error',
            description: 'Could not find the form element.',
            variant: 'destructive',
        });
        return;
      }

      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then((result) => {
          console.log('Success:', result.text);
          toast({
            title: 'Success!',
            description: 'Thank you! Your message has been sent.',
          });
          form.reset();
        })
        .catch((error) => {
          console.error('EmailJS Full Error:', error);
          toast({
            title: 'Error',
            description: `Could not send message. ${error.text || 'Please check the console for details.'}`,
            variant: 'destructive',
          });
        });
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied!',
        description: 'Phone number copied to clipboard.',
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        title: 'Error',
        description: 'Failed to copy phone number.',
        variant: 'destructive',
      });
    });
  };

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
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary inline-block">
                    Let's Build Something Great Together
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Ready to transform your project portfolio into a strategic asset? Let's discuss how we can align your execution with your vision.
                </p>
                <div className="space-y-4">
                    <Link href="mailto:contact@samehinsights.com" className="inline-flex items-center gap-3 text-lg group">
                        <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                        <span className="group-hover:text-primary transition-colors">contact@samehinsights.com</span>
                    </Link>
                    <div className="flex items-center gap-3 text-lg">
                        <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                        <button onClick={() => copyToClipboard('+966565579000')} className="flex items-center gap-2 group">
                            <span className="group-hover:text-primary transition-colors">+966565579000</span>
                            <Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>
                 <Link href="#hero" className="inline-block mt-8">
                    <Button variant="outline" className="group bg-primary/10 border-primary/50 text-primary hover:bg-primary/20">
                        Back to Top
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-2xl shadow-primary/10">
                 <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-foreground/80">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} className="bg-background/70 h-12 text-base"/>
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
                                <FormLabel className="text-foreground/80">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} className="bg-background/70 h-12 text-base"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-foreground/80">Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="How can I help you?" rows={5} {...field} className="bg-background/70 text-base"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-4">
                            <Button type="submit" size="lg" className="group w-full" disabled={isPending}>
                                {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Sending...
                                </>
                                ) : (
                                <>
                                    Send Message
                                    <Send className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
      </div>
    </section>
  );
}
