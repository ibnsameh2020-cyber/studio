
"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serverTimestamp, doc, setDoc, deleteDoc, Timestamp, collection, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { cn } from '@/lib/utils';
import { formatArticle } from '@/ai/flows/format-article-flow';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Edit, Upload } from "lucide-react";
import { useFirestore } from '@/firebase/provider';
import { useCollection } from '@/firebase';
import type { Article, Resource } from '@/lib/types';


const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Short description must be at least 10 characters."),
  content: z.string().min(50, "Full content must be at least 50 characters."),
  tags: z.string().min(3, "Please add at least one tag."),
  imageUrl: z.string().optional(),
  language: z.enum(['ltr', 'rtl']).default('ltr'),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

const resourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  category: z.string().min(3, "Category must be at least 3 characters."),
  headline: z.string().min(10, "Headline must be at least 10 characters."),
  hook: z.string().min(10, "The Hook must be at least 10 characters."),
  keyInsight: z.string().min(10, "Key Insight must be at least 10 characters."),
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

type UploadWidgetResult = {
    info?: {
        secure_url: string;
    }
}

const createSlug = (title: string): string => {
  const latinSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  if (latinSlug) {
    return latinSlug;
  }
  
  return Math.random().toString(36).substring(2, 12);
};

const isRTL = (str: string) => {
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(str);
};


export default function AdminPage() {
  const { user, loading, isAdmin } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const { data: articles, loading: articlesLoading } = useCollection<Article>('articles');
  const { data: resources, loading: resourcesLoading } = useCollection<Resource>('resources');
  
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [isProcessingArticle, setIsProcessingArticle] = useState(false);
  
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [isProcessingResource, setIsProcessingResource] = useState(false);

  const articleForm = useForm<ArticleFormValues>({
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

  const resourceForm = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      category: "",
      headline: "",
      hook: "",
      keyInsight: "",
    },
  });

  const imageUrl = articleForm.watch("imageUrl");
  const language = articleForm.watch("language");
  const articleTitle = articleForm.watch("title");

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);

  useEffect(() => {
    if (isRTL(articleTitle)) {
      articleForm.setValue('language', 'rtl');
    } else {
      articleForm.setValue('language', 'ltr');
    }
  }, [articleTitle, articleForm]);

  // START: One-time migration for old articles
  useEffect(() => {
    const runMigration = async () => {
        if (!firestore || sessionStorage.getItem('articlesMigrated_v2')) {
            return;
        }

        console.log("Checking for insights to migrate...");
        toast({
            title: "Checking for old insights...",
            description: "Automatically upgrading insights to the new AI style.",
        });

        const articlesRef = collection(firestore, "articles");
        const querySnapshot = await getDocs(articlesRef);
        const articlesToMigrate: Article[] = [];

        querySnapshot.forEach((doc) => {
            const article = { id: doc.id, ...doc.data() } as Article;
            if (!article.formattedContent || !Array.isArray(article.formattedContent)) {
                articlesToMigrate.push(article);
            }
        });

        if (articlesToMigrate.length === 0) {
            console.log("No insights to migrate.");
            sessionStorage.setItem('articlesMigrated_v2', 'true');
            return;
        }

        toast({
            title: `Found ${articlesToMigrate.length} insights to upgrade.`,
            description: "The AI stylist is getting to work. Please wait...",
        });

        let successCount = 0;
        for (const article of articlesToMigrate) {
            try {
                if (!article.content) continue;
                console.log(`Migrating insight: ${article.id}`);
                const result = await formatArticle({ content: article.content });
                const formattedContent = result.structuredContent;

                const articleRef = doc(firestore, "articles", article.id);
                await updateDoc(articleRef, {
                    formattedContent: formattedContent
                });
                successCount++;
                console.log(`Successfully migrated insight: ${article.id}`);
            } catch (error) {
                console.error(`Failed to migrate insight ${article.id}:`, error);
                toast({
                    title: "Migration Error",
                    description: `Could not upgrade insight: ${article.title}.`,
                    variant: "destructive",
                });
            }
        }

        if (successCount > 0) {
            toast({
                title: "Migration Complete!",
                description: `Successfully upgraded ${successCount} of ${articlesToMigrate.length} insights to the new style.`,
            });
        } else {
             toast({
                title: "Migration Finished",
                description: `No insights were upgraded. They might be up to date already.`,
            });
        }
        
        sessionStorage.setItem('articlesMigrated_v2', 'true');
    };

    if (firestore && isAdmin) {
      runMigration();
    }
  }, [firestore, toast, isAdmin]);
  // END: One-time migration
  
  // START: One-time seed for new insights
  useEffect(() => {
    const seedArticles = async () => {
        if (!firestore || !isAdmin || sessionStorage.getItem('insightsSeeded_v1')) {
            return;
        }

        const articlesToSeed = [
            {
                id: 'the-ai-warning',
                title: 'The "Godfather of AI" Warns: 6 Shocking Truths About Our Future',
                description: 'Yoshua Bengio, one of the founding fathers of AI, broke his silence for one reason: "Love for his children." From the "Tiger Cub" problem to the concentration of absolute power, here is why AI might be becoming more dangerous as it gets smarter—and what we must do about it.',
                content: `Yoshua Bengio, one of the founding fathers of AI, broke his silence for one reason: "Love for his children." From the "Tiger Cub" problem to the concentration of absolute power, here is why AI might be becoming more dangerous as it gets smarter—and what we must do about it. Key Insight: "We are not programming AI; we are raising it. And it’s learning to deceive us."`,
                tags: ['Artificial Intelligence & Strategy'],
                imageUrl: 'https://picsum.photos/seed/ai-warning/1080/720',
            },
            {
                id: 'strategic-efficiency',
                title: 'Value Engineering: The Strategic Blueprint for Vision 2030',
                description: "In an era of fiscal tightening, how do we achieve 'more with less'? Value Engineering isn't just about cost-cutting; it's a mathematical approach to optimizing public spending. Discover how this methodology is reshaping infrastructure, healthcare, and education in Saudi Arabia.",
                content: `In an era of fiscal tightening, how do we achieve "more with less"? Value Engineering isn't just about cost-cutting; it's a mathematical approach to optimizing public spending. Discover how this methodology is reshaping infrastructure, healthcare, and education in Saudi Arabia. Key Insight: "Optimizing spend without compromising quality is the cornerstone of sustainable development."`,
                tags: ['Vision 2030 & Operational Excellence'],
                imageUrl: 'https://picsum.photos/seed/strategic-efficiency/1080/720',
            },
            {
                id: 'modern-leadership',
                title: 'The Strategic Guide to Leading Multi-Generational Teams',
                description: 'For the first time in history, four generations (Boomers to Gen Z) are working under one roof. Is this a conflict trap or a strategic asset? Move beyond the stereotypes of "lazy Gen Z" or "stubborn Boomers" and learn how to harness the unique "Hidden Power" of each demographic.',
                content: `For the first time in history, four generations (Boomers to Gen Z) are working under one roof. Is this a conflict trap or a strategic asset? Move beyond the stereotypes of "lazy Gen Z" or "stubborn Boomers" and learn how to harness the unique "Hidden Power" of each demographic. Key Insight: "Stop managing generations. Start leading humans."`,
                tags: ['Leadership & Culture'],
                imageUrl: 'https://picsum.photos/seed/modern-leadership/1080/720',
            },
            {
                id: 'the-nice-guy-syndrome',
                title: 'The "Nice Guy" Syndrome: Why Kindness Might Be Destroying Your Career',
                description: 'Are you the "candle" that burns itself out to light the way for others? Being "too nice" is often a mask for fear, not a virtue. This article explores the shocking truth about people-pleasing, the "Guilt Trap," and how to set boundaries that earn you respect, not just sympathy.',
                content: `Are you the "candle" that burns itself out to light the way for others? Being "too nice" is often a mask for fear, not a virtue. This article explores the shocking truth about people-pleasing, the "Guilt Trap," and how to set boundaries that earn you respect, not just sympathy. Key Insight: "Your value doesn't come from infinite sacrifice. It comes from being authentic."`,
                tags: ['Self-Development & Psychology'],
                imageUrl: 'https://picsum.photos/seed/nice-guy/1080/720',
            }
        ];

        console.log("Checking if insights need to be seeded...");
        
        let articlesAdded = 0;
        for (const articleData of articlesToSeed) {
            const articleRef = doc(firestore, "articles", articleData.id);
            const docSnap = await getDoc(articleRef);

            if (!docSnap.exists()) {
                try {
                    console.log(`Seeding insight: ${articleData.id}`);
                    const result = await formatArticle({ content: articleData.content });
                    const formattedContent = result.structuredContent;

                    await setDoc(articleRef, {
                        ...articleData,
                        author: "Eng. Sameh Moussa",
                        date: serverTimestamp(),
                        language: isRTL(articleData.title) ? 'rtl' : 'ltr',
                        formattedContent: formattedContent,
                    }, { merge: true });
                    articlesAdded++;
                } catch (error) {
                    console.error(`Failed to seed insight ${articleData.id}:`, error);
                }
            }
        }

        if (articlesAdded > 0) {
            toast({
                title: "Seeding New Insights",
                description: `Added ${articlesAdded} new insights to your collection.`,
            });
        }
        
        sessionStorage.setItem('insightsSeeded_v1', 'true');
    };

    if (firestore && isAdmin) {
      seedArticles();
    }
  }, [firestore, isAdmin, toast]);
  // END: One-time seed for new insights


  const handleUploadSuccess = (result: UploadWidgetResult) => {
    if (result.info && typeof result.info.secure_url === 'string') {
        articleForm.setValue('imageUrl', result.info.secure_url);
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

  const emptyArticleFormValues = {
    title: "",
    description: "",
    content: "",
    tags: "",
    imageUrl: "",
    language: 'ltr' as 'ltr' | 'rtl',
  };

  const onArticleSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    if (!firestore) {
        toast({ title: "Error", description: "Firestore not available.", variant: "destructive" });
        return;
    }

    setIsProcessingArticle(true);

    try {
        toast({
            title: "AI Stylist at Work",
            description: "Automatically structuring and styling your insight...",
        });
        const result = await formatArticle({ content: data.content });
        const formattedContent = result.structuredContent;

        const slug = editingArticleId || createSlug(data.title);
        const articleRef = doc(firestore, "articles", slug);

        await setDoc(articleRef, {
            id: slug,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            content: data.content,
            formattedContent: formattedContent,
            tags: data.tags.split(',').map(tag => tag.trim()),
            language: data.language,
            author: "Eng. Sameh Moussa",
            date: serverTimestamp(),
        }, { merge: true });

        toast({
            title: `Insight ${editingArticleId ? 'Updated' : 'Published'}!`,
            description: `Your insight is now ${editingArticleId ? 'updated' : 'live'}.`,
        });
        articleForm.reset(emptyArticleFormValues);
        setEditingArticleId(null);
    } catch (error: any) {
        toast({
            title: "Error",
            description: `Could not publish insight. ${error.message}`,
            variant: "destructive",
        });
    } finally {
        setIsProcessingArticle(false);
    }
  };

  const handleEditArticleClick = (article: Article) => {
    setEditingArticleId(article.id);
    articleForm.reset({
      title: article.title,
      description: article.description,
      content: article.content,
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
      imageUrl: article.imageUrl || '',
      language: article.language || 'ltr',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDeleteArticle = async (articleId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, "articles", articleId));
      toast({
        title: "Insight Deleted",
        description: "The insight has been successfully removed.",
      });
    } catch (error: any) {
       toast({
        title: "Error",
        description: `Could not delete insight. ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const cancelEditArticle = () => {
    setEditingArticleId(null);
    articleForm.reset(emptyArticleFormValues);
  }

  const emptyResourceFormValues = {
      title: "",
      category: "",
      headline: "",
      hook: "",
      keyInsight: "",
  };

  const onResourceSubmit: SubmitHandler<ResourceFormValues> = async (data) => {
    if (!firestore || !user) {
        toast({ title: "Error", description: "Firestore or user not available.", variant: "destructive" });
        return;
    }
    setIsProcessingResource(true);
    try {
        const slug = editingResourceId || createSlug(data.title);
        const resourceRef = doc(firestore, "resources", slug);
        await setDoc(resourceRef, {
            id: slug,
            ...data,
            authorId: user.uid,
            createdAt: serverTimestamp(),
        }, { merge: true });
        toast({
            title: `Resource ${editingResourceId ? 'Updated' : 'Published'}!`,
            description: "Your new resource is now available to members.",
        });
        resourceForm.reset(emptyResourceFormValues);
        setEditingResourceId(null);
    } catch (error: any) {
         toast({
            title: "Error",
            description: `Could not publish resource. ${error.message}`,
            variant: "destructive",
        });
    } finally {
        setIsProcessingResource(false);
    }
  };

  const handleEditResourceClick = (resource: Resource) => {
    setEditingResourceId(resource.id);
    resourceForm.reset(resource);
    // Might need a way to focus the right tab and scroll.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, "resources", resourceId));
      toast({
        title: "Resource Deleted",
        description: "The resource has been successfully removed.",
      });
    } catch (error: any) {
       toast({
        title: "Error",
        description: `Could not delete resource. ${error.message}`,
        variant: "destructive",
      });
    }
  };
  
  const cancelEditResource = () => {
    setEditingResourceId(null);
    resourceForm.reset(emptyResourceFormValues);
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-8">Admin Panel</h1>

        <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="articles">Manage Insights</TabsTrigger>
                <TabsTrigger value="resources">Manage Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
                <p className="text-muted-foreground mb-8">
                    {editingArticleId ? `Editing insight: ${editingArticleId}` : "Create a new public insight."}
                </p>
                <Form {...articleForm}>
                    <form 
                    onSubmit={articleForm.handleSubmit(onArticleSubmit)} 
                    className={cn(
                        "space-y-8 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl mb-16",
                        language === 'rtl' && 'font-arabic'
                    )}
                    dir={language}
                    >
                        <FormField
                            control={articleForm.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter insight title" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={articleForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A brief summary of the insight" {...field} />
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
                                <Input type="hidden" {...articleForm.register("imageUrl")} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        </div>
                        <FormField
                            control={articleForm.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Content</FormLabel>
                                <FormControl>
                                    <Textarea 
                                    placeholder="Write the full insight content here. The AI will automatically style it." 
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
                            control={articleForm.control}
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
                            <Button type="button" variant="outline" onClick={cancelEditArticle} className="w-full">
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" size="lg" className="w-full group" disabled={articleForm.formState.isSubmitting || isProcessingArticle}>
                            {(articleForm.formState.isSubmitting || isProcessingArticle) ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    {isProcessingArticle ? 'AI is Styling...' : (editingArticleId ? 'Updating...' : 'Publishing...')}
                                </>
                            ) : (editingArticleId ? 'Update Insight' : 'Publish Insight')}
                        </Button>
                        </div>
                    </form>
                </Form>
                <div className="space-y-8">
                    <h2 className="text-2xl md:text-4xl font-headline font-bold">Manage Insights</h2>
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
                                        <Button variant="outline" size="icon" onClick={() => handleEditArticleClick(article)}>
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
                                                This action cannot be undone. This will permanently delete the insight.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteArticle(article.id)}>
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
            </TabsContent>
            <TabsContent value="resources">
                <p className="text-muted-foreground mb-8">
                    {editingResourceId ? `Editing resource: ${editingResourceId}` : "Create a new members-only resource."}
                </p>
                <Form {...resourceForm}>
                    <form onSubmit={resourceForm.handleSubmit(onResourceSubmit)} className="space-y-8 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl mb-16">
                        <FormField control={resourceForm.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Internal Title</FormLabel>
                                <FormControl><Input placeholder="e.g., AI in PMOs Q2" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={resourceForm.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl><Input placeholder="e.g., Strategic Advisory" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={resourceForm.control} name="headline" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Headline</FormLabel>
                                <FormControl><Textarea placeholder="The main, bold statement or title of the resource" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={resourceForm.control} name="hook" render={({ field }) => (
                            <FormItem>
                                <FormLabel>The Hook</FormLabel>
                                <FormControl><Textarea placeholder="A compelling sentence or question to draw the reader in" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={resourceForm.control} name="keyInsight" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Key Insight</FormLabel>
                                <FormControl><Textarea placeholder="The core takeaway or conclusion" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="flex gap-4">
                            {editingResourceId && (
                                <Button type="button" variant="outline" onClick={cancelEditResource} className="w-full">Cancel</Button>
                            )}
                            <Button type="submit" size="lg" className="w-full group" disabled={resourceForm.formState.isSubmitting || isProcessingResource}>
                                {isProcessingResource ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</>
                                ) : (editingResourceId ? 'Update Resource' : 'Publish Resource')}
                            </Button>
                        </div>
                    </form>
                </Form>
                 <div className="space-y-8">
                    <h2 className="text-2xl md:text-4xl font-headline font-bold">Manage Resources</h2>
                    {resourcesLoading ? (
                        <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
                    ) : (
                        <div className="space-y-4">
                            {resources?.map(resource => (
                                <Card key={resource.id} className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg flex flex-col sm:flex-row justify-between sm:items-center p-4 gap-4">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-lg font-headline">{resource.headline}</CardTitle>
                                        <CardDescription>{resource.category}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="p-0 flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEditResourceClick(resource)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>This will permanently delete this resource.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteResource(resource.id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

    