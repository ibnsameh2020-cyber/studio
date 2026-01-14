
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingCvButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="/resume.pdf"
      download="Sameh-Moussa-Resume.pdf"
      aria-label="Download Resume"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed bottom-6 right-6 flex items-center justify-center h-14 bg-primary text-primary-foreground shadow-lg z-50 rounded-full transition-all duration-300 ease-in-out",
        isHovered ? "w-44" : "w-14"
      )}
    >
      <Download className="w-6 h-6 flex-shrink-0" />
      {isHovered && (
        <span
          className={cn(
            "font-medium whitespace-nowrap transition-opacity duration-300 ml-2"
          )}
        >
          Download Resume
        </span>
      )}
    </a>
  );
}
