import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'
import { MapPin, Check, Navigation, Trophy } from 'lucide-react'
import { motion } from 'motion/react'

interface StoreResult {
  storeId: string
  storeName: string
  address: string
  distance_km: number
  products_found: number
  total_products: number
  items: { name: string; price: number }[]
  total_price: number
}

interface StoreCardProps {
  store: StoreResult
  isActive: boolean
  isBest: boolean
  savings: number
  onClick: () => void
  onSelect: () => void
}

export function StoreCard({ store, isActive, isBest, savings, onClick, onSelect }: StoreCardProps) {
  const coverage = store.products_found / store.total_products
  const isFullCoverage = store.products_found === store.total_products

  const handleRoute = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`,
      '_blank'
    )
  }

  return (
    <div
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:-translate-y-[1px] ${
        isBest && !isActive
          ? 'border-[#2D6A4F]/25 bg-[#F0FAF4] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
          : isActive
            ? 'border-[#1E3A2F] bg-[#F0EDE6] shadow-md'
            : 'border-[#E5E0D8] bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#C6A45A]/40'
      }`}
    >
      {/* Best badge */}
      {isBest && (
        <div className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg bg-[#E8F5ED] w-fit">
          <Trophy className="h-3.5 w-3.5 text-[#C6A45A]" />
          <span className="text-[11px] font-semibold text-[#1A6B42]">Найкраща пропозиція</span>
        </div>
      )}

      {/* Store name + distance */}
      <div className="flex items-start justify-between mb-1">
        <span className="font-heading font-medium text-[15px] text-[#1C1C1C]">{store.storeName}</span>
        <span className="text-xs text-[#9E9890] flex items-center gap-1 flex-shrink-0 ml-2">
          <MapPin className="h-3 w-3" />
          {store.distance_km.toFixed(1)} км
        </span>
      </div>
      <p className="text-xs text-[#9E9890] mb-3">{store.address}</p>

      {/* Coverage bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[#6B6560]">{ui.list.itemsOf(store.products_found, store.total_products)}</span>
          {isFullCoverage ? (
            <span className="text-[#2D6A4F] font-medium flex items-center gap-1">
              <Check className="h-3 w-3" /> Всі товари доступні
            </span>
          ) : (
            <span className="text-[#E67E22] font-medium">Часткове покриття</span>
          )}
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#E5E0D8] overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${coverage * 100}%`,
              background: isFullCoverage
                ? 'linear-gradient(90deg, #2D6A4F, #4CAF50)'
                : 'linear-gradient(90deg, #E67E22, #F5A623)',
            }}
          />
        </div>
      </div>

      {/* Product list */}
      <div className="space-y-1 mb-3">
        {store.items.map((item, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-[#6B6560] truncate mr-2">{item.name}</span>
            <span className="text-[#1C1C1C] font-medium flex-shrink-0">{formatPrice(item.price)} ₴</span>
          </div>
        ))}
      </div>

      {/* Total price — prominent */}
      <div className="border-t border-[#E5E0D8] pt-3 mb-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] text-[#9E9890] uppercase tracking-wide">{ui.list.total}</span>
          <span className={`font-heading text-xl font-semibold ${isBest ? 'text-[#1A6B42]' : 'text-[#C6A45A]'}`}>
            {formatPrice(store.total_price)} ₴
          </span>
        </div>
        {isBest && savings > 0 && (
          <p className="text-[11px] text-[#2D6A4F] mt-0.5 text-right">
            Економія {formatPrice(savings)} ₴ порівняно з іншими
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
          className="flex-1 py-2.5 rounded-lg bg-[#1E3A2F] text-white text-xs font-medium hover:bg-[#162C23] transition-colors flex items-center justify-center gap-1.5"
        >
          <Check className="h-3.5 w-3.5" />
          Обрати магазин
        </motion.button>
        <button
          onClick={handleRoute}
          className="px-3 py-2.5 rounded-lg border border-[#E5E0D8] text-xs font-medium text-[#6B6560] hover:border-[#1E3A2F] hover:text-[#1E3A2F] transition-colors flex items-center gap-1.5"
        >
          <Navigation className="h-3.5 w-3.5" />
          Маршрут
        </button>
      </div>
    </div>
  )
}
