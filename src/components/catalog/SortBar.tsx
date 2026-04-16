'use client'

import { ui } from '@/lib/ui-strings'

type SortOption = 'popular' | 'price_asc' | 'price_desc'

interface SortBarProps {
  value: SortOption
  onChange: (v: SortOption) => void
  count: number
}

export function SortBar({ value, onChange, count }: SortBarProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'popular', label: ui.catalog.popular },
    { value: 'price_asc', label: ui.catalog.priceAsc },
    { value: 'price_desc', label: ui.catalog.priceDesc },
  ]

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-sm text-[#6B6560]">
        {count} товарів
      </p>
      <div className="flex items-center gap-1">
        <span className="text-sm text-[#9E9890] mr-2">{ui.catalog.sortBy}:</span>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              value === opt.value
                ? 'bg-[#1E3A2F] text-white'
                : 'text-[#6B6560] hover:bg-[#F0EDE6]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
