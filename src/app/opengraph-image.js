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
          background: '#F5F2EA',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#4F4D47', fontSize: 26 }}>
          Founder of Revvoo · Growth strategist
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              color: '#141413',
              lineHeight: 0.95,
              letterSpacing: '-0.05em',
            }}
          >
            Xander Cayetano
          </div>
          <div style={{ display: 'flex', color: '#4F4D47', fontSize: 32, marginTop: 32 }}>
            Marketing systems that drive real revenue.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
