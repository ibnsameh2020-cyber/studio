
"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingCvButton() {
  return (
    <a
      href="/resume.pdf"
      download="Sameh-Moussa-Resume.pdf"
      aria-label="Download Resume"
      className={cn(
        "group fixed bottom-6 right-6 flex items-center justify-center h-14 w-14 bg-primary text-primary-foreground shadow-lg z-50 rounded-full transition-all duration-300 ease-in-out",
        "hover:w-52"
      )}
    >
      <Download className="w-6 h-6 flex-shrink-0" />
      <span
        className={cn(
          "font-medium whitespace-nowrap transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-2"
        )}
      >
        Download Resume
      </span>
    </a>
  );
}
