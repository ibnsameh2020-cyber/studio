
"use client";

import { useState } from 'react';
import { Lightbulb, Linkedin, Mail, MapPin, Phone, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

export default function Footer() {
  const { toast } = useToast();
  const phoneNumber = "+966 56 557 9000";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
        setIsCopied(true);
        toast({ title: "Copied to clipboard!", description: phoneNumber });
        setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <footer className="bg-background border-t border-border/30 relative z-[90]">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-8 h-8 text-primary" />
              <p className="text-2xl font-headline font-bold">Sameh Insights</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary"/>
                    <a href="mailto:Sameh@samehinsights.com" className="hover:text-primary transition-colors">Sameh@samehinsights.com</a>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary"/>
                    <button onClick={handleCopy} className="hover:text-primary transition-colors flex items-center gap-2">
                      <span>{phoneNumber}</span>
                      {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
                 <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                    <div className="flex flex-col items-center md:items-start">
                        <span>Eastern Province, KSA</span>
                        <span className="text-xs opacity-60">(Available for remote & on-site consulting)</span>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
             <div className="flex gap-6">
                <Link href="https://www.linkedin.com/in/samehmoussa" target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                    <Linkedin className="w-8 h-8" />
                </Link>
                <Link href="https://twitter.com/SamehInsights" target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                    <XIcon className="w-8 h-8" />
                </Link>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right space-y-1">
                <p>Sameh Insights © {new Date().getFullYear()} | Orchestrating Strategic Outcomes</p>
                <p className="text-xs opacity-60">Powered by <span className="font-bold">Abdulrahman Moussa</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
