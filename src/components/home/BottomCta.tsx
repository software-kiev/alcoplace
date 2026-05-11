'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Store, ArrowRight } from 'lucide-react'

// URL-encoded SVG fractal noise — used for subtle grain texture on card
const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function WineBottle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 220" fill="none" aria-hidden>
      {/* Cork */}
      <rect x="27" y="4" width="18" height="16" rx="3" stroke="white" strokeWidth="1.3" />
      {/* Capsule / foil */}
      <path d="M25 20 L47 20 L47 42 L25 42 Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Neck */}
      <line x1="25" y1="42" x2="25" y2="68" stroke="white" strokeWidth="1.3" />
      <line x1="47" y1="42" x2="47" y2="68" stroke="white" strokeWidth="1.3" />
      {/* Shoulder + body */}
      <path
        d="M25 68 Q13 90 11 114 L11 190 Q11 208 36 210 Q61 208 61 190 L61 114 Q59 90 47 68"
        stroke="white" strokeWidth="1.3" strokeLinecap="round"
      />
      {/* Label outline */}
      <rect x="17" y="130" width="38" height="52" rx="2.5" stroke="white" strokeWidth="1" strokeOpacity="0.65" />
      {/* Label decorative lines */}
      <line x1="22" y1="145" x2="50" y2="145" stroke="white" strokeWidth="0.7" strokeOpacity="0.38" />
      <line x1="22" y1="156" x2="50" y2="156" stroke="white" strokeWidth="0.7" strokeOpacity="0.38" />
      <line x1="22" y1="167" x2="42" y2="167" stroke="white" strokeWidth="0.7" strokeOpacity="0.38" />
      {/* Bottom punt */}
      <path d="M13 190 Q36 200 59 190" stroke="white" strokeWidth="1" strokeOpacity="0.45" />
    </svg>
  )
}

export function BottomCta() {
  return (
    <section
      className="relative py-16 lg:py-20"
      style={{ background: 'linear-gradient(180deg, #0A1510 0%, #0D1B15 100%)' }}
    >
      {/* Background glow — soft, wide, atmospheric */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(198,164,90,0.038) 0%, transparent 75%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(24,62,48,0.48) 0%, rgba(12,26,20,0.32) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Grain texture on card surface */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: NOISE_BG,
              backgroundRepeat: 'repeat',
              backgroundSize: '180px 180px',
              opacity: 0.038,
            }}
          />

          {/* Top-edge gold hairline */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 8%, rgba(198,164,90,0.28) 38%, rgba(198,164,90,0.28) 62%, transparent 92%)',
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 px-8 py-11 lg:px-12 lg:py-14">

            {/* Left — icon badge + content */}
            <div className="flex items-start gap-5 lg:max-w-xl">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-1"
                style={{
                  background: 'rgba(198,164,90,0.08)',
                  border: '1px solid rgba(198,164,90,0.17)',
                }}
              >
                <Store className="h-5 w-5 text-[#C6A45A]" />
              </div>

              <div>
                <h2
                  className="font-heading font-semibold text-[#F3F2EE] leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)' }}
                >
                  Підключайте магазин<br className="hidden sm:block" /> до AlcoPlace
                </h2>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'rgba(243,242,238,0.48)' }}
                >
                  Залучайте нових клієнтів та керуйте<br className="hidden sm:block" /> пропозиціями у єдиному сервісі.
                </p>
              </div>
            </div>

            {/* Right — bottle illustration + button */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Wine bottle line art — more visible luxury accent */}
              <div className="hidden lg:block w-14 h-44 opacity-[0.16] flex-shrink-0">
                <WineBottle className="w-full h-full" />
              </div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              >
                <Link
                  href="#"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-medium text-white whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(145deg, #5C1A24 0%, #7D2535 100%)',
                    boxShadow:
                      '0 8px 28px rgba(92,26,36,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  Стати партнером
                  <ArrowRight className="h-3.5 w-3.5 opacity-65" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
