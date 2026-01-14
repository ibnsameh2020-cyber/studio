
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
import { Send, Loader2, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

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

  return (
    <section id="contact">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-lg border border-border/30 w-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
            <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 space-y-8 bg-black/10 relative">
                    <div className="absolute inset-0 z-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:18px_18px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold">Let's Connect</h2>
                        <p className="text-muted-foreground mt-4 text-lg">
                            Have a project in mind, a question, or just want to say hello? I'd love to hear from you. Fill out the form, and I'll get back to you as soon as possible.
                        </p>
                        <div className="mt-8 space-y-4 text-lg">
                            <a href="mailto:hello@johndoe.com" className="flex items-center gap-4 group">
                                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                                <span className="group-hover:text-primary transition-colors">hello@johndoe.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-4 group">
                                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                                <span className="group-hover:text-primary transition-colors">+1 (234) 567-890</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} className="bg-background/70"/>
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} className="bg-background/70"/>
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
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="How can I help you?" rows={5} {...field} className="bg-background/70"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-right">
                            <Button type="submit" className="group w-full md:w-auto" disabled={isPending}>
                                {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                                ) : (
                                <>
                                    Send Message
                                    <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </>
                                )}
                            </Button>
                        </div>
                    </form>
                    </Form>
                </div>
            </div>
        </Card>
      </div>
    </section>
  );
}

    