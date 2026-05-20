
"use client";

import React from 'react';

/**
 * Custom Standalone LinkedIn Profile Badge
 * Implemented with Tailwind for React/NextJS compatibility
 * and following exact design specifications.
 */
export default function LinkedInBadge() {
  return (
    <div className="w-full h-full flex items-center justify-center py-4 bg-transparent">
      <div className="w-full max-w-[280px] bg-white rounded-[12px] border border-[#e0e0e0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] group">
        
        {/* LinkedIn Logo SVG - Top Right */}
        <div className="absolute top-4 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </div>

        {/* Profile Image - 110x110, Circular, 3px Blue Border */}
        <div className="w-[110px] h-[110px] rounded-full border-[3px] border-[#0A66C2] overflow-hidden mb-5 shadow-sm">
          <img 
            src="https://i.ibb.co/RGrcZgdV/Adobe-Express-file.png" 
            alt="Sameh Moussa" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Details */}
        <div className="text-center space-y-1 mb-6">
          <h3 className="text-[#1a1a1a] font-sans font-semibold text-xl leading-tight">
            Sameh Moussa
          </h3>
          <p className="text-[#666666] font-sans text-sm font-medium">
            Professional Profile
          </p>
        </div>

        {/* CTA Button - Pill Shaped, #0A66C2 */}
        <a 
          href="https://sa.linkedin.com/in/samehmoussa?trk=profile-badge" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-sans font-semibold text-center rounded-[24px] transition-colors duration-300 text-sm md:text-base"
        >
          Sameh
        </a>
      </div>
    </div>
  );
}
