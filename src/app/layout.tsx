import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';

import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://gradient-png-generator.vercel.app/'),
  title: { default: 'Custom Gradient', template: '' },
  description:
    'Turn your creativity into colors: Try our PNG Gradient Generator!',
  openGraph: {
    title: 'Custom Gradient',
    description:
      'Turn your creativity into colors: Try our PNG Gradient Generator!.',
    url: 'https://gradient-png-generator.vercel.app/',
    siteName: 'Custom Gradient',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Custom Gradient',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between container  max-w-screen-2xl">
          {children}
        </main>
      </body>
    </html>
  );
}
