"use client";

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

/**
 * Custom LinkedIn Profile Badge
 * Optimized to match CertificateCard dimensions and translucent theme.
 */
export default function LinkedInBadge() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <Card className="w-full h-full bg-card/30 backdrop-blur-md border border-white/10 p-2 md:p-6 flex flex-col items-center relative transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group">
        
        {/* LinkedIn Logo SVG - Top Right */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </div>

        {/* Profile Image - Strict Circular Clip with Container */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full border-[3px] border-[#0A66C2] shadow-lg shrink-0 mt-2 md:mt-0 overflow-hidden">
          <Image 
            src="https://i.ibb.co/qM0Dcdg3/pfp1.jpg" 
            alt="Sameh Moussa" 
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* Text Details */}
        <div className="text-center space-y-0.5 md:space-y-1 mt-3 mb-4 md:mt-4 md:mb-6 flex-grow flex flex-col justify-center">
          <h3 className="text-foreground font-headline font-bold text-xs md:text-xl leading-tight">
            Sameh Moussa
          </h3>
          <p className="text-muted-foreground text-[8px] md:text-sm font-medium uppercase tracking-widest">
            Professional Profile
          </p>
        </div>

        {/* CTA Button */}
        <a 
          href="https://sa.linkedin.com/in/samehmoussa?trk=profile-badge" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-1.5 md:py-2 bg-[#0A66C2] hover:bg-[#004182] text-white font-sans font-semibold text-center rounded-full transition-colors duration-300 text-[10px] md:text-sm"
        >
          View Profile
        </a>
      </Card>
    </div>
  );
}
