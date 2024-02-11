import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://gradient-png-generator.vercel.app/'),
  title: { default: 'Gradient PNG Generator', template: '' },
  description: 'Turn your creativity into colors: Try our PNG Gradient Generator!',
  openGraph: {
    title: 'Gradient PNG Generator',
    description: 'Turn your creativity into colors: Try our PNG Gradient Generator!.',
    url: 'https://gradient-png-generator.vercel.app/',
    siteName: 'Gradient PNG Generator',
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
    title: 'Gradient PNG Generator',
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
