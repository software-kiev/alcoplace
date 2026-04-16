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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-xl p-10 w-[320px] text-center shadow-2xl border border-[#E5E0D8]"
          >
            <div className="text-5xl mb-4">🍷</div>
            <h2 className="font-heading text-2xl font-semibold text-[#1C1C1C] mb-2">
              {ui.ageGate.question}
            </h2>
            <p className="text-sm text-[#6B6560] mb-6">
              Для перегляду необхідно підтвердити вік
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirm}
                className="w-full py-3 rounded-xl bg-[#1E3A2F] text-white font-medium hover:bg-[#162C23] transition-colors"
              >
                {ui.ageGate.yes}
              </button>
              <button
                onClick={handleReject}
                className="w-full py-3 rounded-xl border border-[#E5E0D8] text-[#6B6560] font-medium hover:bg-[#F0EDE6] transition-colors"
              >
                {ui.ageGate.no}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
