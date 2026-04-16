'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Search, ShoppingBag } from 'lucide-react'

export function BottomCta() {
  return (
    <section className="bg-[#0F1A17] py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-medium text-[#F3F2EE] mb-3">
            Готові знайти найкращу ціну?
          </h2>
          <p className="text-[rgba(243,242,238,0.55)] text-base mb-8 max-w-md mx-auto">
            Додайте товари до списку та дізнайтесь де купити їх дешевше поруч.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalog/all"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white transition-colors"
              style={{ background: 'linear-gradient(135deg, #1F4033, #2B5A45)' }}
            >
              <Search className="h-4 w-4" />
              Переглянути каталог
            </Link>
            <Link
              href="/list"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white border border-white/20 bg-white/8 hover:bg-white/15 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Мій список покупок
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
