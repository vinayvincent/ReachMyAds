import { ImageResponse } from 'next/og';
import {
  LOGO_BOX,
  LOGO_VIEWBOX,
  MARK_DOT,
  MARK_STROKE,
  MARK_STROKE_WIDTH,
  WORDMARK_PATH,
} from '@/lib/brand';

export const alt = 'Reach My Ads: advertising and lead tracking for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generated rather than shipped as a file, so the card never drifts out of sync
 * with the brand. Uses system fonts only — loading a webfont here would add a
 * network hop to every crawl.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#070b12',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* Logo lockup, drawn from the same geometry as the site header */}
        <div style={{ display: 'flex' }}>
          <svg width="340" height={Math.round((340 * LOGO_BOX.height) / LOGO_BOX.width)} viewBox={LOGO_VIEWBOX}>
            <path
              d={MARK_STROKE}
              fill="none"
              stroke="#ffffff"
              strokeWidth={MARK_STROKE_WIDTH}
              strokeLinecap="round"
            />
            <circle cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} fill="#ffffff" />
            <path d={WORDMARK_PATH} fill="#ffffff" />
          </svg>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 700,
              color: '#f2f7ff',
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              maxWidth: 900,
            }}
          >
            Your ads, running.
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 700,
              color: '#5ca0ff',
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
            }}
          >
            Your enquiries, answered.
          </div>
          <div style={{ fontSize: 27, color: '#a8b8ce', marginTop: 26, maxWidth: 880, lineHeight: 1.4 }}>
            Three ad networks, one inbox, and a plain answer about what each customer cost.
          </div>
        </div>

        {/* Footer rail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {['Google', 'Instagram', 'WhatsApp', 'Facebook', 'YouTube', 'LinkedIn'].map((name) => (
            <div
              key={name}
              style={{
                fontSize: 19,
                color: '#75869c',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 999,
                padding: '8px 18px',
              }}
            >
              {name}
            </div>
          ))}
          <div style={{ marginLeft: 'auto', fontSize: 20, color: '#5ca0ff', fontWeight: 600 }}>
            Live now across India
          </div>
        </div>
      </div>
    ),
    size,
  );
}
