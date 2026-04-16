'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const StoreMapInner = dynamic(
  () => import('./StoreMapInner').then((m) => ({ default: m.StoreMapInner })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
  }
)

interface StoreMapResult {
  storeId: string
  storeName: string
  lat: number
  lng: number
  total_price: number
  products_found: number
  total_products: number
}

interface StoreMapProps {
  stores: StoreMapResult[]
  activeStoreId: string | null
  onStoreClick: (storeId: string) => void
}

export function StoreMap({ stores, activeStoreId, onStoreClick }: StoreMapProps) {
  return (
    <StoreMapInner
      stores={stores}
      activeStoreId={activeStoreId}
      onStoreClick={onStoreClick}
    />
  )
}
