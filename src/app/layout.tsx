
import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/shared/theme-provider';
import Script from 'next/script';
import BackToTopButton from '@/components/shared/back-to-top-button';
import FloatingCallButton from '@/components/shared/floating-call-button';

const siteTitle = 'Sameh Insights | Strategic Digital PMO & Portfolio Governance';
const siteDescription = 'The professional portfolio of Eng. Sameh Moussa, showcasing 20+ years of expertise in digital transformation, leading $120M+ programs, and establishing AI-driven PMOs.';
const siteImage = 'https://i.ibb.co/PsNXTw7y/Untitled-design-1.webp';

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: 'Sameh Insights',
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'Sameh insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Inter:wght@400;500;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
        
      </head>
      <body className={cn("font-body antialiased overflow-x-hidden")}>
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
            <FloatingCallButton />
            <BackToTopButton />
            <Footer />
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

    