
"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useFirestore } from '@/firebase/provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Short description must be at least 10 characters."),
  content: z.string().min(50, "Full content must be at least 50 characters."),
  tags: z.string().min(3, "Please add at least one tag."),
  imagePlaceholderId: z.string().min(1, "Please select an image."),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

// Function to generate a URL-friendly slug
const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};

const articleImages = PlaceHolderImages.filter(img => img.id.startsWith('article'));


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
      imagePlaceholderId: "article-1"
    },
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);

  const onSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    if (!firestore) {
        toast({ title: "Error", description: "Firestore not available.", variant: "destructive" });
        return;
    }

    const slug = createSlug(data.title);
    const articleRef = doc(firestore, "articles", slug);

    try {
        await setDoc(articleRef, {
            id: slug,
            ...data,
            author: user?.displayName || "Admin",
            date: serverTimestamp(),
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
                <FormField
                    control={form.control}
                    name="imagePlaceholderId"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select a Cover Image</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 md:grid-cols-3 gap-4"
                            >
                              {articleImages.map((image) => (
                                 <FormItem key={image.id} className="relative">
                                    <FormControl>
                                      <RadioGroupItem value={image.id} className="sr-only" />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer">
                                       <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent has-[:checked]:border-primary transition-all">
                                          <Image
                                            src={image.imageUrl}
                                            alt={image.description}
                                            fill
                                            className="object-cover"
                                          />
                                          <div className="absolute inset-0 bg-black/30 opacity-0 has-[:checked]:opacity-100 transition-opacity flex items-center justify-center">
                                             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                             </div>
                                          </div>
                                       </div>
                                    </FormLabel>
                                 </FormItem>
                              ))}
                            </RadioGroup>
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

