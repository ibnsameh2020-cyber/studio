"use client";

import { useState } from 'react';
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
import { Card } from '@/components/ui/card';
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

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary inline-block">
                Ready to Turn Strategy into Reality?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                I partner with visionary leaders to build resilient PMOs and drive digital transformation. Tell me about your next milestone.
            </p>
        </div>
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-stretch">
                <Card className="md:col-span-2 bg-card/40 backdrop-blur-md border border-border/20 p-8 flex flex-col justify-center items-center text-center shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="h-24 w-24 flex items-center justify-center bg-primary/10 rounded-full shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
                            <CalendarCheck className="w-12 h-12 text-primary" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-primary mb-4">Book a Strategic Discovery Call</h3>
                    <p className="text-muted-foreground mb-8">Skip the back-and-forth emails. Schedule a 15-minute introductory call to see if we are a good fit.</p>
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
                    <p className="text-xs text-muted-foreground mt-6">Priority is given to government and enterprise inquiries.</p>
                </Card>
                
                <Card className="md:col-span-3 bg-card/40 backdrop-blur-md border border-border/20 p-8 shadow-2xl">
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
                                                <Input placeholder="Your Name" {...field} className="bg-background/20" />
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
                                                <Input placeholder="name@company.com" {...field} className="bg-background/20" />
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
                                            <Input placeholder="https://your-company.com" {...field} className="bg-background/20" />
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
                                                <SelectTrigger className="bg-background/20">
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
                                            <Textarea placeholder="Tell me a bit more about your project or needs." {...field} className="bg-background/20" />
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
                </Card>
            </div>
        </div>
    </div>
  );
}
