'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const ProductMapInner = dynamic(
  () => import('./ProductMapInner').then((m) => ({ default: m.ProductMapInner })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[260px] w-full rounded-xl" />,
  }
)

interface ProductMapProps {
  productId: string
}

export function ProductMap({ productId }: ProductMapProps) {
  return <ProductMapInner productId={productId} />
}
