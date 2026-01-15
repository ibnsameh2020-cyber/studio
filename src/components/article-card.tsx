import type { Article } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ArticleCardProps = {
  article: Article;
  isFeatured?: boolean;
};

const formatDate = (date: any) => {
    if (!date) return '';
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString('en-US');
    }
    return new Date(date).toLocaleDateString('en-US');
};

export default function ArticleCard({ article, isFeatured = false }: ArticleCardProps) {
  const defaultImage = PlaceHolderImages.find(img => img.id === 'article-1');
  const imageUrl = (article.imageKeywords && article.imageKeywords.trim() !== '')
    ? `https://source.unsplash.com/random/800x600/?${encodeURIComponent(article.imageKeywords)}` 
    : defaultImage?.imageUrl || 'https://picsum.photos/seed/1/800/600';
  
  const imageHint = article.imageKeywords?.split(',')[0] || defaultImage?.imageHint || 'technology';

  return (
    <Link href={`/articles/${article.id}`}>
        <Card className={cn(
          "h-full w-full flex flex-col group overflow-hidden cursor-pointer",
          "bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300",
          "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2",
          isFeatured ? "md:flex-row" : "flex-col"
        )}>
            <div className={cn(
              "relative overflow-hidden",
              isFeatured ? "md:w-1/2 aspect-video" : "w-full aspect-video"
            )}>
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                data-ai-hint={imageHint}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className={cn("flex flex-col flex-grow", isFeatured ? "md:w-1/2" : "w-full")}>
              <CardHeader>
                <CardTitle className="font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
              </CardContent>
              <CardFooter className="mt-auto flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.date)}</span>
                      </div>
                  </div>
                  <div className="flex items-center text-sm text-primary group-hover:underline">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
              </CardFooter>
            </div>
        </Card>
    </Link>
  );
}
