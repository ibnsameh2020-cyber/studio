
import type { Resource } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="h-full w-full flex flex-col bg-card/30 backdrop-blur-md border border-white/10 p-6">
      <CardHeader className="p-0">
        <Badge variant="secondary" className="mb-4 w-fit">{resource.category}</Badge>
        <CardTitle className="font-headline text-xl text-primary">{resource.headline}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow pt-6 space-y-4">
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">The Hook</h3>
            <p className="text-base text-muted-foreground italic">"{resource.hook}"</p>
        </div>
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">Key Insight</h3>
            <p className="text-base text-foreground font-medium">{resource.keyInsight}</p>
        </div>
      </CardContent>
    </Card>
  );
}
