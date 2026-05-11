'use client'

import { useState } from 'react'
import { categories } from '@/mock/categories'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'

interface FilterSidebarProps {
  selectedCategory: string
  onCategoryChange: (slug: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  selectedCountries: string[]
  onCountriesChange: (v: string[]) => void
  selectedColors: string[]
  onColorsChange: (v: string[]) => void
  selectedSweetnesses: string[]
  onSweetnessesChange: (v: string[]) => void
}

const COUNTRIES = [
  'Франція', 'Італія', 'Іспанія', 'Шотландія', 'Ірландія', 'США',
  'Японія', 'Мексика', 'Аргентина', 'Нова Зеландія', 'Чилі', 'Португалія',
  'Грузія', 'Австрія', 'Україна',
]
const VOLUMES = ['0.05л', '0.2л', '0.375л', '0.5л', '0.7л', '0.75л', '1л']
const ALCOHOL_RANGES = ['До 5%', '5–15%', '15–30%', '30–50%', '50%+']
const COLORS = ['Червоне', 'Біле', 'Рожеве', 'Ігристе']
const SWEETNESSES = ['Сухе', 'Напівсухе', 'Напівсолодке', 'Солодке']
const PRICE_PRESETS: [[number, number], string][] = [
  [[0, 300], 'до 300 ₴'],
  [[300, 700], '300–700 ₴'],
  [[700, 1500], '700–1500 ₴'],
  [[1500, 5000], 'від 1500 ₴'],
]

function FilterSection({
  title,
  defaultOpen = true,
  badge,
  children,
}: {
  title: string
  defaultOpen?: boolean
  badge?: number
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#F0EDE6] last:border-0 py-3.5">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-[#1C1C1C]">
          {title}
          {badge != null && badge > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#1E3A2F] text-white text-[9px] font-semibold flex items-center justify-center">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#9E9890] transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-250 ${open ? 'mt-3 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  )
}

function CheckItem({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 px-1 py-1.5 rounded text-[13px] text-[#6B6560] cursor-pointer hover:text-[#1C1C1C] transition-colors select-none">
      <span className={`w-3.5 h-3.5 rounded-[3px] border flex-shrink-0 flex items-center justify-center transition-all duration-150 ${
        checked
          ? 'bg-[#1E3A2F] border-[#1E3A2F] shadow-[0_1px_5px_rgba(30,58,47,0.35)]'
          : 'bg-white border-[#D0CAC2] hover:border-[#1E3A2F]/40'
      }`}>
        {checked && (
          <svg viewBox="0 0 10 8" className="w-[7px] h-[7px] fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4l3 3 5-6" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        suppressHydrationWarning
      />
      {label}
    </label>
  )
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedCountries,
  onCountriesChange,
  selectedColors,
  onColorsChange,
  selectedSweetnesses,
  onSweetnessesChange,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (list: string[], value: string, onChange: (v: string[]) => void) => {
    onChange(list.includes(value) ? list.filter(x => x !== value) : [...list, value])
  }

  const showWineFilters = selectedCategory === 'wine' || selectedCategory === 'all'
  const activeCount = selectedCountries.length + selectedColors.length + selectedSweetnesses.length

  const filterContent = (
    <div>
      {/* Category */}
      <FilterSection title="Категорія">
        <div className="space-y-0.5">
          <button
            onClick={() => onCategoryChange('all')}
            className={`block w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#1E3A2F] text-white'
                : 'text-[#6B6560] hover:bg-[#F0EDE6] hover:text-[#1C1C1C]'
            }`}
          >
            Усі категорії
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`flex items-center gap-2 w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#1E3A2F] text-white'
                  : 'text-[#6B6560] hover:bg-[#F0EDE6] hover:text-[#1C1C1C]'
              }`}
            >
              <span className="text-base leading-none">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Ціна">
        <div className="flex items-center gap-1.5 mb-2.5">
          <input
            type="number"
            value={priceRange[0] || ''}
            min={0}
            onChange={e => onPriceChange([Math.max(0, Number(e.target.value)), priceRange[1]])}
            placeholder="0"
            className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-[#E5E0D8] bg-[#FAFAF8] text-[#1C1C1C] focus:outline-none focus:border-[#1E3A2F]/40 transition-colors"
            suppressHydrationWarning
          />
          <span className="text-[#C8C3BB] text-xs flex-shrink-0">—</span>
          <input
            type="number"
            value={priceRange[1] === 5000 ? '' : priceRange[1]}
            min={priceRange[0]}
            onChange={e => onPriceChange([priceRange[0], e.target.value ? Number(e.target.value) : 5000])}
            placeholder="5000"
            className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-[#E5E0D8] bg-[#FAFAF8] text-[#1C1C1C] focus:outline-none focus:border-[#1E3A2F]/40 transition-colors"
            suppressHydrationWarning
          />
          <span className="text-[#9E9890] text-xs flex-shrink-0">₴</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map(([range, label]) => (
            <button
              key={label}
              onClick={() => onPriceChange(range)}
              className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                priceRange[0] === range[0] && priceRange[1] === range[1]
                  ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                  : 'border-[#E5E0D8] text-[#6B6560] hover:border-[#1E3A2F]/30 hover:text-[#1E3A2F]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Country */}
      <FilterSection title="Країна" defaultOpen={true} badge={selectedCountries.length}>
        <div className="space-y-0 max-h-36 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D8D2C8] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#1E3A2F]/35">
          {COUNTRIES.map(c => (
            <CheckItem
              key={c}
              label={c}
              checked={selectedCountries.includes(c)}
              onChange={() => toggle(selectedCountries, c, onCountriesChange)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Volume */}
      <FilterSection title="Об'єм" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {VOLUMES.map(v => (
            <button
              key={v}
              className="px-3 py-1 rounded-full text-xs border border-[#E5E0D8] text-[#6B6560] hover:border-[#1E3A2F]/30 hover:text-[#1E3A2F] transition-colors"
            >
              {v}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Alcohol */}
      <FilterSection title="Міцність" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {ALCOHOL_RANGES.map(r => (
            <button
              key={r}
              className="px-3 py-1 rounded-full text-xs border border-[#E5E0D8] text-[#6B6560] hover:border-[#1E3A2F]/30 hover:text-[#1E3A2F] transition-colors"
            >
              {r}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Wine-specific */}
      {showWineFilters && (
        <>
          <FilterSection
            title="Колір вина"
            defaultOpen={selectedCategory === 'wine'}
            badge={selectedColors.length}
          >
            {COLORS.map(c => (
              <CheckItem
                key={c}
                label={c}
                checked={selectedColors.includes(c)}
                onChange={() => toggle(selectedColors, c, onColorsChange)}
              />
            ))}
          </FilterSection>
          <FilterSection
            title="Солодкість"
            defaultOpen={selectedCategory === 'wine'}
            badge={selectedSweetnesses.length}
          >
            {SWEETNESSES.map(s => (
              <CheckItem
                key={s}
                label={s}
                checked={selectedSweetnesses.includes(s)}
                onChange={() => toggle(selectedSweetnesses, s, onSweetnessesChange)}
              />
            ))}
          </FilterSection>
        </>
      )}
    </div>
  )

  return (
    <aside className="w-full lg:w-56 xl:w-60 flex-shrink-0">
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white border border-[#E5E0D8] text-sm font-medium text-[#1C1C1C] mb-4"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#6B6560]" />
          Фільтри
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#1E3A2F] text-white text-[10px] font-semibold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown className={`h-4 w-4 text-[#6B6560] transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile panel */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[3000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 rounded-xl bg-white border border-[#E5E0D8]">
          {filterContent}
        </div>
      </div>

      {/* Desktop sticky card */}
      <div className="hidden lg:block sticky top-4">
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.03)' }}
        >
          {/* Card header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F0EDE6]">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#9E9890]" />
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#9E9890]">
              Фільтри
            </span>
            {activeCount > 0 && (
              <span className="ml-auto text-[10px] text-[#1E3A2F] font-medium">
                {activeCount} активних
              </span>
            )}
          </div>
          <div className="px-4">
            {filterContent}
          </div>
        </div>
      </div>
    </aside>
  )
}
