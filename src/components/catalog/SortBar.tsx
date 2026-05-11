'use client'

type SortOption = 'popular' | 'price_asc' | 'price_desc'

interface SortBarProps {
  value: SortOption
  onChange: (v: SortOption) => void
  count: number
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Популярні' },
  { value: 'price_asc', label: 'Дешевші' },
  { value: 'price_desc', label: 'Дорожчі' },
]

export function SortBar({ value, onChange, count }: SortBarProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <p className="text-sm text-[#9E9890]">
        <span className="font-medium text-[#1C1C1C]">{count}</span> товарів
      </p>

      {/* Segmented control */}
      <div
        className="flex items-center p-1 rounded-full bg-white border border-[#E5E0D8]"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
      >
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              value === opt.value
                ? 'bg-[#1E3A2F] text-white shadow-sm'
                : 'text-[#6B6560] hover:text-[#1C1C1C]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
