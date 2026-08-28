import { ImageResponse } from 'next/og'

export const ogImageAlt =
  'Syed Aasim Shah — Senior Full-Stack Engineer & Solution Architect'
export const ogImageSize = { width: 1200, height: 630 }
export const ogImageContentType = 'image/png'

/**
 * Shared Open Graph / Twitter card image, rendered at build time by `next/og`.
 * Used by `app/opengraph-image.tsx` and `app/twitter-image.tsx`.
 */
export function renderOgImage(
  options: {
    title?: string
    eyebrow?: string
    subtitle?: string
    titleFontSize?: number
  } = {},
) {
  const {
    title = 'Syed Aasim Shah',
    eyebrow = 'Senior Full-Stack Engineer & Solution Architect',
    subtitle = 'Backend architecture · Multi-tenant SaaS · VPN infrastructure · Cloud automation · Applied AI',
    titleFontSize = title.length > 32 ? 58 : 84,
  } = options

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#070708',
          backgroundImage:
            'radial-gradient(1000px 480px at 82% -8%, rgba(37,99,235,0.22), transparent 70%)',
          padding: '72px 80px',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          aasimshah.com
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontWeight: 500,
              color: '#8FA3BE',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: titleFontSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 25,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.62)',
              maxWidth: 940,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 56,
            fontSize: 24,
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          <div style={{ display: 'flex' }}>5+ years experience</div>
          <div style={{ display: 'flex' }}>~2M VPN users</div>
          <div style={{ display: 'flex' }}>8+ products launched</div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  )
}
