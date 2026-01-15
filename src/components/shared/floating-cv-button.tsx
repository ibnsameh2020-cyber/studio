
"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function FloatingCvButton() {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Downloading Resume",
      description: "Your download has started.",
    });
  };

  return (
    <a
      href="/resume.pdf"
      download="Sameh-Moussa-Strategic-PMO-Leader.pdf"
      aria-label="Download Resume"
      onClick={handleDownload}
      className={cn(
        "group fixed bottom-6 right-6 flex items-center justify-center h-14 w-14 bg-primary text-primary-foreground shadow-lg z-50 rounded-full transition-all duration-300 ease-in-out",
        "hover:w-52"
      )}
    >
      <div className="relative flex items-center justify-center w-full">
        <Download className="absolute w-6 h-6 flex-shrink-0 transition-transform duration-300 ease-in-out group-hover:-translate-x-[4.5rem]" />
        <span
          className={cn(
            "font-medium whitespace-nowrap transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-x-4"
          )}
        >
          Download Resume
        </span>
      </div>
    </a>
  );
}
