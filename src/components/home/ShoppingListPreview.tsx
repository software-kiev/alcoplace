'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ShoppingBag, ArrowRight, Plus } from 'lucide-react'
import { useShoppingList } from '@/lib/shopping-list-context'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'

export function ShoppingListPreview() {
  const { entries, count } = useShoppingList()

  // Show the first 3 items
  const previewItems = entries.slice(0, 3)
  const isEmpty = count === 0

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-[#E5E0D8] bg-white overflow-hidden"
        style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-medium text-[#1C1C1C]">
                  {ui.listPreview.heading}
                </h3>
                {!isEmpty && (
                  <p className="text-sm text-[#9E9890]">
                    {ui.listPreview.itemsCount(count)}
                  </p>
                )}
              </div>
            </div>
            {!isEmpty && (
              <Link
                href="/list"
                className="text-sm font-medium text-[#1E3A2F] hover:text-[#C6A45A] transition-colors hidden sm:inline-flex items-center gap-1"
              >
                {ui.listPreview.goToList}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {isEmpty ? (
            /* Empty state */
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-sm text-[#9E9890] mb-4">{ui.listPreview.empty}</p>
              <Link
                href="/catalog/all"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors"
                style={{ background: 'linear-gradient(135deg, #1F4033, #2B5A45)' }}
              >
                <Plus className="h-4 w-4" />
                {ui.listPreview.addMore}
              </Link>
            </div>
          ) : (
            <>
              {/* Product thumbnails */}
              <div className="flex gap-3 mb-5 overflow-hidden">
                {previewItems.map((entry) => (
                  <div
                    key={entry.product.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#F5F3EE] flex-1 min-w-0"
                  >
                    <div className="relative w-10 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-[#F0EDE6]">
                      <Image
                        src={entry.product.images[0]}
                        alt={entry.product.name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1C1C1C] truncate">
                        {entry.product.name}
                      </p>
                      <p className="text-xs text-[#9E9890]">
                        від {formatPrice(entry.product.price_min)} ₴
                      </p>
                    </div>
                  </div>
                ))}
                {count > 3 && (
                  <div className="flex items-center justify-center px-4 rounded-xl bg-[#F5F3EE] text-sm font-medium text-[#6B6560] flex-shrink-0">
                    +{count - 3}
                  </div>
                )}
              </div>

              {/* Hint + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[rgba(0,0,0,0.05)]">
                <p className="text-xs text-[#9E9890]">
                   {ui.listPreview.hint}
                </p>
                <Link
                  href="/list"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #1F4033, #2B5A45)' }}
                >
                  Порівняти ціни поруч →
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  )
}
