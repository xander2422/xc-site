import './globals.css';

export const metadata = {
  title: 'Xander Cayetano — Entrepreneur, Growth Strategist, Builder',
  description: 'Marketing systems that drive real revenue. Built from scratch, proven across 10+ industries. Founder of Revvoo.',
  openGraph: {
    title: 'Xander Cayetano',
    description: 'Marketing systems that drive real revenue. Founder of Revvoo.',
    url: 'https://xandercayetano.com',
    siteName: 'Xander Cayetano',
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
      <body>{children}</body>
    </html>
  );
}
