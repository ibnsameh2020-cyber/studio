import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import FloatingCvButton from '@/components/shared/floating-cv-button';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Script from 'next/script';
import { ThemeProvider } from '@/components/shared/theme-provider';

export const metadata: Metadata = {
  title: 'Sameh insights | A Modern Portfolio',
  description: 'A modern, high-performance personal portfolio website built with Next.js and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <Header />
            <main className="relative">
              <div className="fixed inset-0 bg-background/90 z-[-1]"></div>
              {children}
            </main>
            <FloatingCvButton />
            <Footer />
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
        <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />
      </body>
    </html>
  );
}
