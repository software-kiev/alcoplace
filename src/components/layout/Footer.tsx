import Link from 'next/link'
import { ui } from '@/lib/ui-strings'

export function Footer() {
  return (
    <footer className="bg-[#1E3A2F] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">Alcoplace</h3>
            <p className="text-sm text-white/60">{ui.footer.tagline}</p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Навігація</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/catalog/all" className="hover:text-white transition-colors">
                  {ui.footer.catalog}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {ui.footer.about}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {ui.footer.contacts}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <span className="inline-block px-3 py-1 rounded-full border border-white/30 text-sm font-medium">
              18+
            </span>
            <p className="text-xs text-white/40 mt-4">
              © {new Date().getFullYear()} Alcoplace. Всі права захищено.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
