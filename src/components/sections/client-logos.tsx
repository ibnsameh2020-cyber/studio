
"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const clientLogos = [
    {
      name: 'Saudi Irrigation Organization',
      logo: (
        <div className="relative w-40 h-40">
          <Image
            src="https://i.ibb.co/kzQmy89/70bee6de-6292-4040-bd78-4b8ed275e938-removalai-preview.png"
            alt="Saudi Irrigation Organization Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      name: 'Salehiya',
      logo: (
        <div className="relative w-40 h-40">
          <Image
            src="https://i.ibb.co/pBk2bKKy/536ae902-2fc5-4679-91e6-7af31fcbfea9-removalai-preview.png"
            alt="Salehiya Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
        name: 'Rosmiman®',
        logo: (
            <div className="relative w-40 h-16">
            <Image
                src="https://i.ibb.co/Rps1TB7f/rosmiman-Logo.png"
                alt="Rosmiman Logo"
                fill
                className="object-contain"
            />
            </div>
        ),
    },
    {
      name: 'Repotech',
      logo: (
        <div className="relative w-40 h-16">
          <Image
            src="https://i.ibb.co/B202P1JK/R.png"
            alt="Repotech Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      name: 'Method',
      logo: (
        <div className="relative w-40 h-40">
          <Image
            src="https://i.ibb.co/GvghpwsX/Method.png"
            alt="Method Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      name: 'ESG',
      logo: (
        <div className="relative w-40 h-40">
          <Image
            src="https://i.ibb.co/G4MnBprK/ESG.webp"
            alt="ESG Logo"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      name: 'Olympus',
      logo: (
        <div className="relative w-40 h-16">
          <Image
            src="https://i.ibb.co/j9fm4yYz/Olympus-Corporation-logo-svg.png"
            alt="Olympus Logo"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
        name: 'King Fahd Medical City',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/DgTk9pVf/KFMC.png" alt="King Fahd Medical City Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'King Faisal Specialist Hospital & Research Centre',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/35HyVWm5/e53142f9-cc31-493d-bb5a-2bce7a936246-removalai-preview.png" alt="King Faisal Specialist Hospital & Research Centre Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'Ministry of Health Saudi Arabia',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/r2hpzd1G/Logo-ministry-of-health-saudi-arabia-identity-transparent-PNG.png" alt="Ministry of Health Saudi Arabia Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'King Saud Medical City',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/Df9zpCcg/ksmc.png" alt="King Saud Medical City Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'Royal Commission for Jubail and Yanbu',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/6Rgm389d/RCJY-Logo-New-svg.png" alt="Royal Commission for Jubail and Yanbu Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'Princess Noura University',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/p6VLhk9c/PNU.png" alt="Princess Noura University Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'Saudi Arabian National Guard',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/3V1Xrk9/image.png" alt="Saudi Arabian National Guard Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'Unión Fenosa',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/6JmXmbQZ/3d2f8725-2402-4bf4-841b-7aa21d304504-removalai-preview.png" alt="Unión Fenosa Gas Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'New Giza',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/gZTwVs5z/b87e9262-3c1c-4bc7-b282-ae06918f4581-removalai-preview.png" alt="New Giza Logo" fill className="object-contain" />
          </div>
        ),
    },
    {
        name: 'SEGAS',
        logo: (
          <div className="relative w-40 h-24">
            <Image src="https://i.ibb.co/gZhkDrGv/a45997d6-35a4-43fc-971b-904816869ae8-removalai-preview.png" alt="SEGAS Logo" fill className="object-contain" />
          </div>
        ),
    },      
];

export default function ClientLogosSection() {
    const mobileLogosRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const logosElement = mobileLogosRef.current;
        if (!logosElement) return;

        let scrollInterval: NodeJS.Timeout;
        const startScrolling = () => {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                if (logosElement.scrollWidth > logosElement.clientWidth) {
                    const isAtLoopPoint = logosElement.scrollLeft >= logosElement.scrollWidth / 2;
                    if (isAtLoopPoint) {
                        logosElement.scrollLeft = 0;
                    } else {
                        logosElement.scrollLeft += 1;
                    }
                }
            }, 30);
        };

        let resumeTimeout: NodeJS.Timeout;
        const handleTouchStart = () => {
            clearInterval(scrollInterval);
            clearTimeout(resumeTimeout);
        };

        const handleTouchEnd = () => {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(startScrolling, 2000); 
        };

        startScrolling();
        logosElement.addEventListener('touchstart', handleTouchStart, { passive: true });
        logosElement.addEventListener('touchend', handleTouchEnd, { passive: true });
        logosElement.addEventListener('touchcancel', handleTouchEnd, { passive: true });

        return () => {
            clearInterval(scrollInterval);
            clearTimeout(resumeTimeout);
            if (logosElement) {
                logosElement.removeEventListener('touchstart', handleTouchStart);
                logosElement.removeEventListener('touchend', handleTouchEnd);
                logosElement.removeEventListener('touchcancel', handleTouchEnd);
            }
        };
    }, []);

    return (
        <div className="w-full" data-reveal>
            <h4 className="text-center text-xl md:text-3xl font-headline font-semibold mb-12">You are in good company.</h4>
            
            {/* Desktop: Animated Marquee */}
            <div 
                className="hidden md:block w-full overflow-hidden"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
            >
                <div className="flex w-fit animate-marquee-scroll hover:[animation-play-state:paused]">
                    {[...clientLogos, ...clientLogos].map((client, index) => (
                        <div key={`${client.name}-d-${index}`} className="flex-shrink-0 mx-4">
                            <div title={client.name} className="bg-primary/30 backdrop-blur-sm border border-primary/50 rounded-2xl shadow-2xl shadow-primary/10 flex items-center justify-center h-40 w-64 p-6">
                                {client.logo}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Mobile: JS-powered auto-scroll */}
            <div ref={mobileLogosRef} className="md:hidden w-full overflow-x-auto flex space-x-4">
                {[...clientLogos, ...clientLogos].map((client, index) => (
                    <div key={`${client.name}-m-${index}`} className="flex-shrink-0">
                        <div title={client.name} className="bg-primary/30 backdrop-blur-sm border border-primary/50 rounded-2xl shadow-2xl shadow-primary/10 flex items-center justify-center h-40 w-64 p-6">
                            {client.logo}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
