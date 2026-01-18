
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
import { Loader2, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const signUpSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function LoginPage() {
  const { user, loading } = useUser();
  const { signInWithEmailPassword, signUpWithEmailPassword, sendPasswordResetEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { displayName: '', email: '', password: '', confirmPassword: '' },
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
        title: 'Sign In Failed',
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
  
  const handleForgotPassword = async () => {
    const email = signInForm.getValues("email");
    if (!email || !z.string().email().safeParse(email).success) {
        signInForm.trigger("email");
        toast({
            title: "Invalid Email",
            description: "Please enter a valid email address to reset your password.",
            variant: "destructive",
        });
        return;
    }

    setIsSubmitting(true);
    const error = await sendPasswordResetEmail(email);
    if (error) {
        toast({
            title: "Error",
            description: error,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Password Reset Email Sent",
            description: "Please check your inbox for instructions to reset your password.",
        });
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
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            type={showSignInPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            {...field}
                                            className="pr-10"
                                        />
                                    </FormControl>
                                    <button
                                        type="button"
                                        onClick={() => setShowSignInPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                        aria-label={showSignInPassword ? "Hide password" : "Show password"}
                                    >
                                        {showSignInPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end -mt-2">
                        <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto text-sm text-muted-foreground hover:text-primary"
                            onClick={handleForgotPassword}
                            disabled={isSubmitting}
                        >
                            Forgot Password?
                        </Button>
                    </div>
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
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showSignUpPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                {...field}
                                                className="pr-10"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowSignUpPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                            aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                                        >
                                            {showSignUpPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={signUpForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                {...field}
                                                className="pr-10"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
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
