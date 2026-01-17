"use client";

import { Lightbulb, Linkedin, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

  
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              <p className="text-lg font-headline font-bold">
                Sameh Insights
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary"/>
                    <a href="mailto:contact@samehinsights.com" className="hover:text-primary transition-colors">contact@samehinsights.com</a>
                </div>
                 <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0"/>
                    <div className="flex flex-col items-center md:items-start">
                        <span>Eastern Province, KSA</span>
                        <span className="text-xs text-muted-foreground/80">(Available for remote & on-site consulting)</span>
                    </div>
                </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
             <div className="flex gap-4">
                <Link href="https://www.linkedin.com/in/samehmoussa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                </Link>
                <Link href="https://twitter.com/SamehInsights" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <XIcon className="w-6 h-6" />
                </Link>
            </div>
            <div className="text-sm text-muted-foreground mt-2 text-center md:text-right">
                <p>Sameh Insights © 2026 | Orchestrating Strategic Outcomes</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
