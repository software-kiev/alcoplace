'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F3EFE7] group"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
      >
        {/* Warm radial spotlight behind bottle */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 55%, rgba(198,164,90,0.12), transparent 65%)',
          }}
        />
        <Image
          src={images[selected]}
          alt={name}
          fill
          className="object-contain p-8 relative z-10 transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors bg-[#F0EDE6] ${
                i === selected ? 'border-[#C6A45A]' : 'border-[#E5E0D8]'
              }`}
            >
              <Image src={img} alt="" fill className="object-contain p-1" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
