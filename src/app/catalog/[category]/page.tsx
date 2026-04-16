'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import { FilterSidebar } from '@/components/catalog/FilterSidebar'
import { SortBar } from '@/components/catalog/SortBar'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { products, searchProducts } from '@/mock/products'
import { getCategoryBySlug } from '@/mock/categories'

type SortOption = 'popular' | 'price_asc' | 'price_desc'

export default function CatalogPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categorySlug = (params.category as string) || 'all'
  const searchQuery = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState(categorySlug)
  const [sort, setSort] = useState<SortOption>('popular')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  const category = getCategoryBySlug(selectedCategory)

  const filtered = useMemo(() => {
    let result = searchQuery
      ? searchProducts(searchQuery)
      : selectedCategory === 'all'
        ? products
        : products.filter((p) => p.category === selectedCategory)

    switch (sort) {
      case 'price_asc':
        result = [...result].sort((a, b) => a.price_min - b.price_min)
        break
      case 'price_desc':
        result = [...result].sort((a, b) => b.price_min - a.price_min)
        break
    }

    return result
  }, [selectedCategory, sort, searchQuery])

  const pageTitle = searchQuery
    ? `Результати: "${searchQuery}"`
    : category
      ? `${category.emoji} ${category.name}`
      : 'Усі товари'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-3xl sm:text-4xl font-medium text-[#1C1C1C] mb-8">
        {pageTitle}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
        />

        <div className="flex-1">
          <SortBar value={sort} onChange={setSort} count={filtered.length} />
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  )
}
