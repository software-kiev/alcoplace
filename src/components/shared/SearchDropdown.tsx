'use client'

import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Check } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { useShoppingList } from '@/lib/shopping-list-context'
import type { Product } from '@/mock/products'

interface SearchDropdownProps {
  results: Product[]
  query: string
  onClose: () => void
  size?: 'sm' | 'md'
}

function highlightMatch(text: string, query: string) {
  if (query.length < 2) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-[#C6A45A] font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

function attrLine(p: Product) {
  return [p.country, p.category === 'whisky' || p.category === 'cognac' ? p.brand : p.color, p.volume]
    .filter(Boolean)
    .join(' · ')
}

export function SearchDropdown({ results, query, onClose, size = 'md' }: SearchDropdownProps) {
  const { addItem, isInList } = useShoppingList()

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInList(product.id)) return
    addItem(product)
    showToast(product.name)
  }

  const imgSize = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11'
  const imgPx = size === 'sm' ? '36px' : '44px'
  const py = size === 'sm' ? 'py-2' : 'py-2.5'

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E5E0D8] shadow-xl overflow-hidden z-50"
    >
      {results.map((p) => {
        const inList = isInList(p.id)
        return (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className={`flex items-center gap-3 px-4 ${py} hover:bg-[#F0EDE6] transition-colors group`}
            onClick={() => onClose()}
          >
            <div className={`${imgSize} rounded-lg bg-[#F5F3EE] overflow-hidden flex-shrink-0 relative`}>
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                className="object-cover"
                sizes={imgPx}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#1C1C1C] truncate">
                {highlightMatch(p.name, query)}
              </div>
              <div className="text-[11px] text-[#9E9890] truncate">{attrLine(p)}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs font-medium text-[#2D6A4F]">
                  від {formatPrice(p.price_min)} ₴
                </div>
                <div className="text-[10px] text-[#9E9890]">
                  у {p.store_count} магазинах
                </div>
              </div>
              <button
                onClick={(e) => handleAdd(e, p)}
                className={`flex items-center justify-center rounded-lg transition-all ${
                  inList
                    ? 'w-7 h-7 bg-[#E8F5ED] text-[#2D6A4F] cursor-default'
                    : 'w-7 h-7 bg-[#F0EDE6] text-[#6B6560] hover:bg-[#1E3A2F] hover:text-white'
                }`}
                title={inList ? 'У списку' : 'Додати до списку'}
              >
                {inList ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </button>
            </div>
          </Link>
        )
      })}

      {/* Show all results */}
      <Link
        href={`/catalog/all?q=${encodeURIComponent(query)}`}
        onClick={() => onClose()}
        className="flex items-center justify-center px-4 py-3 text-xs font-medium text-[#1E3A2F] hover:bg-[#F0EDE6] transition-colors border-t border-[#E5E0D8]"
      >
        Показати всі результати для &ldquo;{query}&rdquo;
      </Link>
    </motion.div>
  )
}

// Lightweight toast
function showToast(productName: string) {
  const existing = document.getElementById('search-toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'search-toast'
  toast.textContent = `✓ ${productName} додано до списку`
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1E3A2F',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '500',
    zIndex: '9999',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    opacity: '0',
    transition: 'opacity 0.2s',
  })
  document.body.appendChild(toast)
  requestAnimationFrame(() => { toast.style.opacity = '1' })
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => toast.remove(), 200)
  }, 2000)
}
