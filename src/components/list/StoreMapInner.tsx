'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { formatPrice } from '@/lib/format'
import { ui } from '@/lib/ui-strings'

const makePin = (active: boolean) => new L.DivIcon({
  html: `<div style="width:${active ? '34' : '28'}px;height:${active ? '34' : '28'}px;border-radius:50%;background:${active ? '#C6A45A' : '#1E3A2F'};border:3px solid ${active ? '#fff' : '#C6A45A'};box-shadow:0 2px ${active ? '12' : '8'}px rgba(0,0,0,${active ? '0.4' : '0.3'});display:flex;align-items:center;justify-content:center;transition:all 0.2s"><div style="width:${active ? '8' : '6'}px;height:${active ? '8' : '6'}px;border-radius:50%;background:${active ? '#fff' : '#C6A45A'}"></div></div>`,
  iconSize: active ? [34, 34] : [28, 28],
  iconAnchor: active ? [17, 17] : [14, 14],
  popupAnchor: [0, active ? -19 : -16],
  className: '',
})

const userIcon = new L.DivIcon({
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#1E3A2F;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  className: '',
})

interface StoreMapResult {
  storeId: string
  storeName: string
  lat: number
  lng: number
  total_price: number
  products_found: number
  total_products: number
}

interface StoreMapInnerProps {
  stores: StoreMapResult[]
  activeStoreId: string | null
  onStoreClick: (storeId: string) => void
}

// Mock user location: Kyiv center
const USER_LOCATION: [number, number] = [50.4501, 30.5234]

export function StoreMapInner({ stores, activeStoreId, onStoreClick }: StoreMapInnerProps) {
  if (stores.length === 0) return null

  return (
    <div className="w-full" style={{ height: 700, filter: 'saturate(0.8) contrast(0.92)' }}>
      <MapContainer
        center={USER_LOCATION}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={USER_LOCATION} icon={userIcon}>
          <Popup>Ваше місцезнаходження</Popup>
        </Marker>
        {stores.map((store) => (
          <Marker
            key={store.storeId}
            position={[store.lat, store.lng]}
            icon={makePin(store.storeId === activeStoreId)}
            zIndexOffset={store.storeId === activeStoreId ? 1000 : 0}
            eventHandlers={{
              click: () => onStoreClick(store.storeId),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-medium">{store.storeName}</p>
                <p className="text-[#1E3A2F] font-semibold">{formatPrice(store.total_price)} ₴</p>
                <p className="text-xs text-[#6B6560]">
                  {ui.list.itemsOf(store.products_found, store.total_products)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
