'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Product } from '@/mock/products'

// ─── Single list model ────────────────────────────────────────────────────────
// Each item starts with store=null (shopping list).
// After user picks a store → store+price are set (item becomes part of "cart").
// One list. Two states per item.
// ─────────────────────────────────────────────────────────────────────────────

export interface ShoppingListEntry {
  product: Product
  store: { id: string; name: string } | null
  price: number | null
}

interface ShoppingListContextType {
  entries: ShoppingListEntry[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInList: (productId: string) => boolean
  clearList: () => void
  /** Assign a store+price to every item that has no store yet */
  setStoreForAll: (
    store: { id: string; name: string },
    getPriceForProduct: (productId: string) => number | null
  ) => void
  /** Remove store assignment from a single item */
  clearItemStore: (productId: string) => void
  // ── Derived ──
  count: number
  itemsWithStore: ShoppingListEntry[]
  itemsWithoutStore: ShoppingListEntry[]
  /** All items have a store assigned */
  isFullCart: boolean
  cartTotal: number
}

const ShoppingListContext = createContext<ShoppingListContextType | null>(null)

const STORAGE_KEY = 'alcoplace-shopping-list-v2'

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ShoppingListEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  // ── Persistence ──────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setEntries(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries, loaded])

  // ── Actions ──────────────────────────────────────────────────────────────
  const addItem = useCallback((product: Product) => {
    setEntries((prev) => {
      if (prev.some((e) => e.product.id === product.id)) return prev
      return [...prev, { product, store: null, price: null }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setEntries((prev) => prev.filter((e) => e.product.id !== productId))
  }, [])

  const isInList = useCallback(
    (productId: string) => entries.some((e) => e.product.id === productId),
    [entries]
  )

  const clearList = useCallback(() => setEntries([]), [])

  const setStoreForAll = useCallback(
    (
      store: { id: string; name: string },
      getPriceForProduct: (productId: string) => number | null
    ) => {
      setEntries((prev) =>
        prev.map((e) =>
          e.store === null
            ? { ...e, store, price: getPriceForProduct(e.product.id) }
            : e
        )
      )
    },
    []
  )

  const clearItemStore = useCallback((productId: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.product.id === productId ? { ...e, store: null, price: null } : e
      )
    )
  }, [])

  // ── Derived ──────────────────────────────────────────────────────────────
  const itemsWithStore = entries.filter((e) => e.store !== null)
  const itemsWithoutStore = entries.filter((e) => e.store === null)
  const isFullCart = entries.length > 0 && itemsWithoutStore.length === 0
  const cartTotal = itemsWithStore.reduce((s, e) => s + (e.price ?? 0), 0)

  return (
    <ShoppingListContext.Provider
      value={{
        entries,
        addItem,
        removeItem,
        isInList,
        clearList,
        setStoreForAll,
        clearItemStore,
        count: entries.length,
        itemsWithStore,
        itemsWithoutStore,
        isFullCart,
        cartTotal,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  )
}

export function useShoppingList() {
  const ctx = useContext(ShoppingListContext)
  if (!ctx) throw new Error('useShoppingList must be used within ShoppingListProvider')
  return ctx
}
