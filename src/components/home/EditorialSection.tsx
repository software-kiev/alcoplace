'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const editorialCards = [
  {
    id: 1,
    title: 'Як обрати ідеальне вино до вечері',
    description: 'Практичний гід з підбору вина до різних страв — від стейку до десерту.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    tag: 'Гід',
  },
  {
    id: 2,
    title: 'Топ-10 віскі для початківців',
    description: 'Перелік доступних та якісних віскі, які варто спробувати першими.',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80',
    tag: 'Рейтинг',
  },
  {
    id: 3,
    title: 'Крафтове пиво: тренди 2025',
    description: 'Огляд найцікавіших стилів та пивоварень України цього року.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80',
    tag: 'Тренди',
  },
]

export function EditorialSection() {
  return (
    <section className="bg-[#0F1A17] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[#F3F2EE] mb-10">
          Редакція Alcoplace
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorialCards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
              className="group cursor-pointer"
            >
              <div className="rounded-xl overflow-hidden bg-[#16221E] border border-white/[0.08] hover:border-[#C6A45A]/30 transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16221E] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#C6A45A] bg-[#C6A45A]/10 px-2 py-1 rounded font-medium">
                      {card.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-medium text-[#F3F2EE] mb-2 group-hover:text-[#C6A45A] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#F3F2EE]/60 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
