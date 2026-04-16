'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ui } from '@/lib/ui-strings'

export function AgeGate() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const confirmed = localStorage.getItem('alcoplace-age-confirmed')
    if (!confirmed) setShow(true)
  }, [])

  const handleConfirm = () => {
    localStorage.setItem('alcoplace-age-confirmed', 'true')
    setShow(false)
  }

  const handleReject = () => {
    window.location.href = 'https://google.com'
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#0F1A17]/60 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-[340px] overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.45)]"
          >
            {/* Dark background */}
            <div className="absolute inset-0 bg-[#0F1A17]" />

            {/* Subtle radial gold glow */}
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(198,164,90,0.18) 0%, transparent 65%)' }}
            />

            {/* Top gold accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#C6A45A] to-transparent" />

            <div className="relative z-10 px-8 pt-10 pb-8 text-center">

              {/* Icon mark */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg width="28" height="32" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 2C11 2 4.5 8.5 4.5 13.5C4.5 17.09 7.41 20 11 20C14.59 20 17.5 17.09 17.5 13.5C17.5 8.5 11 2 11 2Z"
                      fill="#C6A45A" fillOpacity="0.9"
                    />
                    <ellipse cx="8.5" cy="13" rx="1.5" ry="2" fill="white" fillOpacity="0.25" transform="rotate(-15 8.5 13)" />
                  </svg>
                </div>
              </div>

              {/* Brand */}
              <p className="font-heading text-xs tracking-[0.2em] uppercase text-[#C6A45A]/70 mb-4">
                Alcoplace
              </p>

              <h2 className="font-heading text-2xl font-semibold text-[#F3F2EE] mb-2 leading-snug">
                {ui.ageGate.question}
              </h2>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                Для перегляду необхідно<br />підтвердити вік
              </p>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirm}
                  className="w-full py-3.5 rounded-xl font-medium text-sm text-[#0F1A17] transition-colors"
                  style={{ background: 'linear-gradient(135deg, #D4AF6A, #C6A45A)' }}
                >
                  {ui.ageGate.yes}
                </motion.button>
                <button
                  onClick={handleReject}
                  className="w-full py-3.5 rounded-xl border border-white/10 text-white/40 text-sm font-medium hover:text-white/60 hover:border-white/20 transition-colors"
                >
                  {ui.ageGate.no}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
