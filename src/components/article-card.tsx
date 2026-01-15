
import type { Article } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';

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

  return (
    <Link href={`/articles/${article.id}`}>
        <Card className={cn(
          "h-full w-full flex flex-col group overflow-hidden cursor-pointer",
          "bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300",
          "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
        )}>
           {article.imageUrl && (
                <div className="relative aspect-video">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}
            <div className={cn("flex flex-col flex-grow")}>
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
