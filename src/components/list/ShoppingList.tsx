'use client'

import { X, ShoppingBag, Store, RotateCcw, ArrowRight, CheckCircle2, MapPin, Plus } from 'lucide-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useShoppingList } from '@/lib/shopping-list-context'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'

interface ShoppingListProps {
  onFindStores: () => void
  onCheckout: () => void
}

export function ShoppingList({ onFindStores, onCheckout }: ShoppingListProps) {
  const { entries, removeItem, clearItemStore, itemsWithStore, itemsWithoutStore, isFullCart, cartTotal } = useShoppingList()
  const [parentWithStore] = useAutoAnimate()
  const [parentWithout] = useAutoAnimate()

  // ── Empty state ─────────────────────────────────────────────────────────
  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-2xl bg-[#F0EDE6] flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="h-9 w-9 text-[#9E9890]" />
        </div>
        <h2 className="font-heading text-2xl font-medium text-[#1C1C1C] mb-2">
          {ui.list.empty}
        </h2>
        <p className="text-sm text-[#6B6560] mb-1 max-w-sm mx-auto">
          {ui.list.emptyHint}
        </p>
        <p className="text-sm text-[#9E9890] mb-8 max-w-xs mx-auto">
          Додайте товари і ми покажемо де купити їх поруч по найкращій ціні
        </p>
        <Link
          href="/catalog/all"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium transition-colors"
          style={{ background: 'linear-gradient(135deg, #1F4033, #2B5A45)' }}
        >
          <Plus className="h-4 w-4" />
          Перейти до каталогу
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* ── Summary card ───────────────────────────────────────────── */}
      <div className="p-4 rounded-xl bg-[#F5F3EE] border border-[#E5E0D8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1E3A2F] flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C1C1C]">
                {entries.length} {entries.length === 1 ? 'товар' : entries.length < 5 ? 'товари' : 'товарів'} у списку
              </p>
              <p className="text-xs text-[#9E9890]">
                {itemsWithStore.length > 0 && (
                  <span className="text-[#2D6A4F]">✓ {itemsWithStore.length} обрано в магазині</span>
                )}
                {itemsWithStore.length > 0 && itemsWithoutStore.length > 0 && ' · '}
                {itemsWithoutStore.length > 0 && (
                  <span>{itemsWithoutStore.length} потрібно знайти</span>
                )}
              </p>
            </div>
          </div>
          {isFullCart && (
            <div className="text-right">
              <p className="text-[10px] text-[#9E9890] uppercase tracking-wide">Разом</p>
              <p className="font-heading text-lg font-semibold text-[#C6A45A]">
                {formatPrice(cartTotal)} ₴
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Group 1: assigned to a store ─────────────────────────────── */}
      {itemsWithStore.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-[#2D6A4F]" />
            <h3 className="text-sm font-medium text-[#2D6A4F]">Вибрано в магазині</h3>
            <span className="text-xs text-[#9E9890] ml-auto">{itemsWithStore.length} шт</span>
          </div>

          <div ref={parentWithStore} className="space-y-2">
            {itemsWithStore.map((entry) => (
              <motion.div
                key={entry.product.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-[#2D6A4F]/20 bg-[#F0FAF4]"
              >
                <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-[#E8F5ED] flex-shrink-0">
                  <Image src={entry.product.images[0]} alt={entry.product.name} fill className="object-contain p-1" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1C1C1C] truncate">{entry.product.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Store className="h-3 w-3 text-[#2D6A4F]" />
                    <span className="text-xs text-[#2D6A4F]">{entry.store!.name}</span>
                    {entry.price !== null && (
                      <span className="text-xs font-semibold text-[#1E3A2F] ml-1">
                        {formatPrice(entry.price)} ₴
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => clearItemStore(entry.product.id)}
                    title="Прибрати магазин"
                    className="p-1.5 rounded-lg hover:bg-[#E8F5ED] transition-colors text-[#9E9890] hover:text-[#6B6560]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => removeItem(entry.product.id)}
                    className="p-1.5 rounded-lg hover:bg-[#F0EDE6] transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-[#9E9890]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Group 2: no store yet ─────────────────────────────────────── */}
      {itemsWithoutStore.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="h-4 w-4 text-[#9E9890]" />
            <h3 className="text-sm font-medium text-[#6B6560]">
              {itemsWithStore.length > 0 ? 'Ще потрібно знайти' : 'Список покупок'}
            </h3>
            <span className="text-xs text-[#9E9890] ml-auto">{itemsWithoutStore.length} шт</span>
          </div>

          <div ref={parentWithout} className="space-y-2">
            {itemsWithoutStore.map((entry) => (
              <div
                key={entry.product.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E0D8] bg-white"
              >
                <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-[#F0EDE6] flex-shrink-0">
                  <Image src={entry.product.images[0]} alt={entry.product.name} fill className="object-contain p-1" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1C1C1C] truncate">{entry.product.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#9E9890]">{entry.product.brand} · {entry.product.volume}</span>
                    <span className="text-xs text-[#6B6560] font-medium">від {formatPrice(entry.product.price_min)} ₴</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-[#2D6A4F]" />
                    <span className="text-[11px] text-[#2D6A4F]">у {entry.product.store_count} магазинах</span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(entry.product.id)}
                  className="p-1.5 rounded-lg hover:bg-[#F0EDE6] transition-colors flex-shrink-0"
                >
                  <X className="h-4 w-4 text-[#9E9890]" />
                </button>
              </div>
            ))}
          </div>

          {/* Add more products link */}
          <Link
            href="/catalog/all"
            className="flex items-center justify-center gap-1.5 mt-3 py-2.5 rounded-xl border border-dashed border-[#E5E0D8] text-sm text-[#9E9890] hover:text-[#6B6560] hover:border-[#C6A45A]/40 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Додати ще товарів
          </Link>
        </div>
      )}

      {/* ── CTAs ─────────────────────────────────────────────────────── */}
      <div className="space-y-3 pt-2">
        {/* Find stores — only when unassigned items exist */}
        {itemsWithoutStore.length > 0 && (
          <button
            onClick={onFindStores}
            className="w-full py-4 rounded-xl text-white font-medium text-base transition-colors flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #1F4033, #2B5A45)' }}
          >
            <MapPin className="h-4 w-4" />
            <span>Знайти де купити поруч</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {/* Checkout — only when all items are assigned */}
        {isFullCart && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onCheckout}
            className="w-full py-4 rounded-xl font-medium text-base text-white flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #C6A45A, #B8962E)' }}
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>Оформити замовлення — {formatPrice(cartTotal)} ₴</span>
          </motion.button>
        )}
      </div>
    </div>
  )
}
