"use client";

import type { Article } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, User } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

const formatDate = (date: any) => {
  if (!date) return '';
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function ArticleDetailsClient({ article }: { article: Article }) {

  const articleImage = PlaceHolderImages.find(img => img.id === article.imagePlaceholderId);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Published on {formatDate(article.date)}</span>
                </div>
            </div>
        </div>

        {articleImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border/30 shadow-lg mb-12">
                <Image
                src={articleImage.imageUrl}
                alt={article.title}
                fill
                data-ai-hint={articleImage.imageHint}
                className="object-cover"
                />
            </div>
        )}

        <article className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          {article.content}
        </article>

      </div>
    </div>
  );
}
