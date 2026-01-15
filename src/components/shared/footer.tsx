
"use client";

import { Lightbulb, Facebook, Linkedin, Mail, Phone, Copy } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


// A simple SVG for WhatsApp as it's not in lucide-react
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );
  
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
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied!',
        description: 'Phone number copied to clipboard.',
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        title: 'Error',
        description: 'Failed to copy phone number.',
        variant: 'destructive',
      });
    });
  };

  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              <p className="text-lg font-headline font-bold">
                Sameh insights by Eng. Sameh Moussa
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary"/>
                    <a href="mailto:hello@johndoe.com" className="hover:text-primary transition-colors">hello@johndoe.com</a>
                </div>
                 <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary"/>
                    <button onClick={() => copyToClipboard('+1 (234) 567-890')} className="flex items-center gap-1 group">
                        <span className="hover:text-primary transition-colors">+1 (234) 567-890</span>
                        <Copy className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
             <div className="flex gap-4">
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                </Link>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <XIcon className="w-6 h-6" />
                </Link>
                <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <WhatsAppIcon className="w-6 h-6" />
                </Link>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="w-6 h-6" />
                </Link>
            </div>
            <div className="text-sm text-muted-foreground mt-2 text-center md:text-right">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <p>Powered by Abdulrahman Sameh Moussa</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
