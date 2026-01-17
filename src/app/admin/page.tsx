
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


const insightSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  category: z.string().min(3, "Category must be at least 3 characters."),
  headline: z.string().min(10, "Headline must be at least 10 characters."),
  hook: z.string().min(10, "The Hook must be at least 10 characters."),
  keyInsight: z.string().min(10, "Key Insight must be at least 10 characters."),
});
type InsightFormValues = z.infer<typeof insightSchema>;

const resourceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Short description must be at least 10 characters."),
  content: z.string().min(50, "Full content must be at least 50 characters."),
  tags: z.string().min(3, "Please add at least one tag."),
  imageUrl: z.string().optional(),
  language: z.enum(['ltr', 'rtl']).default('ltr'),
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
  
  const [editingInsightId, setEditingInsightId] = useState<string | null>(null);
  const [isProcessingInsight, setIsProcessingInsight] = useState(false);
  
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [isProcessingResource, setIsProcessingResource] = useState(false);

  const insightForm = useForm<InsightFormValues>({
    resolver: zodResolver(insightSchema),
    defaultValues: {
      title: "",
      category: "",
      headline: "",
      hook: "",
      keyInsight: "",
    },
  });
  
  const resourceForm = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: "",
      imageUrl: "",
      language: "ltr",
    },
  });

  const imageUrl = resourceForm.watch("imageUrl");
  const language = resourceForm.watch("language");
  const resourceTitle = resourceForm.watch("title");

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);

  useEffect(() => {
    if (isRTL(resourceTitle)) {
      resourceForm.setValue('language', 'rtl');
    } else {
      resourceForm.setValue('language', 'ltr');
    }
  }, [resourceTitle, resourceForm]);

  // START: One-time migration for old articles (now resources)
  useEffect(() => {
    const runMigration = async () => {
        if (!firestore || sessionStorage.getItem('articlesMigrated_v2')) {
            return;
        }
        
        // This migration logic might now apply to the 'resources' collection
        // if old articles have become resources. We'll check the 'articles'
        // collection for any remaining long-form content that needs migrating.
        console.log("Checking for legacy articles to migrate...");

        const articlesRef = collection(firestore, "articles");
        const querySnapshot = await getDocs(articlesRef);
        let migratedCount = 0;
        
        for (const doc of querySnapshot.docs) {
          const article = doc.data();
          // Heuristic to check if it's an old, long-form article
          if (article.content && typeof article.content === 'string' && !article.headline) {
              console.log(`Found legacy article to migrate/move: ${doc.id}`);
              try {
                  const result = await formatArticle({ content: article.content });
                  const formattedContent = result.structuredContent;

                  // Move to resources collection
                  const resourceRef = doc(firestore, "resources", doc.id);
                  await setDoc(resourceRef, {
                      ...article,
                      formattedContent,
                  }, { merge: true });
                  
                  // Delete from articles collection
                  await deleteDoc(doc.ref);
                  migratedCount++;

              } catch(e) {
                  console.error(`Failed to migrate article ${doc.id}:`, e);
              }
          }
        }
        
        if (migratedCount > 0) {
            toast({
                title: "Migration Complete",
                description: `Successfully moved and upgraded ${migratedCount} legacy articles to resources.`
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
    const seedInsights = async () => {
        if (!firestore || !isAdmin || sessionStorage.getItem('insightsSeeded_v2')) {
            return;
        }

        const insightsToSeed = [
            {
                id: 'the-ai-warning',
                title: 'The AI Warning',
                category: 'Artificial Intelligence & Strategy',
                headline: 'The "Godfather of AI" Warns: 6 Shocking Truths About Our Future',
                hook: 'Yoshua Bengio, one of the founding fathers of AI, broke his silence for one reason: "Love for his children."',
                keyInsight: 'We are not programming AI; we are raising it. And it’s learning to deceive us.',
            },
            {
                id: 'strategic-efficiency',
                title: 'Strategic Efficiency',
                category: 'Vision 2030 & Operational Excellence',
                headline: 'Value Engineering: The Strategic Blueprint for Vision 2030',
                hook: 'In an era of fiscal tightening, how do we achieve "more with less"?',
                keyInsight: 'Optimizing spend without compromising quality is the cornerstone of sustainable development.',
            },
            {
                id: 'modern-leadership',
                title: 'Modern Leadership',
                category: 'Leadership & Culture',
                headline: 'The Strategic Guide to Leading Multi-Generational Teams',
                hook: 'For the first time in history, four generations (Boomers to Gen Z) are working under one roof. Is this a conflict trap or a strategic asset?',
                keyInsight: 'Stop managing generations. Start leading humans.',
            },
            {
                id: 'the-nice-guy-syndrome',
                title: 'The "Nice Guy" Syndrome',
                category: 'Self-Development & Psychology',
                headline: 'The "Nice Guy" Syndrome: Why Kindness Might Be Destroying Your Career',
                hook: 'Are you the "candle" that burns itself out to light the way for others?',
                keyInsight: 'Your value doesn\'t come from infinite sacrifice. It comes from being authentic.',
            }
        ];

        console.log("Checking if insights need to be seeded...");
        
        let insightsAdded = 0;
        for (const insightData of insightsToSeed) {
            const insightRef = doc(firestore, "articles", insightData.id);
            const docSnap = await getDoc(insightRef);

            if (!docSnap.exists()) {
                try {
                    console.log(`Seeding insight: ${insightData.id}`);
                    await setDoc(insightRef, {
                        ...insightData,
                        authorId: user?.uid || 'admin',
                        date: serverTimestamp(),
                    });
                    insightsAdded++;
                } catch (error) {
                    console.error(`Failed to seed insight ${insightData.id}:`, error);
                }
            }
        }

        if (insightsAdded > 0) {
            toast({
                title: "Seeding New Insights",
                description: `Added ${insightsAdded} new insights to your collection.`,
            });
        }
        
        sessionStorage.setItem('insightsSeeded_v2', 'true');
    };

    if (firestore && isAdmin) {
      seedInsights();
    }
  }, [firestore, isAdmin, toast, user]);
  // END: One-time seed for new insights


  const handleUploadSuccess = (result: UploadWidgetResult) => {
    if (result.info && typeof result.info.secure_url === 'string') {
        resourceForm.setValue('imageUrl', result.info.secure_url);
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

  const emptyInsightFormValues = {
      title: "",
      category: "",
      headline: "",
      hook: "",
      keyInsight: "",
  };

  const onInsightSubmit: SubmitHandler<InsightFormValues> = async (data) => {
    if (!firestore || !user) {
        toast({ title: "Error", description: "Firestore or user not available.", variant: "destructive" });
        return;
    }
    setIsProcessingInsight(true);
    try {
        const slug = editingInsightId || createSlug(data.title);
        const insightRef = doc(firestore, "articles", slug); // Insights are stored in 'articles' collection
        await setDoc(insightRef, {
            id: slug,
            ...data,
            authorId: user.uid,
            date: serverTimestamp(),
        }, { merge: true });
        toast({
            title: `Insight ${editingInsightId ? 'Updated' : 'Published'}!`,
            description: "Your new insight is now live.",
        });
        insightForm.reset(emptyInsightFormValues);
        setEditingInsightId(null);
    } catch (error: any) {
         toast({
            title: "Error",
            description: `Could not publish insight. ${error.message}`,
            variant: "destructive",
        });
    } finally {
        setIsProcessingInsight(false);
    }
  };

  const handleEditInsightClick = (insight: Article) => {
    setEditingInsightId(insight.id);
    insightForm.reset(insight);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteInsight = async (insightId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, "articles", insightId));
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
  
  const cancelEditInsight = () => {
    setEditingInsightId(null);
    insightForm.reset(emptyInsightFormValues);
  }

  const emptyResourceFormValues = {
    title: "",
    description: "",
    content: "",
    tags: "",
    imageUrl: "",
    language: 'ltr' as 'ltr' | 'rtl',
  };

  const onResourceSubmit: SubmitHandler<ResourceFormValues> = async (data) => {
    if (!firestore) {
        toast({ title: "Error", description: "Firestore not available.", variant: "destructive" });
        return;
    }

    setIsProcessingResource(true);

    try {
        toast({
            title: "AI Stylist at Work",
            description: "Automatically structuring and styling your resource...",
        });
        const result = await formatArticle({ content: data.content });
        const formattedContent = result.structuredContent;

        const slug = editingResourceId || createSlug(data.title);
        const resourceRef = doc(firestore, "resources", slug);

        await setDoc(resourceRef, {
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
            title: `Resource ${editingResourceId ? 'Updated' : 'Published'}!`,
            description: `Your resource is now ${editingResourceId ? 'updated' : 'available'}.`,
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
    resourceForm.reset({
      title: resource.title,
      description: resource.description,
      content: resource.content,
      tags: Array.isArray(resource.tags) ? resource.tags.join(', ') : '',
      imageUrl: resource.imageUrl || '',
      language: resource.language || 'ltr',
    });
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
                    {editingInsightId ? `Editing insight: ${editingInsightId}` : "Create a new public insight."}
                </p>
                <Form {...insightForm}>
                    <form onSubmit={insightForm.handleSubmit(onInsightSubmit)} className="space-y-8 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl mb-16">
                        <FormField control={insightForm.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Internal Title</FormLabel>
                                <FormControl><Input placeholder="e.g., AI in PMOs Q2" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={insightForm.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl><Input placeholder="e.g., Strategic Advisory" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={insightForm.control} name="headline" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Headline</FormLabel>
                                <FormControl><Textarea placeholder="The main, bold statement or title of the insight" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={insightForm.control} name="hook" render={({ field }) => (
                            <FormItem>
                                <FormLabel>The Hook</FormLabel>
                                <FormControl><Textarea placeholder="A compelling sentence or question to draw the reader in" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={insightForm.control} name="keyInsight" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Key Insight</FormLabel>
                                <FormControl><Textarea placeholder="The core takeaway or conclusion" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="flex gap-4">
                            {editingInsightId && (
                                <Button type="button" variant="outline" onClick={cancelEditInsight} className="w-full">Cancel</Button>
                            )}
                            <Button type="submit" size="lg" className="w-full group" disabled={insightForm.formState.isSubmitting || isProcessingInsight}>
                                {isProcessingInsight ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</>
                                ) : (editingInsightId ? 'Update Insight' : 'Publish Insight')}
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
                            {articles?.map(insight => (
                                <Card key={insight.id} className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg flex flex-col sm:flex-row justify-between sm:items-center p-4 gap-4">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-lg font-headline">{insight.headline}</CardTitle>
                                        <CardDescription>{insight.category}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="p-0 flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEditInsightClick(insight)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>This will permanently delete this insight.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteInsight(insight.id)}>Delete</AlertDialogAction>
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
                    <form 
                    onSubmit={resourceForm.handleSubmit(onResourceSubmit)} 
                    className={cn(
                        "space-y-8 bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-xl mb-16",
                        language === 'rtl' && 'font-arabic'
                    )}
                    dir={language}
                    >
                        <FormField
                            control={resourceForm.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter resource title" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={resourceForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A brief summary of the resource" {...field} />
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
                                <Input type="hidden" {...resourceForm.register("imageUrl")} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        </div>
                        <FormField
                            control={resourceForm.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Content</FormLabel>
                                <FormControl>
                                    <Textarea 
                                    placeholder="Write the full resource content here. The AI will automatically style it." 
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
                            control={resourceForm.control}
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
                        {editingResourceId && (
                            <Button type="button" variant="outline" onClick={cancelEditResource} className="w-full">
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" size="lg" className="w-full group" disabled={resourceForm.formState.isSubmitting || isProcessingResource}>
                            {(resourceForm.formState.isSubmitting || isProcessingResource) ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    {isProcessingResource ? 'AI is Styling...' : (editingResourceId ? 'Updating...' : 'Publishing...')}
                                </>
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
                                        <CardTitle className="text-lg font-headline">{resource.title}</CardTitle>
                                        <CardDescription>
                                            Published on: {formatDate(resource.date)}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="p-0 flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEditResourceClick(resource)}>
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
                                                This action cannot be undone. This will permanently delete the resource.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteResource(resource.id)}>
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
        </Tabs>
      </div>
    </div>
  );
}
