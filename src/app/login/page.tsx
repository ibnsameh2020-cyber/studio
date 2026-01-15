
"use client";

import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const signUpSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function LoginPage() {
  const { user, loading } = useUser();
  const { signInWithEmailPassword, signUpWithEmailPassword } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { displayName: '', email: '', password: '' },
  });

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  const onSignInSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const error = await signInWithEmailPassword(data.email, data.password);
    if (error) {
      toast({
        title: 'Sign In Error',
        description: error,
        variant: 'destructive',
      });
    } else {
        toast({ title: 'Success', description: 'You are now signed in.' });
        router.push('/');
    }
    setIsSubmitting(false);
  };
  
  const onSignUpSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    const error = await signUpWithEmailPassword(data.email, data.password, data.displayName);
    if (error) {
       toast({
        title: 'Sign Up Error',
        description: error,
        variant: 'destructive',
      });
    } else {
        toast({ title: 'Welcome!', description: 'Your account has been created.' });
        router.push('/');
    }
    setIsSubmitting(false);
  };


  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 pt-24">
      <div className="relative w-full max-w-md">
        <Card className="bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10 animate-fade-in-up">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sign-in">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
                <CardDescription className="pt-2">Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                     <FormField
                        control={signInForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={signInForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><LogIn /> Sign In</>}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>

            <TabsContent value="sign-up">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
                    <CardDescription className="pt-2">Fill in the details below to join.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                        <FormField
                            control={signUpForm.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Display Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={signUpForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={signUpForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
                           {isSubmitting ? <Loader2 className="animate-spin" /> : <><UserPlus /> Sign Up</>}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
