'use client'

import Link from 'next/link'
import { Search, ShoppingBag, X, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useShoppingList } from '@/lib/shopping-list-context'
import { ui } from '@/lib/ui-strings'
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { searchProducts } from '@/mock/products'
import { SearchDropdown } from '@/components/shared/SearchDropdown'

export function Navbar() {
  const { count } = useShoppingList()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const isHomepage = pathname === '/'
  const isTransparent = isHomepage && !scrolled

  // Show header search: always on internal pages, only after scrolling past hero on homepage
  const showHeaderSearch = isHomepage ? pastHero : true

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      setPastHero(window.scrollY > window.innerHeight * 0.35)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 50)
    }
  }, [mobileSearchOpen])

  // Close mobile search when header search hides (user scrolled back up on homepage)
  useEffect(() => {
    if (!showHeaderSearch) setMobileSearchOpen(false)
  }, [showHeaderSearch])

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
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isTransparent ? 'transparent' : '#ffffff',
        backdropFilter: isTransparent ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: isTransparent ? 'none' : 'blur(12px)',
        borderBottom: isTransparent ? '1px solid transparent' : '1px solid #eee',
        boxShadow: isTransparent ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 2C11 2 4.5 8.5 4.5 13.5C4.5 17.09 7.41 20 11 20C14.59 20 17.5 17.09 17.5 13.5C17.5 8.5 11 2 11 2Z"
                fill="#C6A45A"
                fillOpacity="0.9"
              />
              <path
                d="M11 2C11 2 4.5 8.5 4.5 13.5C4.5 17.09 7.41 20 11 20"
                stroke="#C6A45A"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
              <ellipse cx="8.5" cy="13" rx="1.5" ry="2" fill="white" fillOpacity="0.25" transform="rotate(-15 8.5 13)" />
            </svg>
            <span className="font-heading text-xl font-semibold tracking-wide">
              <span className={isTransparent ? 'text-white' : 'text-[#1E3A2F]'}>Alco</span>
              <span className="text-[#C6A45A]">place</span>
            </span>
          </Link>

          {/* Desktop header search — hidden on homepage top, visible after scroll or on inner pages */}
          <AnimatePresence>
            {showHeaderSearch && (
              <motion.form
                key="header-search"
                onSubmit={handleSearch}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-1 max-w-xl relative hidden sm:block overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9E9890]" />
                  <input
                    ref={desktopInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setShowResults(true)
                    }}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    placeholder="Пошук напоїв"
                    className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none transition-colors border-none bg-[#F5F3EE] text-[#1C1C1C] placeholder:text-[#9E9890] focus:bg-[#EDEAE4] focus:ring-1 focus:ring-[#C6A45A]/30"
                  />
                </div>

                <AnimatePresence>
                  {showResults && results.length > 0 && (
                    <SearchDropdown
                      results={results}
                      query={query}
                      size="sm"
                      onClose={() => { setShowResults(false); setQuery('') }}
                    />
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Desktop nav links — centered between search and actions */}
          <AnimatePresence>
            {!showHeaderSearch && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 hidden md:flex items-center justify-center gap-1"
              >
                <Link href="/catalog/all" className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${isTransparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-[#6B6560] hover:text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}>Каталог</Link>
                <Link href="/catalog/all" className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${isTransparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-[#6B6560] hover:text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}>Про нас</Link>
                <Link href="/catalog/all" className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${isTransparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-[#6B6560] hover:text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}>Контакти</Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacer when both nav links and search are hidden (should not happen, but safety) */}
          {showHeaderSearch ? null : <div className="flex-1 md:hidden" />}

          {/* Mobile search toggle — only when header search should be visible */}
          {showHeaderSearch && (
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              className={`sm:hidden p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-[#6B6560] hover:text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}
              aria-label="Пошук"
            >
              {mobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
          )}

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-[#6B6560] hover:text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            href="/list"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
              isTransparent
                ? 'bg-white/10 border border-white/10 text-white hover:bg-white/20'
                : 'bg-[#1E3A2F] border border-[#1E3A2F] text-white hover:bg-[#162C23]'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">{ui.nav.myList}</span>
            <AnimatePresence mode="wait">
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#C6A45A] text-white text-xs flex items-center justify-center font-bold"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* Mobile search drawer — only on solid header */}
      <AnimatePresence>
        {mobileSearchOpen && showHeaderSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden bg-white"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <form onSubmit={handleSearch} className="px-4 pb-3 pt-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9E9890]" />
                <input
                  ref={mobileInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowResults(true) }}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  placeholder="Пошук напоїв"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-colors border border-[#E5E0D8] bg-[#F5F3EE] text-[#1C1C1C] placeholder:text-[#9E9890] focus:border-[#C6A45A]/40"
                />
              </div>
              {showResults && results.length > 0 && (
                <div className="mt-2 relative">
                  <SearchDropdown
                    results={results}
                    query={query}
                    size="sm"
                    onClose={() => { setMobileSearchOpen(false); setQuery('') }}
                  />
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-[#E5E0D8]"
            style={{ backgroundColor: isTransparent ? 'rgba(15,26,23,0.95)' : '#fff' }}
          >
            <div className="px-4 py-3 space-y-1">
              <Link
                href="/catalog/all"
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isTransparent ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}
              >
                Каталог
              </Link>
              <Link
                href="/catalog/all"
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isTransparent ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}
              >
                Про нас
              </Link>
              <Link
                href="/catalog/all"
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isTransparent ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-[#1C1C1C] hover:bg-[#F0EDE6]'}`}
              >
                Контакти
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
