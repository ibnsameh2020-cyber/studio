import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/shared/theme-provider';
import BackToTopButton from '@/components/shared/back-to-top-button';
import FloatingCallButton from '@/components/shared/floating-call-button';
import SmoothScroll from '@/components/shared/smooth-scroll';
import NavScrollHint from '@/components/shared/nav-scroll-hint';

const siteTitle = 'Sameh Insights | Strategic Digital PMO & Portfolio Governance';
const siteDescription = 'The professional portfolio of Eng. Sameh Moussa, showcasing 20+ years of expertise in digital transformation, leading $120M+ programs, and establishing AI-driven PMOs.';
const siteImage = 'https://i.ibb.co/BK4DtBc5/Untitled-design-4.png';
const siteUrl = 'https://samehinsights.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | Sameh Insights`,
  },
  description: siteDescription,
  keywords: ['Sameh Moussa', 'Strategic PMO', 'Digital Transformation', 'AI Governance', 'Governance', 'Healthcare IT', 'Saudi Arabia', 'Vision 2030'],
  authors: [{ name: 'Eng. Sameh Moussa' }],
  creator: 'Eng. Sameh Moussa',
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Sameh Insights',
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'Sameh Insights Professional Portfolio Preview',
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
    creator: '@SamehInsights',
  },
  icons: {
    icon: '/favicon.ico',
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
            <SmoothScroll>
              <Header />
              <NavScrollHint />
              <main className="relative">
                <div className="fixed inset-0 bg-background/90 z-[-1]"></div>
                {children}
              </main>
              <FloatingCallButton />
              <BackToTopButton />
              <Footer />
            </SmoothScroll>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
