
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Target, TrendingUp, Users, Cpu, Handshake, Shield } from 'lucide-react';

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(img => img.id === 'about-portrait');

    const journeySteps = [
        {
            icon: <Cpu className="w-6 h-6 text-primary" />,
            title: "The Engineering Foundation",
            description: "My career began with a foundation in the logical, structured world of engineering. This taught me the importance of precision, process, and problem-solving from the ground up. However, I quickly realized that the greatest technical solution is ineffective if it doesn't solve the right problem or align with the larger business vision."
        },
        {
            icon: <Handshake className="w-6 h-6 text-primary" />,
            title: "Bridging Tech & Business",
            description: "This realization sparked my transition into project and program management, where I began to bridge the gap between technical teams and business stakeholders. For over 20 years, I've had the privilege of leading complex, large-scale digital transformation initiatives for both government and private sector giants, managing portfolios exceeding $120M."
        },
        {
            icon: <Shield className="w-6 h-6 text-primary" />,
            title: "Strategic Governance Focus",
            description: "Today, my focus is on strategic governance. I help organizations build and mature their Project Management Offices (PMOs), transforming them from administrative functions into powerful strategic assets that drive efficiency, manage risk, and deliver undeniable value."
        }
    ];

    const [firstJourneyStep, ...remainingJourneySteps] = journeySteps;

    const values = [
        {
            icon: <Target className="w-10 h-10 text-primary" />,
            title: "Strategy-Driven Execution",
            description: "I believe that flawless execution is meaningless unless it's tightly aligned with strategic objectives. My focus is always on the 'why' behind the 'what'."
        },
        {
            icon: <TrendingUp className="w-10 h-10 text-primary" />,
            title: "Value Over Volume",
            description: "I prioritize initiatives that deliver measurable ROI and tangible business value, moving organizations beyond 'busy work' to impactful outcomes."
        },
        {
            icon: <Users className="w-10 h-10 text-primary" />,
            title: "People-Centric Leadership",
            description: "Technology and processes are only as good as the people who use them. I am passionate about coaching teams and empowering leaders to excel."
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
            <AnimatedSection>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold">From Engineering to Strategy</h1>
                    <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                        My journey has been one of evolution—from the precision of engineering to the complexities of strategic portfolio governance.
                    </p>
                </div>
            </AnimatedSection>

            <AnimatedSection style={{ animationDelay: '150ms' }}>
                <div className="max-w-6xl mx-auto mb-24">
                    <div className="grid md:grid-cols-2 gap-12 items-start mb-8">
                        {firstJourneyStep && (
                            <div 
                              className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg p-6 rounded-xl flex items-start gap-6 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex-shrink-0 mt-1 bg-primary/10 p-4 rounded-full border-2 border-primary/20">
                                    {firstJourneyStep.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-headline font-semibold text-primary mb-2">{firstJourneyStep.title}</h3>
                                    <p className="text-base text-muted-foreground leading-relaxed">{firstJourneyStep.description}</p>
                                </div>
                            </div>
                        )}
                        <div className="relative aspect-square max-w-md mx-auto w-full self-center">
                             {aboutImage && (
                                <Image
                                    src={aboutImage.imageUrl}
                                    alt="Eng. Sameh Moussa"
                                    fill
                                    data-ai-hint={aboutImage.imageHint}
                                    className="object-cover rounded-xl shadow-2xl shadow-primary/20 border-4 border-white/10"
                                />
                            )}
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        {remainingJourneySteps.map((step, index) => (
                            <div 
                              key={index} 
                              className="bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg p-6 rounded-xl flex items-start gap-6 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex-shrink-0 mt-1 bg-primary/10 p-4 rounded-full border-2 border-primary/20">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-headline font-semibold text-primary mb-2">{step.title}</h3>
                                    <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
            
            <Separator className="my-24" />

            <AnimatedSection style={{ animationDelay: '300ms' }}>
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold">My Philosophy</h2>
                    <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Three core principles guide my approach to every challenge.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {values.map((value, index) => (
                        <div key={index} className="text-center bg-card/30 backdrop-blur-sm border border-border/20 shadow-xl p-8 rounded-xl flex flex-col items-center">
                           <div className="mb-6">{value.icon}</div>
                           <h3 className="text-xl font-headline font-semibold mb-2">{value.title}</h3>
                           <p className="text-base text-muted-foreground flex-grow">{value.description}</p>
                        </div>
                    ))}
                </div>
            </AnimatedSection>
        </div>
    );
}
