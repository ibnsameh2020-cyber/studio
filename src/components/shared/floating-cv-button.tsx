
"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import Link from "next/link";

export default function FloatingCvButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 z-50"
          >
            <a href="/resume.pdf" download="Sameh-Moussa-Resume.pdf" aria-label="Download CV">
              <Download className="w-6 h-6" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Download CV</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
