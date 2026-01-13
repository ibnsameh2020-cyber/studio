import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Sameh insights | A Modern Portfolio',
  description: 'A modern, high-performance personal portfolio website built with Next.js and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bgImage = PlaceHolderImages.find(img => img.id === 'background-geometric');
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <Header />
        <main className="relative">
          {bgImage && (
            <Image
              src={bgImage.imageUrl}
              alt={bgImage.description}
              fill
              data-ai-hint={bgImage.imageHint}
              className="object-cover fixed inset-0 z-[-1]"
            />
          )}
          <div className="fixed inset-0 bg-background/90 z-[-1]"></div>
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
