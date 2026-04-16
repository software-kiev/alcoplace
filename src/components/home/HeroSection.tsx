'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Search } from 'lucide-react'
import { ui } from '@/lib/ui-strings'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { searchProducts } from '@/mock/products'
import { SearchDropdown } from '@/components/shared/SearchDropdown'

export function HeroSection() {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = query.length >= 2 ? searchProducts(query).slice(0, 5) : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/catalog/all?q=${encodeURIComponent(query.trim())}`)
      setShowResults(false)
      setQuery('')
    }
  }

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden -mt-16">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-[position:center_30%]"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&q=80)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A17]/60 via-[#0F1A17]/55 to-[#0F1A17]/75" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center w-full pt-20 pb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-[#F3F2EE] leading-tight tracking-tight"
        >
          {ui.hero.title}
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8962E 50%, #E6C86B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {ui.hero.subtitle}
          </span>
        </motion.h1>

        {/* Value proposition subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          className="text-[#F3F2EE]/60 text-base sm:text-lg mt-4 max-w-lg mx-auto"
        >
          {ui.hero.valueProposition}
        </motion.p>

        {/* Search bar with autocomplete */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14, ease: 'easeOut' }}
          className="mt-8 max-w-xl mx-auto relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowResults(true)
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              placeholder={ui.search.placeholder}
              className="w-full pl-12 pr-28 py-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/15 transition-colors text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-colors"
              style={{ background: 'linear-gradient(135deg, #1F4033, #2B5A45)' }}
            >
              {ui.search.button}
            </button>
          </div>

          {/* Autocomplete suggestions */}
          <AnimatePresence>
            {showResults && results.length > 0 && (
              <SearchDropdown
                results={results}
                query={query}
                size="md"
                onClose={() => { setShowResults(false); setQuery('') }}
              />
            )}
          </AnimatePresence>
        </motion.form>

        {/* Popular search chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22, ease: 'easeOut' }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-white/30">Популярне:</span>
          {ui.search.popularQueries.map((q) => (
            <Link
              key={q}
              href={`/catalog/all?q=${encodeURIComponent(q)}`}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/8 transition-colors"
            >
              {q}
            </Link>
          ))}
        </motion.div>

        {/* Social proof counters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' }}
          className="flex gap-6 sm:gap-10 justify-center mt-6"
        >
          {[
            { value: '100 000+', label: 'товарів' },
            { value: '100+', label: 'магазинів' },
            { value: '30', label: 'міст' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-xl sm:text-2xl font-medium text-[#C6A45A]">
                {stat.value}
              </div>
              <div className="text-xs text-[#F3F2EE]/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
