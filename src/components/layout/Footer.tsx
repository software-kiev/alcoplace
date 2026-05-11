import Link from 'next/link'
import { Mail, Phone, Clock } from 'lucide-react'

const YEAR = new Date().getFullYear()

// URL-encoded SVG fractal noise for grain overlay
const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const COLUMNS = [
  {
    heading: 'Сервіс',
    links: [
      { label: 'Каталог', href: '/catalog/all' },
      { label: 'Магазини', href: '#' },
      { label: 'Акції', href: '#' },
      { label: 'Як це працює', href: '#' },
    ],
  },
  {
    heading: 'Партнерам',
    links: [
      { label: 'Для магазинів', href: '#' },
      { label: 'Для брендів', href: '#' },
      { label: 'Для імпортерів', href: '#' },
      { label: 'API для партнерів', href: '#' },
    ],
  },
  {
    heading: 'Компанія',
    links: [
      { label: 'Про нас', href: '#' },
      { label: 'Блог', href: '#' },
      { label: 'Контакти', href: '#' },
    ],
  },
]

const LEGAL_LINKS = [
  { label: 'Конфіденційність', href: '#' },
  { label: 'Умови використання', href: '#' },
  { label: 'Cookies', href: '#' },
]

function DropIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M11 2C11 2 4.5 8.5 4.5 13.5C4.5 17.09 7.41 20 11 20C14.59 20 17.5 17.09 17.5 13.5C17.5 8.5 11 2 11 2Z"
        fill="#C6A45A"
        fillOpacity="0.9"
      />
      <ellipse
        cx="8.5" cy="13" rx="1.5" ry="2"
        fill="white" fillOpacity="0.22"
        transform="rotate(-15 8.5 13)"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const SOCIAL = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Telegram', href: '#', Icon: TelegramIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
]

export function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 150% 70% at 50% -5%, #163A2E 0%, #0B1E18 55%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Grain texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: NOISE_BG,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.04,
        }}
      />

      {/* ─── Main grid ─── */}
      <div
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10"
        style={{ paddingTop: '72px', paddingBottom: '0' }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-[2.4fr_1fr_1fr_1fr] gap-8 lg:gap-8 xl:gap-14">

          {/* Brand — visually dominant */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-7">
            <Link href="/" className="inline-flex items-center gap-3 w-fit group">
              <DropIcon />
              <span className="font-heading font-semibold tracking-wide" style={{ fontSize: '1.55rem' }}>
                <span className="text-[#F3F2EE] group-hover:text-white transition-colors duration-200">
                  Alco
                </span>
                <span className="text-[#C6A45A]">Place</span>
              </span>
            </Link>

            <p
              className="text-[15px] leading-relaxed text-white/50"
              style={{ maxWidth: '248px' }}
            >
              Маркетплейс-агрегатор алкогольних напоїв. Порівнюй ціни, знаходь магазини поруч.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white/75 border border-white/[0.1] hover:border-[#C6A45A]/30 hover:bg-white/[0.05] transition-all duration-200"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-[10px] uppercase tracking-[0.22em] font-medium text-white/28 mb-5">
                {heading}
              </h4>
              <ul className="space-y-4">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 hover:text-[#C6A45A] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Support row ─── */}
        <div
          className="flex flex-wrap items-center gap-6 sm:gap-10 mt-10 pt-7"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-white/25">
            Підтримка
          </span>
          <a
            href="mailto:hello@alcoplace.ua"
            className="inline-flex items-center gap-2 text-xs text-white/42 hover:text-white/62 transition-colors duration-200"
          >
            <Mail className="h-3.5 w-3.5 flex-shrink-0 opacity-65" />
            hello@alcoplace.ua
          </a>
          <a
            href="tel:+380440000000"
            className="inline-flex items-center gap-2 text-xs text-white/42 hover:text-white/62 transition-colors duration-200"
          >
            <Phone className="h-3.5 w-3.5 flex-shrink-0 opacity-65" />
            +380 44 000 00 00
          </a>
          <span className="inline-flex items-center gap-2 text-xs text-white/30">
            <Clock className="h-3.5 w-3.5 flex-shrink-0 opacity-55" />
            Пн–Пт, 9:00–18:00
          </span>
        </div>

        <div className="pb-8" />
      </div>

      {/* ─── Legal strip ─── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 text-[11px] font-semibold tracking-wide"
                style={{
                  border: '1px solid rgba(198,164,90,0.24)',
                  color: 'rgba(198,164,90,0.65)',
                }}
              >
                18+
              </span>
              <p className="text-[11px] text-white/35">
                © {YEAR} AlcoPlace. Надмірне споживання алкоголю шкідливе для здоров'я.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[11px] text-white/35 hover:text-white/55 transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
