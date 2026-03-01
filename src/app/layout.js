import './globals.css';

export const metadata = {
  metadataBase: new URL('https://xandercayetano.com'),
  title: 'Xander Cayetano | Entrepreneur, Growth Strategist, Builder',
  description: 'Marketing systems that drive real revenue. Built from scratch, proven across 10+ industries. Founder of Revvoo.',
  icons: {
    icon: [{ url: '/logo-black.png', type: 'image/png' }],
    apple: '/logo-black.png',
    shortcut: '/logo-black.png',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Xander Cayetano',
    description: 'Marketing systems that drive real revenue. Founder of Revvoo.',
    url: 'https://xandercayetano.com',
    siteName: 'Xander Cayetano',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xander Cayetano',
    description: 'Marketing systems that drive real revenue. Founder of Revvoo.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Xander Cayetano",
              url: "https://xandercayetano.com",
              jobTitle: "Growth Strategist",
              description: "Marketing systems that drive real revenue. Founder of Revvoo.",
              sameAs: [
                "https://www.instagram.com/xander_cayetano/",
                "https://www.linkedin.com/in/xander-cayetano-8a39381b3",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
