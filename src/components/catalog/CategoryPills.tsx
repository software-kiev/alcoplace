'use client'

import { categories } from '@/mock/categories'

interface CategoryPillsProps {
  selected: string
  onChange: (slug: string) => void
}

const ALL = { slug: 'all', name: 'Усі', emoji: null as null }

export function CategoryPills({ selected, onChange }: CategoryPillsProps) {
  const items = [ALL, ...categories.map(c => ({ slug: c.slug, name: c.name, emoji: c.emoji }))]

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {items.map(({ slug, name, emoji }) => {
        const active = selected === slug
        return (
          <button
            key={slug}
            onClick={() => onChange(slug)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-250 hover:-translate-y-[1px] ${
              active
                ? 'bg-[#1E3A2F] text-white border border-[#C6A45A]/35'
                : 'bg-white border border-[#E8E3DB] text-[#6B6560] hover:border-[#1E3A2F]/20 hover:text-[#1E3A2F] hover:shadow-[0_2px_10px_rgba(30,58,47,0.08)]'
            }`}
            style={active ? { boxShadow: '0 3px 18px rgba(30,58,47,0.22), 0 0 0 1.5px rgba(198,164,90,0.28)' } : undefined}
          >
            {emoji && <span className="text-base leading-none">{emoji}</span>}
            {name}
          </button>
        )
      })}
    </div>
  )
}
