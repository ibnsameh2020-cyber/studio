
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
import { Send, Loader2 } from 'lucide-react';

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
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        toast({
            title: 'Configuration Error',
            description: 'EmailJS is not configured. Please add credentials to your .env file.',
            variant: 'destructive',
        });
        console.error("EmailJS credentials missing in .env file.");
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

      // In your EmailJS template, make sure your variables are named
      // exactly like the keys in this object: {{name}}, {{email}}, {{message}}.
      emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
        formRef.current, 
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
        .then(() => {
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
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Have a question or want to work together? Drop me a message.
        </p>
      </div>
      <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
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
                        <Textarea placeholder="Your message..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <div className="text-right">
                <Button type="submit" className="group" disabled={isPending}>
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
    </section>
  );
}
