
"use client";

import type { Article } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';

const formatDate = (date: any) => {
  if (!date) return '';
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');

    const isHeader = (line: string) => {
        // Simple heuristic: short lines that don't end with a period are likely headers.
        const trimmed = line.trim();
        if (trimmed.length > 60 || trimmed.endsWith('.')) {
            return false;
        }
        // Ends with a question mark
        if (trimmed.endsWith('?')) {
            return true;
        }
        // Title Case check
        const words = trimmed.split(' ');
        const capitalizedWords = words.filter(word => word.length > 0 && word[0] === word[0].toUpperCase());
        if (capitalizedWords.length / words.length > 0.6) {
            return true;
        }
        return false;
    };
    
    return lines.map((line, index) => {
        if (isHeader(line)) {
            return <h2 key={index} className="text-2xl font-headline font-bold mt-8 mb-4">{line}</h2>;
        }
        return <p key={index} className="mb-4">{line}</p>;
    });
};


export default function ArticleDetailsClient({ article }: { article: Article }) {

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="max-w-4xl mx-auto">
        
        {article.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg border border-border/20">
            <Image 
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{article.title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
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

        <article className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 mb-12">
          {formatContent(article.content)}
        </article>

        <div className="flex flex-wrap gap-2 justify-end">
          {Array.isArray(article.tags) && article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

      </div>
    </div>
  );
}

    