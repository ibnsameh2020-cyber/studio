
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(img => img.id === 'about-portrait');

    return (
        <div className="relative overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 h-[30rem] w-[30rem] bg-primary/20 rounded-full blur-3xl animate-blob-2"></div>
                <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] bg-accent/20 rounded-full blur-3xl animate-blob-1"></div>
                <div className="absolute -bottom-1/4 right-1/4 h-[25rem] w-[25rem] bg-primary/10 rounded-full blur-3xl animate-blob-3"></div>
                <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] bg-accent/10 rounded-full blur-3xl animate-blob-4"></div>
                <div className="absolute top-1/4 right-1/3 h-[22rem] w-[22rem] bg-primary/15 rounded-full blur-3xl animate-blob-5"></div>
                <div className="absolute bottom-1/3 left-1/4 h-[28rem] w-[28rem] bg-accent/15 rounded-full blur-3xl animate-blob-6"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 relative">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-headline font-bold">The Engineer. The Strategist. The Human.</h1>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
                    {/* Image Column */}
                    <div className="md:col-span-2 relative aspect-square max-w-md mx-auto w-full self-center">
                        <div className="relative w-full h-full rounded-full shadow-[0_0_60px_0px_hsl(var(--primary)/0.5)]">
                            {aboutImage && (
                                <Image
                                    src={aboutImage.imageUrl}
                                    alt="Eng. Sameh Moussa"
                                    fill
                                    quality={100}
                                    data-ai-hint={aboutImage.imageHint}
                                    className="object-contain drop-shadow-xl"
                                />
                            )}
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-3 space-y-12">
                        <AnimatedSection style={{ animationDelay: '150ms' }}>
                            <div className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg p-8 rounded-xl transition-all duration-300 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                                <h2 className="text-3xl font-headline font-semibold text-primary mb-4">The Origin: The Engineer's Mindset</h2>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    My career began with a hard hat and a simple equation: Value = Function / Cost. Early in my engineering days, I learned that 'busy' does not mean 'effective'. Whether I was managing turnkey healthcare projects or optimizing infrastructure, my obsession was always Waste Elimination. I realized that operational excellence isn't just about cutting costs; it's about maximizing function without compromising quality.
                                </p>
                            </div>
                        </AnimatedSection>
                        
                        <AnimatedSection style={{ animationDelay: '300ms' }}>
                           <div className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg p-8 rounded-xl transition-all duration-300 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                                <h2 className="text-3xl font-headline font-semibold text-primary mb-4">The Shift: The Strategist's Vision</h2>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    As I moved to managing $120M+ portfolios, I saw a new kind of waste: Strategic Drift. I saw brilliant Vision 2030 strategies crumble because the execution teams were disconnected from the leadership's intent. That’s when I evolved from managing projects to Orchestrating Transformations. Today, I advocate for the 'Cognitive PMO'—using Artificial Intelligence not just to automate tasks, but to govern with foresight. However, as I often warn, we must 'raise' AI carefully, ensuring it aligns with our ethical compass, not just our efficiency goals.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection style={{ animationDelay: '450ms' }}>
                            <div className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg p-8 rounded-xl transition-all duration-300 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                                <h2 className="text-3xl font-headline font-semibold text-primary mb-4">The Core: The Human Element</h2>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    But technology and strategy are useless without people. I believe that the 'Nice Guy' syndrome—sacrificing oneself to please others—is a leadership trap. True leadership is about setting boundaries, fostering psychological safety, and leading humans, not just managing generations. Whether dealing with Boomers or Gen Z, my approach is simple: Empower autonomy, demand results, and protect the team's well-being.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
                
                <Separator className="my-24" />

                <AnimatedSection style={{ animationDelay: '600ms' }}>
                     <div className="text-center max-w-3xl mx-auto bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-300 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                        <h2 className="text-3xl md:text-5xl font-headline font-bold">The Promise</h2>
                        <p className="text-md md:text-lg text-muted-foreground mt-4 leading-relaxed">
                            I don't offer generic templates. I offer a partnership to navigate the chaos of transformation. Let’s build an organization that is efficient by design, strategic by intent, and human by nature.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
