'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Navigation, ChevronDown, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useCity, searchCities, POPULAR_CITIES } from '@/lib/city-context'

interface CityPickerProps {
  isTransparent: boolean
}

function highlightMatch(text: string, query: string) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-[#C6A45A] font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

export function CityPicker({ isTransparent }: CityPickerProps) {
  const { city, setCity } = useCity()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [geoLoading, setGeoLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const results = query.length >= 1 ? searchCities(query) : []

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  // Close on outside click (desktop)
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const selectCity = (c: string) => {
    setCity(c)
    setOpen(false)
    setQuery('')
  }

  const handleGeo = () => {
    if (!navigator.geolocation) return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      () => {
        // Mock: resolve to Київ since we can't do real reverse geocoding
        setTimeout(() => {
          selectCity('Київ')
          setGeoLoading(false)
        }, 600)
      },
      () => {
        setGeoLoading(false)
      },
      { timeout: 5000 }
    )
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          isTransparent
            ? 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
            : 'text-[#6B6560] hover:text-[#1C1C1C] hover:bg-[#F0EDE6] border border-[#E5E0D8]'
        }`}
      >
        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="hidden sm:inline max-w-[100px] truncate">{city || 'Обрати місто'}</span>
        <ChevronDown className={`h-3 w-3 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Desktop popover */}
      <AnimatePresence>
        {open && (
          <>
            {/* Desktop dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:block absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-[#E5E0D8] shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 overflow-hidden"
            >
              <div className="p-4">
                {/* Geolocation shortcut */}
                <button
                  onClick={handleGeo}
                  disabled={geoLoading}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-[#1E3A2F] hover:bg-[#F0FAF4] transition-colors mb-3 border border-[#E5E0D8]"
                >
                  {geoLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[#2D6A4F]" />
                  ) : (
                    <Navigation className="h-4 w-4 text-[#2D6A4F]" />
                  )}
                  <span className="font-medium">Визначити автоматично</span>
                </button>

                {/* Search input */}
                <div className="relative mb-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Введіть місто"
                    className="w-full pl-4 pr-8 py-2.5 rounded-xl text-sm border border-[#E5E0D8] bg-[#F9F8F6] text-[#1C1C1C] placeholder:text-[#9E9890] focus:outline-none focus:border-[#C6A45A]/40 focus:bg-white transition-colors"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9890] hover:text-[#1C1C1C]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Search results */}
                {results.length > 0 && (
                  <div className="mb-3 space-y-0.5">
                    {results.map((c) => (
                      <button
                        key={c}
                        onClick={() => selectCity(c)}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-left hover:bg-[#F0EDE6] transition-colors"
                      >
                        <MapPin className="h-3.5 w-3.5 text-[#9E9890] flex-shrink-0" />
                        <span className="text-[#1C1C1C]">{highlightMatch(c, query)}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* No results */}
                {query.length >= 1 && results.length === 0 && (
                  <p className="text-xs text-[#9E9890] text-center py-3 mb-3">
                    Місто не знайдено
                  </p>
                )}

                {/* Popular cities */}
                {!query && (
                  <div>
                    <p className="text-[11px] text-[#9E9890] uppercase tracking-wider mb-2 px-1">Популярні міста</p>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_CITIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => selectCity(c)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                            city === c
                              ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                              : 'text-[#6B6560] border-[#E5E0D8] hover:bg-[#F0EDE6] hover:text-[#1C1C1C]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hint */}
              {!city && !query && (
                <div className="px-4 py-3 bg-[#F9F8F6] border-t border-[#E5E0D8]">
                  <p className="text-[11px] text-[#9E9890] text-center">
                    Оберіть місто для точніших результатів
                  </p>
                </div>
              )}
            </motion.div>

            {/* Mobile bottom sheet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sm:hidden fixed inset-0 z-50 bg-black/40"
              onClick={() => { setOpen(false); setQuery('') }}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-[#E5E0D8]" />
                </div>

                <div className="px-5 pb-8 pt-2">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-heading text-lg font-medium text-[#1C1C1C]">Оберіть місто</h3>
                    <button onClick={() => { setOpen(false); setQuery('') }} className="p-1 text-[#9E9890]">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Geolocation */}
                  <button
                    onClick={handleGeo}
                    disabled={geoLoading}
                    className="flex items-center gap-2.5 w-full px-4 py-3.5 rounded-xl text-sm text-[#1E3A2F] hover:bg-[#F0FAF4] transition-colors mb-4 border border-[#E5E0D8]"
                  >
                    {geoLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#2D6A4F]" />
                    ) : (
                      <Navigation className="h-4 w-4 text-[#2D6A4F]" />
                    )}
                    <span className="font-medium">Визначити автоматично</span>
                  </button>

                  {/* Search input */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Введіть місто"
                      className="w-full pl-4 pr-10 py-3.5 rounded-xl text-base border border-[#E5E0D8] bg-[#F9F8F6] text-[#1C1C1C] placeholder:text-[#9E9890] focus:outline-none focus:border-[#C6A45A]/40 focus:bg-white transition-colors"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9890]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Search results */}
                  {results.length > 0 && (
                    <div className="mb-4 space-y-0.5">
                      {results.map((c) => (
                        <button
                          key={c}
                          onClick={() => selectCity(c)}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-left hover:bg-[#F0EDE6] transition-colors"
                        >
                          <MapPin className="h-4 w-4 text-[#9E9890] flex-shrink-0" />
                          <span className="text-[#1C1C1C] text-base">{highlightMatch(c, query)}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No results */}
                  {query.length >= 1 && results.length === 0 && (
                    <p className="text-sm text-[#9E9890] text-center py-6 mb-4">
                      Місто не знайдено
                    </p>
                  )}

                  {/* Popular cities */}
                  {!query && (
                    <div>
                      <p className="text-xs text-[#9E9890] uppercase tracking-wider mb-3">Популярні міста</p>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_CITIES.map((c) => (
                          <button
                            key={c}
                            onClick={() => selectCity(c)}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                              city === c
                                ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                                : 'text-[#6B6560] border-[#E5E0D8] hover:bg-[#F0EDE6] hover:text-[#1C1C1C]'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hint */}
                  {!city && !query && (
                    <p className="text-xs text-[#9E9890] text-center mt-6">
                      Оберіть місто для точніших результатів
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
