
import type { Resource } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type ResourceCardProps = {
  resource: Resource;
};

const formatDate = (date: any) => {
    if (!date) return '';
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString('en-US');
    }
    return new Date(date).toLocaleDateString('en-US');
};

export default function ResourceCard({ resource }: ResourceCardProps) {

  return (
    <Link href={`/resources/${resource.id}`}>
        <Card className={cn(
          "h-full w-full flex flex-col group overflow-hidden cursor-pointer",
          "bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300",
          "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
        )}>
            {resource.imageUrl && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={resource.imageUrl}
                  alt={resource.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className={cn("flex flex-col flex-grow p-6")}>
              <CardHeader className="p-0">
                {resource.tags && resource.tags.length > 0 && (
                  <Badge variant="secondary" className="mb-2 w-fit">{resource.tags[0]}</Badge>
                )}
                <CardTitle className="font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow pt-4">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{resource.description}</p>
              </CardContent>
              <CardFooter className="p-0 mt-auto flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(resource.date)}</span>
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
