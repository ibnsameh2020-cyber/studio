
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition } from 'react';
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
      // IMPORTANT: Get these values from your EmailJS account dashboard.
      // 1. Service ID: In "Email Services", after adding a service (e.g., Gmail).
      // 2. Template ID: In "Email Templates", after creating a template.
      // 3. Public Key: In "Account" > "API Keys".
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      // In your EmailJS template, make sure your variables are named
      // exactly like the keys in this object: {{name}}, {{email}}, {{message}}.
      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(() => {
          toast({
            title: 'Success!',
            description: 'Thank you! Your message has been sent.',
          });
          form.reset();
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          toast({
            title: 'Error',
            description: 'Could not send message. Please ensure your EmailJS credentials are correct.',
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
