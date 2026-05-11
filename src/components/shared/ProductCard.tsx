'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { MapPin, Heart } from 'lucide-react'
import { StarRating } from '@/components/shared/StarRating'
import { useShoppingList } from '@/lib/shopping-list-context'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'
import { useState } from 'react'
import type { Product } from '@/mock/products'

interface ProductCardProps {
  product: Product
  index?: number
}

function getBadge(product: Product): { label: string; style: string } | null {
  if (product.rating >= 4.7 && product.review_count >= 80) {
    return { label: 'Популярне', style: 'bg-[#1E3A2F]/55 text-white/90 backdrop-blur-sm' }
  }
  if (product.store_count >= 7) {
    return { label: 'Краща ціна', style: 'bg-[#C6A45A]/65 text-[#1C1C1C]/90 backdrop-blur-sm' }
  }
  return null
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, removeItem, isInList } = useShoppingList()
  const [wishlisted, setWishlisted] = useState(false)
  const inList = isInList(product.id)
  const badge = getBadge(product)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    inList ? removeItem(product.id) : addItem(product)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted(w => !w)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
    >
      <Link href={`/product/${product.id}`} className="block group">
        <div
          className="relative rounded-xl bg-white p-4 transition-all duration-300 hover:-translate-y-[4px] overflow-hidden"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03)', }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 38px rgba(30,58,47,0.13), 0 3px 10px rgba(0,0,0,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03)')}
        >
          {/* Gold accent bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C6A45A]/0 via-[#C6A45A] to-[#C6A45A]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-center" />

          {/* Image area */}
          <div className="relative aspect-[4/5] mb-2 overflow-hidden rounded-lg bg-[#F5F3EE]">
            {/* Warm glow behind product */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-[#C6A45A]/8 blur-2xl" />
            </div>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-2 relative z-10 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              aria-label="До обраного"
              className={`absolute top-2 left-2 z-20 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                wishlisted
                  ? 'bg-white/95 opacity-100'
                  : 'bg-white/75 opacity-40 group-hover:opacity-100 hover:bg-white/95'
              }`}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors duration-200 ${wishlisted ? 'fill-[#B83232] text-[#B83232]' : 'text-[#8A847C]'}`}
              />
            </button>

            {/* 18+ badge */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-[#0F1A17]/65 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                18+
              </span>
            </div>

            {/* Product badge */}
            {badge && (
              <div className="absolute bottom-2 left-2 z-10">
                <span className={`text-[9px] font-medium px-1.5 py-[3px] rounded-full backdrop-blur-sm tracking-wide ${badge.style}`}>
                  {badge.label}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <h3 className="font-heading font-semibold text-[14.5px] text-[#1A1A1A] line-clamp-2 leading-[1.25] mb-0.5 tracking-[-0.01em]">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#C0BAB2] mb-1.5 tracking-wide">
            {product.brand} · {product.volume} · {product.alcohol}%
          </p>

          <StarRating rating={product.rating} />

          {/* Price */}
          <div className="mt-2 mb-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] text-[#C0BAB2]">від</span>
              <span className="text-[18px] font-bold text-[#1E3A2F] leading-none tracking-[-0.02em]">
                {formatPrice(product.price_min)} ₴
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="h-2.5 w-2.5 text-[#4A9068]" />
              <span className="text-[11px] text-[#4A9068]">
                {ui.catalog.inStores(product.store_count)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleToggle}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                inList
                  ? 'text-white'
                  : 'text-white hover:brightness-110'
              }`}
              style={inList
                ? { background: '#2D6A4F', boxShadow: '0 1px 6px rgba(45,106,79,0.35)' }
                : { background: 'linear-gradient(160deg, #243F33 0%, #1A2E24 100%)', boxShadow: '0 1px 6px rgba(30,58,47,0.3)' }
              }
            >
              {inList ? ui.catalog.inList : ui.catalog.toList}
            </motion.button>
            <span
              onClick={e => e.stopPropagation()}
              className="px-3 py-2 rounded-lg text-xs font-medium border border-[#EAE6DF] text-[#7A746C] hover:border-[#1E3A2F]/30 hover:text-[#1E3A2F] hover:bg-[#F7F5F1] transition-all duration-200 cursor-pointer"
            >
              {ui.catalog.whereToBuy}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
