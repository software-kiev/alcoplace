'use client'

import { stores } from '@/mock/stores'
import { getOffersForProduct, type Offer } from '@/mock/offers'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'
import { MapPin, Navigation } from 'lucide-react'

interface OfferTableProps {
  productId: string
}

export function OfferTable({ productId }: OfferTableProps) {
  const productOffers = getOffersForProduct(productId)
  const sorted = [...productOffers].sort((a, b) => a.price - b.price)
  const bestPrice = sorted[0]?.price
  const secondPrice = sorted[1]?.price

  const availabilityLabel = (a: Offer['availability']) => {
    switch (a) {
      case 'in_stock': return ui.product.inStock
      case 'low_stock': return ui.product.lowStock
      case 'out_of_stock': return ui.product.outOfStock
    }
  }

  const availabilityColor = (a: Offer['availability']) => {
    switch (a) {
      case 'in_stock': return 'text-[#2D6A4F] bg-[#E8F5ED]'
      case 'low_stock': return 'text-[#E67E22] bg-[#FEF3E2]'
      case 'out_of_stock': return 'text-[#C0392B] bg-[#FDECEB]'
    }
  }

  return (
    <div id="stores" className="space-y-3">
      {sorted.map((offer, i) => {
        const store = stores.find((s) => s.id === offer.store_id)
        if (!store) return null
        const isBest = offer.price === bestPrice
        const savingsVsNext = isBest && secondPrice ? secondPrice - bestPrice : 0

        return (
          <div
            key={i}
            className={`flex items-center justify-between p-5 rounded-xl border hover:-translate-y-[2px] transition-all duration-200 ${
              isBest
                ? 'bg-[#F0FAF4] border-[#2D6A4F]/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                : 'bg-[#F9F8F6] border-[#E5E0D8] hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-heading font-medium text-[#1C1C1C]">
                  {store.name}
                </span>
                {isBest && (
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-lg bg-[#E8F5ED] text-[#1A6B42]">
                    ⭐ Найкраща ціна
                  </span>
                )}
              </div>
              <p className="text-xs text-[#9E9890]">{store.address}</p>
              {isBest && savingsVsNext > 0 && (
                <p className="text-[11px] text-[#2D6A4F] mt-1">
                  на {formatPrice(savingsVsNext)} ₴ дешевше за наступну пропозицію
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 sm:gap-4 ml-4">
              <div className="text-right">
                <p className={`text-lg font-semibold ${isBest ? 'text-[#1A6B42]' : 'text-[#1E3A2F]'}`}>
                  {formatPrice(offer.price)} ₴
                </p>
                <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md ${availabilityColor(offer.availability)}`}>
                  {availabilityLabel(offer.availability)}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-xs text-[#9E9890]">
                  <MapPin className="h-3 w-3" />
                  <span>{store.distance_km.toFixed(1)} км</span>
                </div>
                <button className="flex items-center gap-0.5 text-[10px] text-[#1E3A2F] hover:text-[#C6A45A] transition-colors font-medium">
                  <Navigation className="h-2.5 w-2.5" />
                  На карті
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
