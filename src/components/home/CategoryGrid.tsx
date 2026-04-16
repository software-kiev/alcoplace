'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { categories } from '@/mock/categories'
import { ui } from '@/lib/ui-strings'

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[#1C1C1C]">
            {ui.categories.heading}
          </h2>
          <p className="text-sm text-[#9E9890] mt-1">
            {ui.categories.subtitle}
          </p>
        </div>
        <Link
          href="/catalog/all"
          className="hidden sm:inline-block text-sm font-medium text-[#1E3A2F] hover:text-[#C6A45A] transition-colors"
        >
          {ui.categories.viewAll}
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04, ease: 'easeOut' }}
          >
            <Link
              href={`/catalog/${cat.slug}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-xl aspect-[4/5] hover:scale-[1.03] transition-transform duration-200"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
            >
              {/* Photo background */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark overlay — stronger at bottom, subtle at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1510]/90 via-[#0A1510]/30 to-transparent" />

              {/* Subtle gold shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#C6A45A]/20 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-3">
                <span className="block text-sm font-medium text-white leading-tight">
                  {cat.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
