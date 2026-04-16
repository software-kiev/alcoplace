'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

const steps = [
  {
    number: '1',
    title: 'Додайте напої до списку',
    desc: 'Вино, пиво, віскі — будь-що. Створіть свій список покупок за кілька кліків.',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=360&fit=crop&q=80',
  },
  {
    number: '2',
    title: 'Ми знайдемо ціни поруч',
    desc: 'Порівнюємо ціни у найближчих магазинах і показуємо де купити дешевше.',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=360&fit=crop&q=80',
  },
  {
    number: '3',
    title: 'Оберіть найкращий магазин',
    desc: 'Обирайте за ціною, відстанню або покриттям списку — і економте на кожній покупці.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&h=360&fit=crop&q=80',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-[#0F1A17] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-medium text-[#F3F2EE] mb-3">
            Як це працює
          </h2>
          <p className="text-[rgba(243,242,238,0.55)] text-base max-w-md mx-auto">
            Знайдіть де купити весь список за найкращою ціною поруч з вами
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative bg-[#16221E] rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Photo header */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* Gradient blending photo into card background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#16221E]" />

                {/* Step number badge */}
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-[10px] text-white/70 font-medium">{step.number}</span>
                </div>
              </div>

              {/* Arrow connector (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3.5 top-[88px] z-10">
                  <div className="w-7 h-7 rounded-full bg-[#0F1A17] border border-white/8 flex items-center justify-center">
                    <span className="text-[#C6A45A] text-xs">›</span>
                  </div>
                </div>
              )}

              {/* Text content */}
              <div className="p-5 pt-3">
                <h3 className="font-heading text-lg font-medium text-[#F3F2EE] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[rgba(243,242,238,0.5)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-center"
        >
          <Link
            href="/catalog/all"
            className="inline-block px-8 py-3.5 rounded-full text-sm font-medium text-white border border-white/20 bg-white/8 hover:bg-white/15 transition-colors"
          >
            Почати формувати список →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
