'use client'

import { AgeGate } from '@/components/home/AgeGate'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { ProductRow } from '@/components/home/ProductRow'
import { ShoppingListPreview } from '@/components/home/ShoppingListPreview'
import { HowItWorks } from '@/components/home/HowItWorks'
import { PromoCarousel } from '@/components/home/PromoCarousel'
import { EditorialSection } from '@/components/home/EditorialSection'
import { TrustSection } from '@/components/home/TrustSection'
import { BottomCta } from '@/components/home/BottomCta'
import { products } from '@/mock/products'
import { ui } from '@/lib/ui-strings'

export default function HomePage() {
  const topProducts = products.slice(0, 10)
  const recommendations = products.slice(10, 20)

  return (
    <>
      <AgeGate />
      {/* 1. Hero with value proposition + search + chips */}
      <HeroSection />
      {/* 2. Categories — entry to catalog */}
      <CategoryGrid />
      {/* 3. Popular products — immediate shopping signal */}
      <ProductRow title={ui.catalog.topProducts} products={topProducts} viewAllHref="/catalog/all" />
      {/* 4. Shopping list preview — key feature visibility */}
      <ShoppingListPreview />
      {/* 5. How it works — explain the unique flow */}
      <HowItWorks />
      {/* 6. Promo banners — commerce-oriented */}
      <PromoCarousel />
      {/* 7. More products — "frequently searched" */}
      <ProductRow title={ui.catalog.recommendations} products={recommendations} viewAllHref="/catalog/all" />
      {/* 8. Editorial — content layer */}
      <EditorialSection />
      {/* 9. Trust signals */}
      <TrustSection />
      {/* 10. Bottom CTA */}
      <BottomCta />
    </>
  )
}
