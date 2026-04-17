'use client'

import { useState } from 'react'
import Image from 'next/image'
import { categories } from '@/mock/categories'
import { ui } from '@/lib/ui-strings'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'

interface FilterSidebarProps {
  selectedCategory: string
  onCategoryChange: (slug: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}

const countries = ['Франція', 'Італія', 'Іспанія', 'Німеччина', 'Україна', 'США', 'Ірландія', 'Шотландія', 'Мексика', 'Бельгія', 'Англія', 'Куба', 'Швеція', 'Ямайка', 'Аргентина', 'Нова Зеландія', 'Пуерто-Рико']

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-sm text-[#1C1C1C] mb-3">{ui.filters.category}</h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#1E3A2F] text-white'
                : 'text-[#6B6560] hover:bg-[#F0EDE6]'
            }`}
          >
            {ui.catalog.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#1E3A2F] text-white'
                  : 'text-[#6B6560] hover:bg-[#F0EDE6]'
              }`}
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm text-[#1C1C1C] mb-3">{ui.filters.country}</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {countries.map((country) => (
            <label key={country} className="flex items-center gap-2 px-3 py-1 text-sm text-[#6B6560] cursor-pointer hover:text-[#1C1C1C]">
              <input type="checkbox" className="rounded border-[#E5E0D8]" />
              {country}
            </label>
          ))}
        </div>
      </div>

      {selectedCategory === 'wine' && (
        <>
          <div>
            <h3 className="font-medium text-sm text-[#1C1C1C] mb-3">{ui.filters.color}</h3>
            <div className="space-y-1">
              {Object.values(ui.filters.colors).map((color) => (
                <label key={color} className="flex items-center gap-2 px-3 py-1 text-sm text-[#6B6560] cursor-pointer hover:text-[#1C1C1C]">
                  <input type="checkbox" className="rounded border-[#E5E0D8]" />
                  {color}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#1C1C1C] mb-3">{ui.filters.sweetness}</h3>
            <div className="space-y-1">
              {Object.values(ui.filters.sweetnesses).map((s) => (
                <label key={s} className="flex items-center gap-2 px-3 py-1 text-sm text-[#6B6560] cursor-pointer hover:text-[#1C1C1C]">
                  <input type="checkbox" className="rounded border-[#E5E0D8]" />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white border border-[#E5E0D8] text-sm font-medium text-[#1C1C1C] mb-4"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#6B6560]" />
          Фільтри
        </span>
        <ChevronDown className={`h-4 w-4 text-[#6B6560] transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile: collapsible */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[2000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 rounded-xl bg-white border border-[#E5E0D8]">
          {filterContent}
        </div>
      </div>

      {/* Desktop: always visible */}
      <div className="hidden lg:block">
        {filterContent}
      </div>
    </aside>
  )
}
