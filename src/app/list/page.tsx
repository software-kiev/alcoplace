'use client'

import { Suspense, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useShoppingList } from '@/lib/shopping-list-context'
import { ShoppingList } from '@/components/list/ShoppingList'
import { StoreCard } from '@/components/list/StoreCard'
import { StoreMap } from '@/components/list/StoreMap'
import { SkeletonCard } from '@/components/shared/SkeletonCard'
import { stores } from '@/mock/stores'
import { offers } from '@/mock/offers'
import { ui } from '@/lib/ui-strings'
import { formatPrice } from '@/lib/format'
import { Map, List, ArrowLeft, ShoppingBag, Trophy, MapPin } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

type SortMode = 'coverage' | 'distance' | 'price'
type View = 'list' | 'finder' | 'checkout'

export default function ListPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><SkeletonCard /></div>}>
      <ListPageInner />
    </Suspense>
  )
}

function ListPageInner() {
  const { entries, itemsWithoutStore, setStoreForAll } = useShoppingList()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read view from URL, default to 'list'
  const urlView = searchParams.get('view') as View | null
  const view: View = urlView === 'finder' || urlView === 'checkout' ? urlView : 'list'

  const setView = useCallback((v: View) => {
    if (v === 'list') {
      router.replace('/list', { scroll: false })
    } else {
      router.replace(`/list?view=${v}`, { scroll: false })
    }
  }, [router])

  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState<SortMode>('coverage')
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')

  // Items that still need a store (only these are matched in finder)
  const unassignedProducts = itemsWithoutStore.map((e) => e.product)

  const storeResults = useMemo(() => {
    if (view !== 'finder' || unassignedProducts.length === 0) return []

    return stores
      .map((store) => {
        const storeOffers = offers.filter((o) => o.store_id === store.id)
        const matchedItems = unassignedProducts
          .map((product) => {
            const offer = storeOffers.find(
              (o) => o.product_id === product.id && o.availability !== 'out_of_stock'
            )
            return offer ? { name: product.name, price: offer.price } : null
          })
          .filter(Boolean) as { name: string; price: number }[]

        return {
          storeId: store.id,
          storeName: store.name,
          address: store.address,
          lat: store.lat,
          lng: store.lng,
          distance_km: store.distance_km,
          products_found: matchedItems.length,
          total_products: unassignedProducts.length,
          items: matchedItems,
          total_price: matchedItems.reduce((s, i) => s + i.price, 0),
        }
      })
      .filter((r) => r.products_found > 0)
      .sort((a, b) => {
        if (sort === 'coverage') {
          if (b.products_found !== a.products_found) return b.products_found - a.products_found
          return a.distance_km - b.distance_km
        }
        if (sort === 'price') {
          // Sort by total price, then by coverage
          if (a.total_price !== b.total_price) return a.total_price - b.total_price
          return b.products_found - a.products_found
        }
        return a.distance_km - b.distance_km
      })
  }, [view, unassignedProducts, sort])

  // Best store = full coverage + lowest price (or just lowest price if none has full)
  const bestStore = useMemo(() => {
    if (storeResults.length === 0) return null
    const fullCoverage = storeResults.filter((s) => s.products_found === s.total_products)
    const pool = fullCoverage.length > 0 ? fullCoverage : storeResults
    return pool.reduce((best, s) => (s.total_price < best.total_price ? s : best), pool[0])
  }, [storeResults])

  // Second-best total price for savings calculation
  const secondBestPrice = useMemo(() => {
    if (!bestStore || storeResults.length < 2) return null
    const others = storeResults.filter((s) => s.storeId !== bestStore.storeId && s.products_found === s.total_products)
    if (others.length === 0) return null
    return Math.min(...others.map((s) => s.total_price))
  }, [bestStore, storeResults])

  const handleFindStores = () => {
    setLoading(true)
    setTimeout(() => {
      setView('finder')
      setLoading(false)
    }, 800)
  }

  const handleSelectStore = (storeId: string, storeName: string) => {
    setStoreForAll(
      { id: storeId, name: storeName },
      (productId) => {
        const offer = offers.find(
          (o) => o.store_id === storeId && o.product_id === productId && o.availability !== 'out_of_stock'
        )
        return offer?.price ?? null
      }
    )
    setView('list')
  }

  const sortLabels: Record<SortMode, string> = {
    coverage: ui.list.byCoverage,
    distance: ui.list.byDistance,
    price: 'За ціною',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        {view === 'finder' && (
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#1C1C1C] transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад до списку
          </button>
        )}
        <h1 className="font-heading text-3xl sm:text-4xl font-medium text-[#1C1C1C]">
          {view === 'finder' ? 'Знайти магазин' : ui.list.title}
        </h1>
        {view === 'list' && entries.length > 0 && (
          <p className="text-sm text-[#9E9890] mt-1">
            Додайте товари — ми покажемо де купити їх поруч по найкращій ціні
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">

        {/* ── View: list ───────────────────────────────────────────── */}
        {view === 'list' && !loading && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <ShoppingList
              onFindStores={handleFindStores}
              onCheckout={() => setView('checkout')}
            />
          </motion.div>
        )}

        {/* ── View: loading skeleton ───────────────────────────────── */}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </motion.div>
        )}

        {/* ── View: store finder ───────────────────────────────────── */}
        {view === 'finder' && !loading && (
          <motion.div
            key="finder"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Summary bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0EDE6] flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="h-5 w-5 text-[#1E3A2F]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1C]">
                      {unassignedProducts.length} {unassignedProducts.length === 1 ? 'товар' : unassignedProducts.length < 5 ? 'товари' : 'товарів'} у списку
                    </p>
                    <p className="text-xs text-[#9E9890]">
                      <MapPin className="h-3 w-3 inline mr-0.5 -mt-px" />
                      Знайдено {storeResults.length} {storeResults.length === 1 ? 'магазин' : storeResults.length < 5 ? 'магазини' : 'магазинів'} поруч
                    </p>
                  </div>
                </div>
                {bestStore && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F0FAF4] border border-[#2D6A4F]/15">
                    <Trophy className="h-4 w-4 text-[#C6A45A]" />
                    <div>
                      <p className="text-[11px] text-[#9E9890]">Найкраща ціна</p>
                      <p className="text-sm font-semibold text-[#1E3A2F]">
                        {bestStore.storeName} — {formatPrice(bestStore.total_price)} ₴
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sort tabs + mobile toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {(['coverage', 'price', 'distance'] as SortMode[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      sort === s ? 'bg-[#1E3A2F] text-white' : 'text-[#6B6560] hover:bg-[#F0EDE6]'
                    }`}
                  >
                    {sortLabels[s]}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 md:hidden">
                {(['list', 'map'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setMobileView(v)}
                    className={`p-2 rounded-lg ${mobileView === v ? 'bg-[#1E3A2F] text-white' : 'text-[#6B6560]'}`}
                  >
                    {v === 'list' ? <List className="h-4 w-4" /> : <Map className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Split layout */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Store cards */}
              <div className={`md:w-2/5 space-y-3 ${mobileView === 'map' ? 'hidden md:block' : ''}`}>
                {storeResults.map((store, i) => {
                  const isBest = bestStore?.storeId === store.storeId
                  const savings = isBest && secondBestPrice ? secondBestPrice - store.total_price : 0

                  return (
                    <motion.div
                      key={store.storeId}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08, ease: 'easeOut' }}
                    >
                      <StoreCard
                        store={store}
                        isActive={activeStoreId === store.storeId}
                        isBest={isBest}
                        savings={savings}
                        onClick={() => setActiveStoreId(store.storeId)}
                        onSelect={() => handleSelectStore(store.storeId, store.storeName)}
                      />
                    </motion.div>
                  )
                })}
              </div>

              {/* Map */}
              <div className={`md:w-3/5 ${mobileView === 'list' ? 'hidden md:block' : ''}`}>
                <div
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.04)]"
                  style={{ height: 700 }}
                >
                  <StoreMap
                    stores={storeResults}
                    activeStoreId={activeStoreId}
                    onStoreClick={setActiveStoreId}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── View: checkout placeholder ───────────────────────────── */}
        {view === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center py-16"
          >
            <div className="text-5xl mb-4">🛍️</div>
            <h2 className="font-heading text-2xl font-medium text-[#1C1C1C] mb-3">
              Ваше замовлення готово
            </h2>
            <p className="text-sm text-[#6B6560] mb-6">
              У реальному продукті тут буде оформлення — вибір часу, підтвердження та QR-код для магазину.
            </p>
            <button
              onClick={() => setView('list')}
              className="px-6 py-3 rounded-xl bg-[#1E3A2F] text-white font-medium hover:bg-[#162C23] transition-colors"
            >
              ← Назад до списку
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
