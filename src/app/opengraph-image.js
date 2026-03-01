import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Xander Cayetano | Entrepreneur, Growth Strategist, Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(237,232,208,0.04) 0%, transparent 70%)',
          }}
        />

        <p
          style={{
            color: '#8A8578',
            fontSize: 18,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            fontWeight: 400,
            marginBottom: 32,
          }}
        >
          Entrepreneur · Growth Strategist · Builder
        </p>

        <h1
          style={{
            fontFamily: 'serif',
            fontSize: 96,
            fontWeight: 700,
            color: '#EDE8D0',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Xander Cayetano
        </h1>

        <p
          style={{
            color: '#B5B0A0',
            fontSize: 24,
            fontFamily: 'sans-serif',
            fontWeight: 400,
            marginTop: 28,
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Marketing systems that drive real revenue. Founder of Revvoo.
        </p>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 2,
            background: '#EDE8D0',
            opacity: 0.3,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
