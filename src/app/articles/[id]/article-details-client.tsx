
"use client";

import type { Article } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

const formatDate = (date: any) => {
  if (!date) return '';
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatContent = (content: string) => {
  const lines = content.split('\n').filter(line => line.trim() !== '');

  const isHeader = (line: string) => {
    const trimmed = line.trim();
    // Main headers are like "1." or "1. Some Text"
    return /^\d+\.\s/.test(trimmed) || /^\d+\.$/.test(trimmed);
  };

  const isSubHeader = (line: string) => {
      const trimmed = line.trim();
      // Sub-headers are like "2.1" or "2.1 Some Text"
      return /^\d+\.\d+\s/.test(trimmed) || /^\d+\.\d+$/.test(trimmed);
  };
  
  const isGenericHeader = (line: string) => {
      const trimmed = line.trim();
      if (trimmed.length > 80 || trimmed.endsWith('.')) return false;
      if (trimmed.endsWith('?')) return true;
      const words = trimmed.split(' ');
      if (words.length > 10) return false;
      const capitalizedWords = words.filter(word => word.length > 0 && word[0] === word[0].toUpperCase());
      if (capitalizedWords.length / words.length > 0.5) return true;
      return false;
  };


  return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (isHeader(trimmedLine)) {
          return <h2 key={index} className="text-3xl font-headline font-bold mt-10 mb-6">{trimmedLine}</h2>;
      }
      if (isSubHeader(trimmedLine)) {
          return <h3 key={index} className="text-2xl font-headline font-semibold mt-8 mb-4">{trimmedLine}</h3>;
      }
       if (isGenericHeader(trimmedLine)) {
            return <h2 key={index} className="text-2xl font-headline font-bold mt-8 mb-4">{trimmedLine}</h2>;
        }
      return <p key={index} className="mb-4 leading-relaxed">{trimmedLine}</p>;
  });
};


export default function ArticleDetailsClient({ article }: { article: Article }) {
  const isRTL = article.language === 'rtl';

  return (
    <div 
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32",
        isRTL && "font-arabic"
      )}
      dir={article.language || 'ltr'}
    >
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

        <div className="flex flex-wrap gap-2" dir="ltr">
          {Array.isArray(article.tags) && article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

      </div>
    </div>
  );
}
