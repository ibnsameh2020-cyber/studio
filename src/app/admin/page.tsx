
"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useFirestore } from '@/firebase/provider';
import { collection, addDoc } from 'firebase/firestore';

const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Short description must be at least 10 characters."),
  content: z.string().min(50, "Full content must be at least 50 characters."),
  tags: z.string().min(3, "Please add at least one tag."),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function AdminPage() {
  const { user, loading, isAdmin } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: "",
    },
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);

  const onSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    try {
        await addDoc(collection(firestore, "articles"), {
            ...data,
            author: user?.displayName || "Admin",
            date: new Date().toISOString(),
            tags: data.tags.split(',').map(tag => tag.trim()),
        });

        toast({
            title: "Article Published!",
            description: "Your new article is now live.",
        });
        form.reset();
    } catch (error: any) {
        toast({
            title: "Error",
            description: `Could not publish article. ${error.message}`,
            variant: "destructive",
        });
    }
  };

  if (loading || !isAdmin) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-8">Admin Panel</h1>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter article title" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A brief summary of the article" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Content</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Write the full article content here. You can use Markdown." rows={15} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., React, Firebase, Web Dev" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" size="lg" className="w-full group" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Publishing...
                        </>
                    ) : "Publish Article" }
                </Button>
            </form>
        </Form>
      </div>
    </div>
  );
}
