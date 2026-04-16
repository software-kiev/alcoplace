'use client'

import { motion } from 'motion/react'
import { ui } from '@/lib/ui-strings'

export function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-heading text-2xl sm:text-3xl font-medium text-[#1C1C1C] text-center mb-10"
      >
        {ui.trust.heading}
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ui.trust.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center p-6 rounded-2xl bg-white border border-[#E5E0D8]"
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <div className="font-heading text-2xl sm:text-3xl font-medium text-[#1E3A2F] mb-1">
              {item.value}
            </div>
            <div className="text-sm text-[#9E9890]">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
