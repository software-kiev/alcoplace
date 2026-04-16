'use client'

import { useParams, notFound } from 'next/navigation'
import { getProductById } from '@/mock/products'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { OfferTable } from '@/components/product/OfferTable'
import { ProductMap } from '@/components/product/ProductMap'
import { SimilarProducts } from '@/components/product/SimilarProducts'
import { ui } from '@/lib/ui-strings'
import { formatPrice } from '@/lib/format'

export default function ProductPage() {
  const params = useParams()
  const product = getProductById(params.id as string)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-[#F6F5F3] min-h-screen -mt-16 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Product hero card ── */}
        <div
          className="bg-white rounded-3xl overflow-hidden border border-[rgba(0,0,0,0.04)]"
          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}
        >
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
              <ProductGallery images={product.images} name={product.name} />
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        {/* ── Store offers section ── */}
        <div
          className="bg-white rounded-3xl overflow-hidden border border-[rgba(0,0,0,0.04)]"
          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}
        >
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl font-medium text-[#1C1C1C]">
                  {ui.product.whereToBuy}
                </h2>
                <p className="text-sm text-[#9E9890] mt-1">
                  Знайдено {product.store_count} пропозицій поруч
                </p>
              </div>
              <span className="text-xs text-[#2D6A4F] bg-[#E8F5ED] px-3 py-1 rounded-lg font-medium hidden sm:inline-block">
                від {formatPrice(product.price_min)} ₴
              </span>
            </div>
            <OfferTable productId={product.id} />
          </div>
        </div>

        {/* ── Map card ── */}
        <div
          className="bg-white rounded-3xl overflow-hidden border border-[rgba(0,0,0,0.04)]"
          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}
        >
          <div className="px-6 sm:px-10 pt-6 sm:pt-8 pb-4 flex items-center justify-between border-b border-[rgba(0,0,0,0.05)]">
            <h2 className="font-heading text-xl font-medium text-[#1C1C1C]">
              Магазини на карті
            </h2>
            <span className="text-sm text-[#9E9890] flex items-center gap-1">
              📍 {product.store_count} магазинів поруч
            </span>
          </div>
          <ProductMap productId={product.id} />
        </div>

        {/* ── Similar products ── */}
        <SimilarProducts currentProduct={product} />
      </div>
    </div>
  )
}
