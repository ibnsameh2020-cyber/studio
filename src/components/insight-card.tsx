
import type { Insight } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="h-full w-full flex flex-col bg-card/30 backdrop-blur-md border border-white/10 p-6">
      <CardHeader className="p-0">
        <Badge variant="secondary" className="mb-4 w-fit">{insight.category}</Badge>
        <CardTitle className="font-headline text-xl text-primary">{insight.headline}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow pt-6 space-y-4">
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">The Hook</h3>
            <p className="text-base text-muted-foreground italic">"{insight.hook}"</p>
        </div>
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">Key Insight</h3>
            <p className="text-base text-foreground font-medium">{insight.keyInsight}</p>
        </div>
      </CardContent>
    </Card>
  );
}
