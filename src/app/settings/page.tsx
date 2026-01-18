
"use client";

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { user, loading } = useUser();
  const { updateUserProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user && user.displayName) {
      form.reset({ displayName: user.displayName });
    }
  }, [user, loading, router, form]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!updateUserProfile) {
        toast({ title: 'Error', description: 'Update function not available.', variant: 'destructive' });
        return;
    }
    setIsSubmitting(true);
    const error = await updateUserProfile(data.displayName);
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profile Updated',
        description: 'Your display name has been successfully updated.',
      });
    }
    setIsSubmitting(false);
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
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-8">Settings</h1>
        <Card className="bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
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
                <Button type="submit" disabled={isSubmitting || form.formState.isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
