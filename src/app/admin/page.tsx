
"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serverTimestamp, doc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { cn } from '@/lib/utils';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Edit, Upload } from "lucide-react";
import { useFirestore } from '@/firebase/provider';
import { useCollection } from '@/firebase';
import type { Article } from '@/lib/types';


const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Short description must be at least 10 characters."),
  content: z.string().min(50, "Full content must be at least 50 characters."),
  tags: z.string().min(3, "Please add at least one tag."),
  imageUrl: z.string().optional(),
  language: z.enum(['ltr', 'rtl']).default('ltr'),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

type UploadWidgetResult = {
    info?: {
        secure_url: string;
    }
}

const createSlug = (title: string): string => {
  // First, try to generate a slug from the title
  const latinSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-latin characters, spaces, and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one

  // If the title was in a non-latin script (like Arabic), latinSlug will be empty.
  // In that case, generate a unique random ID.
  if (latinSlug) {
    return latinSlug;
  }
  
  // Generate a short, random, URL-friendly ID
  return Math.random().toString(36).substring(2, 12);
};


export default function AdminPage() {
  const { user, loading, isAdmin } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const { data: articles, loading: articlesLoading } = useCollection<Article>('articles');
  
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: "",
      imageUrl: "",
      language: "ltr",
    },
  });

  const imageUrl = form.watch("imageUrl");
  const language = form.watch("language");

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);


  const handleUploadSuccess = (result: UploadWidgetResult) => {
    if (result.info && typeof result.info.secure_url === 'string') {
        form.setValue('imageUrl', result.info.secure_url);
        toast({
            title: 'Image Uploaded',
            description: 'Your image has been successfully uploaded.',
        });
    } else {
        toast({
            title: 'Upload Failed',
            description: 'The upload was successful but no URL was returned.',
            variant: 'destructive'
        });
    }
  }


  const onSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    if (!firestore) {
        toast({ title: "Error", description: "Firestore not available.", variant: "destructive" });
        return;
    }

    const slug = editingArticleId || createSlug(data.title);
    const articleRef = doc(firestore, "articles", slug);

    try {
        await setDoc(articleRef, {
            id: slug,
            ...data,
            author: user?.displayName || "Admin",
            date: serverTimestamp(),
            tags: data.tags.split(',').map(tag => tag.trim()),
        }, { merge: true });

        toast({
            title: `Article ${editingArticleId ? 'Updated' : 'Published'}!`,
            description: `Your article is now ${editingArticleId ? 'updated' : 'live'}.`,
        });
        form.reset();
        setEditingArticleId(null);
    } catch (error: any) {
        toast({
            title: "Error",
            description: `Could not publish article. ${error.message}`,
            variant: "destructive",
        });
    }
  };

  const handleEditClick = (article: Article) => {
    setEditingArticleId(article.id);
    form.reset({
      title: article.title,
      description: article.description,
      content: article.content,
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
      imageUrl: article.imageUrl || '',
      language: article.language || 'ltr',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = async (articleId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, "articles", articleId));
      toast({
        title: "Article Deleted",
        description: "The article has been successfully removed.",
      });
    } catch (error: any) {
       toast({
        title: "Error",
        description: `Could not delete article. ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setEditingArticleId(null);
    form.reset();
  }
  
  const formatDate = (date: any) => {
    if (!date) return '';
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };


  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }
  
  if (!isAdmin) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>You do not have access to this page.</p>
        </div>
    );
  }

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
    console.error('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is missing from .env file.');
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground mb-8">
            {editingArticleId ? `Editing article: ${editingArticleId}` : "Create a new article."}
        </p>

        <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className={cn(
                "space-y-8 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl mb-16",
                language === 'rtl' && 'font-arabic'
              )}
              dir={language}
            >
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FormItem dir="ltr">
                      <FormLabel>Cover Image</FormLabel>
                      <div className="flex items-center gap-4">
                         <CldUploadWidget
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                            onSuccess={handleUploadSuccess}
                            options={{
                                sources: ['local', 'url', 'camera'],
                                multiple: false,
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button type="button" variant="outline" onClick={() => open()}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>

                        {imageUrl && (
                          <div className="relative w-32 h-20 rounded-md overflow-hidden">
                            <Image src={imageUrl} alt="Uploaded preview" fill className="object-cover" />
                          </div>
                        )}
                      </div>
                      <FormControl>
                         <Input type="hidden" {...form.register("imageUrl")} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem dir="ltr">
                          <FormLabel>Text Direction</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select text direction" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ltr">LTR</SelectItem>
                              <SelectItem value="rtl">RTL</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Content</FormLabel>
                        <FormControl>
                            <Textarea 
                              placeholder="Write the full article content here. You can use Markdown." 
                              rows={15} 
                              {...field}
                              className={cn(language === 'rtl' && 'text-lg')}
                            />
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

                <div className="flex gap-4" dir="ltr">
                  {editingArticleId && (
                     <Button type="button" variant="outline" onClick={cancelEdit} className="w-full">
                        Cancel
                    </Button>
                  )}
                  <Button type="submit" size="lg" className="w-full group" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? (
                          <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              {editingArticleId ? 'Updating...' : 'Publishing...'}
                          </>
                      ) : (editingArticleId ? 'Update Article' : 'Publish Article')}
                  </Button>
                </div>
            </form>
        </Form>
        
        <div className="space-y-8">
            <h2 className="text-2xl md:text-4xl font-headline font-bold">Manage Articles</h2>
            {articlesLoading ? (
                <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
            ) : (
                <div className="space-y-4">
                    {articles?.map(article => (
                        <Card key={article.id} className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg flex flex-col sm:flex-row justify-between sm:items-center p-4 gap-4">
                            <CardHeader className="p-0">
                                <CardTitle className="text-lg font-headline">{article.title}</CardTitle>
                                <CardDescription>
                                    Published on: {formatDate(article.date)}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-0 flex gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEditClick(article)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the article.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(article.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

    