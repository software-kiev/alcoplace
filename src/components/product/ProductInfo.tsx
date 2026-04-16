'use client'

import { motion, AnimatePresence } from 'motion/react'
import { StarRating } from '@/components/shared/StarRating'
import { useShoppingList } from '@/lib/shopping-list-context'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'
import type { Product } from '@/mock/products'
import Link from 'next/link'
import { getCategoryBySlug } from '@/mock/categories'
import { MapPin, ShoppingBag, ArrowDown } from 'lucide-react'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, removeItem, isInList } = useShoppingList()
  const inList = isInList(product.id)
  const category = getCategoryBySlug(product.category)

  const handleToggle = () => {
    if (inList) removeItem(product.id)
    else addItem(product)
  }

  const attrLine = [
    product.country,
    `${product.alcohol}%`,
    product.volume,
    ...(product.color ? [product.color] : []),
    ...(product.sweetness ? [product.sweetness] : []),
  ]

  const priceDiff = product.price_max - product.price_min

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#9E9890]">
        <Link href="/" className="hover:text-[#1E3A2F] transition-colors">Каталог</Link>
        <span>→</span>
        {category && (
          <>
            <Link
              href={`/catalog/${category.slug}`}
              className="hover:text-[#1E3A2F] transition-colors"
            >
              {category.name}
            </Link>
            <span>→</span>
          </>
        )}
        <span className="text-[#6B6560] truncate">{product.name}</span>
      </nav>

      {/* Product name */}
      <h1 className="font-heading text-[32px] sm:text-[36px] font-semibold text-[#1C1C1C] leading-tight" style={{ letterSpacing: '-0.02em' }}>
        {product.name}
      </h1>

      {/* Rating + review count */}
      <div className="flex items-center gap-3 flex-wrap">
        <StarRating rating={product.rating} size="md" />
        <span className="text-sm text-[#9E9890]">{product.review_count} відгуків</span>
        <span className="text-[10px] text-[#2D6A4F] bg-[#E8F5ED] px-2 py-0.5 rounded-md font-medium">
          Популярний вибір
        </span>
      </div>

      {/* Attribute row */}
      <p className="text-sm text-[#6B6560]">
        {attrLine.join(' · ')}
      </p>

      {/* Price card */}
      <div className="p-5 rounded-2xl bg-[#F6F5F3] border border-[#E5E0D8]">
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-semibold text-[#1E3A2F]" style={{ fontFamily: 'var(--font-body)' }}>
            {formatPrice(product.price_min)} ₴
          </span>
          <span className="text-[13px] text-[#9E9890]">найкраща ціна</span>
        </div>

        {/* Price range + savings */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
          <span className="text-xs text-[#9E9890]">
            Ціни у магазинах: {formatPrice(product.price_min)}–{formatPrice(product.price_max)} ₴
          </span>
          {priceDiff > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2D6A4F] bg-[#E8F5ED] px-2 py-0.5 rounded-md">
              <ArrowDown className="h-3 w-3" />
              економія до {formatPrice(priceDiff)} ₴
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#E5E0D8]/60">
          <MapPin className="h-3.5 w-3.5 text-[#2D6A4F]" />
          <span className="text-sm text-[#2D6A4F] font-medium">
            {ui.product.availableIn(product.store_count)}
          </span>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="space-y-2.5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className={`w-full py-3.5 rounded-xl font-medium text-base transition-all flex items-center justify-center gap-2 ${
            inList
              ? 'bg-[#2D6A4F] text-white'
              : 'text-white hover:brightness-110 shadow-sm hover:shadow-md'
          }`}
          style={!inList ? {
            background: 'linear-gradient(135deg, #1F4033, #2B5A45)',
          } : undefined}
        >
          <ShoppingBag className="h-4 w-4" />
          {inList ? ui.catalog.inList : ui.product.addToList}
        </motion.button>

        {/* Secondary CTA or post-add actions */}
        <AnimatePresence mode="wait">
          {inList ? (
            <motion.div
              key="in-list"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2"
            >
              <Link
                href="/list"
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center border border-[#1E3A2F] text-[#1E3A2F] hover:bg-[#1E3A2F] hover:text-white transition-colors"
              >
                Перейти до списку
              </Link>
              <Link
                href="/catalog/all"
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center border border-[#E5E0D8] text-[#6B6560] hover:border-[#1E3A2F] hover:text-[#1E3A2F] transition-colors"
              >
                Продовжити пошук
              </Link>
            </motion.div>
          ) : (
            <motion.a
              key="not-in-list"
              href="#stores"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="block w-full py-2.5 rounded-xl text-sm font-medium text-center border border-[#E5E0D8] text-[#6B6560] hover:border-[#1E3A2F] hover:text-[#1E3A2F] transition-colors"
            >
              Переглянути магазини ↓
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      {/* Tasting notes */}
      {product.tasting_notes && product.tasting_notes.length > 0 && (
        <div className="pt-5 border-t border-[#E5E0D8]">
          <h3 className="text-[11px] text-[#9E9890] uppercase mb-3 font-medium" style={{ letterSpacing: '0.06em' }}>
            Смакові ноти
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {product.tasting_notes.map((note) => (
              <span
                key={note}
                className="px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#E5E0D8] text-[13px] text-[#6B6560]"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="pt-5 border-t border-[#E5E0D8]">
        <h3 className="text-[11px] text-[#9E9890] uppercase mb-3 font-medium" style={{ letterSpacing: '0.06em' }}>
          Про напій
        </h3>
        <p className="text-[15px] text-[#6B6560] leading-relaxed">{product.description}</p>
      </div>
    </div>
  )
}
