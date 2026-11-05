import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';
import { site } from '@/data/site';

export const alt = 'Portfolio preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const host = site.url.replace(/^https?:\/\//, '');

  // Note: this renderer only supports a subset of CSS.
  // Every element with more than one child needs display: 'flex'.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(198,255,61,0.28), rgba(10,10,10,0) 55%)',
          color: '#f2f2f2',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 700 }}>
            {profile.initials}
            <span style={{ color: '#c6ff3d' }}>.</span>
          </div>
          {profile.available && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 22px',
                fontSize: 26,
                color: '#f2f2f2',
                border: '1px solid #262626',
                borderRadius: 999,
                background: '#111111',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: '#c6ff3d',
                }}
              />
              Available for work
            </div>
          )}
        </div>

        {/* Main text */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#c6ff3d',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontSize: 120,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -4,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              maxWidth: 900,
              fontSize: 34,
              color: '#8a8a8a',
            }}
          >
            {profile.tagline}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', fontSize: 26, color: '#8a8a8a' }}>{host}</div>
      </div>
    ),
    { ...size }
  );
}