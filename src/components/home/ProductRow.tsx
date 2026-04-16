'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/shared/ProductCard'
import { ui } from '@/lib/ui-strings'
import type { Product } from '@/mock/products'

interface ProductRowProps {
  title: string
  products: Product[]
  viewAllHref?: string
}

export function ProductRow({ title, products, viewAllHref }: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[#1C1C1C]">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="hidden sm:inline-block text-sm font-medium text-[#1E3A2F] hover:text-[#C6A45A] transition-colors"
            >
              {ui.catalog.viewAll} →
            </Link>
          )}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-[#E5E0D8] hover:bg-[#F0EDE6] transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-[#6B6560]" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-[#E5E0D8] hover:bg-[#F0EDE6] transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-[#6B6560]" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((product, i) => (
          <div key={product.id} className="flex-shrink-0 w-56 snap-start">
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
