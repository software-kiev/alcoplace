'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import { X } from 'lucide-react'
import { FilterSidebar } from '@/components/catalog/FilterSidebar'
import { SortBar } from '@/components/catalog/SortBar'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { CategoryPills } from '@/components/catalog/CategoryPills'
import { products, searchProducts } from '@/mock/products'
import { getCategoryBySlug } from '@/mock/categories'

type SortOption = 'popular' | 'price_asc' | 'price_desc'

const PAGE_SIZE = 12
const DEFAULT_PRICE: [number, number] = [0, 5000]

export default function CatalogPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categorySlug = (params.category as string) || 'all'
  const searchQuery = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState(categorySlug)
  const [sort, setSort] = useState<SortOption>('popular')
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSweetnesses, setSelectedSweetnesses] = useState<string[]>([])
  const [page, setPage] = useState(0)

  const goPage = (n: number) => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug)
    setPage(0)
  }

  const filtered = useMemo(() => {
    let result = searchQuery
      ? searchProducts(searchQuery)
      : selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory)

    if (priceRange[0] > 0 || priceRange[1] < 5000) {
      result = result.filter(p => p.price_min >= priceRange[0] && p.price_min <= priceRange[1])
    }
    if (selectedCountries.length) {
      result = result.filter(p => selectedCountries.includes(p.country))
    }
    if (selectedColors.length) {
      result = result.filter(p => p.color && selectedColors.includes(p.color))
    }
    if (selectedSweetnesses.length) {
      result = result.filter(p => p.sweetness && selectedSweetnesses.includes(p.sweetness))
    }

    if (sort === 'price_asc') return [...result].sort((a, b) => a.price_min - b.price_min)
    if (sort === 'price_desc') return [...result].sort((a, b) => b.price_min - a.price_min)
    return result
  }, [selectedCategory, sort, priceRange, selectedCountries, selectedColors, selectedSweetnesses, searchQuery])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  // Active filter chips
  type Chip = { key: string; label: string; onRemove: () => void }
  const chips: Chip[] = []
  if (selectedCategory !== 'all' && !searchQuery) {
    const cat = getCategoryBySlug(selectedCategory)
    if (cat) chips.push({ key: 'cat', label: cat.name, onRemove: () => handleCategoryChange('all') })
  }
  if (priceRange[0] > 0 || priceRange[1] < 5000) {
    chips.push({
      key: 'price',
      label: `${priceRange[0]}–${priceRange[1]} ₴`,
      onRemove: () => { setPriceRange(DEFAULT_PRICE); setPage(0) },
    })
  }
  selectedCountries.forEach(c => chips.push({
    key: `cnt-${c}`, label: c,
    onRemove: () => { setSelectedCountries(prev => prev.filter(x => x !== c)); setPage(0) },
  }))
  selectedColors.forEach(c => chips.push({
    key: `col-${c}`, label: c,
    onRemove: () => { setSelectedColors(prev => prev.filter(x => x !== c)); setPage(0) },
  }))
  selectedSweetnesses.forEach(s => chips.push({
    key: `sw-${s}`, label: s,
    onRemove: () => { setSelectedSweetnesses(prev => prev.filter(x => x !== s)); setPage(0) },
  }))

  const clearAll = () => {
    setSelectedCategory('all')
    setPriceRange(DEFAULT_PRICE)
    setSelectedCountries([])
    setSelectedColors([])
    setSelectedSweetnesses([])
    setPage(0)
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(170deg, #FAF8F4 0%, #F7F4EE 35%, #F5F2EC 70%, #F8F5F0 100%)' }}>
      {/* Subtle noise grain */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.028]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        {/* Header */}
        <div className="relative mb-5">
          <div className="pointer-events-none absolute -inset-x-6 -top-6 h-52 bg-[radial-gradient(ellipse_70%_100%_at_40%_0%,rgba(198,164,90,0.07)_0%,transparent_70%)]" />
          <div className="relative">
            <h1 className="font-heading text-3xl sm:text-4xl font-medium text-[#1C1C1C] mb-1.5 tracking-[-0.02em]">
              {searchQuery
                ? `Результати: "${searchQuery}"`
                : 'Каталог алкогольних напоїв'}
            </h1>
            {!searchQuery && (
              <p className="text-[#9E9890] text-[14px]">
                Порівнюйте ціни та знаходьте найкращі пропозиції поруч.
              </p>
            )}
          </div>
        </div>

        {/* Category pills */}
        {!searchQuery && (
          <div className="relative mb-6">
            <div className="pointer-events-none absolute -inset-x-4 inset-y-0 bg-[radial-gradient(ellipse_50%_200%_at_20%_50%,rgba(198,164,90,0.05)_0%,transparent_70%)]" />
            <CategoryPills
              selected={selectedCategory}
              onChange={slug => { handleCategoryChange(slug) }}
            />
          </div>
        )}

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={r => { setPriceRange(r); setPage(0) }}
            selectedCountries={selectedCountries}
            onCountriesChange={v => { setSelectedCountries(v); setPage(0) }}
            selectedColors={selectedColors}
            onColorsChange={v => { setSelectedColors(v); setPage(0) }}
            selectedSweetnesses={selectedSweetnesses}
            onSweetnessesChange={v => { setSelectedSweetnesses(v); setPage(0) }}
          />

          <div className="flex-1 min-w-0">
            <SortBar
              value={sort}
              onChange={v => { setSort(v); setPage(0) }}
              count={filtered.length}
            />

            {/* Active filter chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {chips.map(chip => (
                  <span
                    key={chip.key}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1E3A2F]/[0.07] text-[#1E3A2F] border border-[#1E3A2F]/[0.14]"
                  >
                    {chip.label}
                    <button
                      onClick={chip.onRemove}
                      className="hover:opacity-65 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAll}
                  className="text-xs text-[#9E9890] hover:text-[#1C1C1C] transition-colors underline underline-offset-2"
                >
                  Очистити всі
                </button>
              </div>
            )}

            <ProductGrid products={paginated} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10">
                <button
                  onClick={() => goPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-[#6B6560] border border-[#E5E0D8] bg-white hover:border-[#1E3A2F]/40 hover:text-[#1E3A2F] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goPage(i)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-150 ${
                      page === i
                        ? 'bg-[#1E3A2F] text-white shadow-sm'
                        : 'bg-white border border-[#E5E0D8] text-[#6B6560] hover:border-[#1E3A2F]/40 hover:text-[#1E3A2F]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => goPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page === totalPages - 1}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-[#6B6560] border border-[#E5E0D8] bg-white hover:border-[#1E3A2F]/40 hover:text-[#1E3A2F] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
