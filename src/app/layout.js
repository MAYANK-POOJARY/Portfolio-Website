import { Space_Grotesk, Inter } from 'next/font/google';
import '../styles/globals.scss';
import { site } from '@/data/site';
import { profile } from '@/data/profile';
import Providers from '@/components/Providers/Providers';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';
import Preloader from '@/components/Preloader/Preloader';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  // Lets Next.js turn relative links (like '/opengraph-image') into full URLs
  metadataBase: new URL(site.url),

  title: {
    default: site.title,
    template: `%s | ${profile.name}`, // project pages become "Project One | Your Name"
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,

  openGraph: {
    type: 'website',
    siteName: site.siteName,
    title: site.title,
    description: site.description,
    url: '/',
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
};

// Dark address bar on phones
export const viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <SmoothScroll />
          <Preloader />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}