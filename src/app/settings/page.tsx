
"use client";

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Label } from '@/components/ui/label';

const profileSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters."),
});

const emailSchema = z.object({
  newEmail: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Current password is required to change email."),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(6, "New password must be at least 6 characters."),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { user, loading } = useUser();
  const { updateUserProfile, updateUserEmail, updateUserPassword } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
    },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { newEmail: "", password: "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      profileForm.reset({ displayName: user.displayName || "" });
      emailForm.reset({ newEmail: user.email || "", password: ""});
    }
  }, [user, loading, router, profileForm, emailForm]);

  const onProfileSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!updateUserProfile) return;
    setIsProfileSubmitting(true);
    const error = await updateUserProfile(data.displayName);
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    } else {
      toast({ title: 'Profile Updated', description: 'Your display name has been successfully updated.' });
    }
    setIsProfileSubmitting(false);
  };
  
  const onEmailSubmit: SubmitHandler<EmailFormValues> = async (data) => {
    if (!updateUserEmail) return;
    setIsEmailSubmitting(true);
    const error = await updateUserEmail(data.newEmail, data.password);
     if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    } else {
      toast({ title: 'Email Updated', description: 'Your email has been successfully updated. Please sign in again.' });
      // NOTE: Consider signing the user out here for security.
      router.push('/login');
    }
    setIsEmailSubmitting(false);
    emailForm.reset({ newEmail: data.newEmail, password: "" });
  };
  
  const onPasswordSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    if (!updateUserPassword) return;
    setIsPasswordSubmitting(true);
    const error = await updateUserPassword(data.currentPassword, data.newPassword);
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    } else {
      toast({ title: 'Password Updated', description: 'Your password has been changed successfully.' });
    }
    setIsPasswordSubmitting(false);
    passwordForm.reset();
  };


  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-8">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
                <Card className="bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10">
                    <CardHeader>
                        <CardTitle>Public Profile</CardTitle>
                        <CardDescription>This is how others will see you on the site.</CardDescription>
                    </CardHeader>
                     <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                            <CardContent>
                                <FormField
                                control={profileForm.control}
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
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button type="submit" disabled={isProfileSubmitting || profileForm.formState.isSubmitting}>
                                    {isProfileSubmitting ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </TabsContent>
            
            <TabsContent value="account" className="mt-6 space-y-6">
                 <Card className="bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10">
                    <CardHeader>
                        <CardTitle>Email Address</CardTitle>
                        <CardDescription>Change the email address associated with your account.</CardDescription>
                    </CardHeader>
                     <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                            <CardContent className="space-y-4">
                                 <FormField
                                    control={emailForm.control}
                                    name="newEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>New Email</FormLabel>
                                        <FormControl><Input type="email" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={emailForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button type="submit" disabled={isEmailSubmitting || emailForm.formState.isSubmitting}>
                                    {isEmailSubmitting ? <Loader2 className="animate-spin" /> : 'Update Email'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>

                 <Card className="bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10">
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Change your password. After updating, you will be logged out.</CardDescription>
                    </CardHeader>
                     <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button type="submit" disabled={isPasswordSubmitting || passwordForm.formState.isSubmitting}>
                                    {isPasswordSubmitting ? <Loader2 className="animate-spin" /> : 'Update Password'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </TabsContent>

             <TabsContent value="notifications" className="mt-6">
                <Card className="bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10">
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage how you receive notifications from us.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails about new articles and resources.
                                </p>
                            </div>
                            <Switch
                                id="email-notifications"
                                // This is a placeholder for now.
                                // In a real app, you'd hook this up to a user preference in your database.
                                defaultChecked={true}
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
