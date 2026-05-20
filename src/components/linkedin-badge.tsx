"use client";

import React from 'react';

/**
 * Custom LinkedIn Profile Badge
 * Updated to match the site's theme (translucent background, standard card size).
 */
export default function LinkedInBadge() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="w-full h-full bg-card/30 backdrop-blur-md border border-white/10 rounded-lg p-6 flex flex-col items-center relative transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group">
        
        {/* LinkedIn Logo SVG - Top Right */}
        <div className="absolute top-4 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </div>

        {/* Profile Image - Circular, Branded Border */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-[#0A66C2] overflow-hidden mb-4 shadow-sm shrink-0">
          <img 
            src="https://i.ibb.co/RGrcZgdV/Adobe-Express-file.png" 
            alt="Sameh Moussa" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Details */}
        <div className="text-center space-y-1 mb-6 flex-grow flex flex-col justify-center">
          <h3 className="text-foreground font-headline font-semibold text-base md:text-xl leading-tight">
            Sameh Moussa
          </h3>
          <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-widest">
            Professional Profile
          </p>
        </div>

        {/* CTA Button */}
        <a 
          href="https://sa.linkedin.com/in/samehmoussa?trk=profile-badge" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-2 bg-[#0A66C2] hover:bg-[#004182] text-white font-sans font-semibold text-center rounded-full transition-colors duration-300 text-xs md:text-sm"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
