'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { stores } from '@/mock/stores'
import { getOffersForProduct } from '@/mock/offers'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'

const storePin = new L.DivIcon({
  html: '<div style="width:28px;height:28px;border-radius:50%;background:#1E3A2F;border:3px solid #C6A45A;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><div style="width:6px;height:6px;border-radius:50%;background:#C6A45A"></div></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -16],
  className: '',
})

interface ProductMapProps {
  productId: string
}

export function ProductMapInner({ productId }: ProductMapProps) {
  const offers = getOffersForProduct(productId)
  const storesWithOffers = offers
    .map((o) => {
      const store = stores.find((s) => s.id === o.store_id)
      return store ? { store, offer: o } : null
    })
    .filter(Boolean) as { store: (typeof stores)[0]; offer: (typeof offers)[0] }[]

  if (storesWithOffers.length === 0) return null

  const center: [number, number] = [
    storesWithOffers.reduce((s, i) => s + i.store.lat, 0) / storesWithOffers.length,
    storesWithOffers.reduce((s, i) => s + i.store.lng, 0) / storesWithOffers.length,
  ]

  return (
    <div className="w-full h-[280px] sm:h-[380px]" style={{ filter: 'saturate(0.8) contrast(0.92)' }}>
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {storesWithOffers.map(({ store, offer }) => (
          <Marker key={store.id} position={[store.lat, store.lng]} icon={storePin}>
            <Popup>
              <div className="text-sm">
                <p className="font-medium">{store.name}</p>
                <p className="text-[#1E3A2F] font-semibold">{formatPrice(offer.price)} ₴</p>
                <p className="text-xs text-[#2D6A4F]">{ui.product.inStock}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
