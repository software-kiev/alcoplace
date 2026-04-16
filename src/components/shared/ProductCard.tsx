'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { StarRating } from '@/components/shared/StarRating'
import { useShoppingList } from '@/lib/shopping-list-context'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'
import type { Product } from '@/mock/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, removeItem, isInList } = useShoppingList()
  const inList = isInList(product.id)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inList) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Link href={`/product/${product.id}`} className="block group">
        <div className="relative rounded-xl bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] overflow-hidden"
             style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          {/* Gold bottom line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6A45A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

          <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-[#F0EDE6]">
            {/* Radial glow behind product */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-[#C6A45A]/10 blur-2xl" />
            </div>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4 relative z-10"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-[#0F1A17]/70 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                18+
              </span>
            </div>
          </div>

          <h3 className="font-heading font-medium text-sm text-[#1C1C1C] line-clamp-2 leading-tight mb-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#9E9890] mb-1">
            {product.brand} · {product.volume} · {product.alcohol}%
          </p>

          <StarRating rating={product.rating} />

          {/* Price + availability */}
          <div className="mt-3 mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-[#9E9890]">від</span>
              <span className="text-lg font-semibold text-[#1E3A2F]">
                {formatPrice(product.price_min)} ₴
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 text-[#2D6A4F]" />
              <span className="text-xs text-[#2D6A4F] font-medium">
                {ui.catalog.inStores(product.store_count)}
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleToggle}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                inList
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-[#1E3A2F] text-white hover:bg-[#162C23]'
              }`}
            >
              {inList ? ui.catalog.inList : ui.catalog.toList}
            </motion.button>
            <span
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-2 rounded-lg text-xs font-medium border border-[#E5E0D8] text-[#6B6560] hover:border-[#1E3A2F] hover:text-[#1E3A2F] transition-colors cursor-pointer"
            >
              {ui.catalog.whereToBuy}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
