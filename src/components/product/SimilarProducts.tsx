'use client'

import { motion } from 'motion/react'
import { ProductCard } from '@/components/shared/ProductCard'
import { products, type Product } from '@/mock/products'
import { ui } from '@/lib/ui-strings'

interface SimilarProductsProps {
  currentProduct: Product
}

export function SimilarProducts({ currentProduct }: SimilarProductsProps) {
  const similar = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category === currentProduct.category
    )
    .slice(0, 6)

  if (similar.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mt-0"
    >
      <h2 className="font-heading text-xl sm:text-2xl font-medium text-[#1C1C1C] mb-6">
        {ui.product.similar}
      </h2>
      <div
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {similar.map((p, i) => (
          <div key={p.id} className="flex-shrink-0 w-44 sm:w-56">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </motion.section>
  )
}
