'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { banners } from '@/mock/banners'

export function PromoCarousel() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Link href={banner.href} className="block">
                <div className="relative h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 95vw, (max-width: 1280px) 90vw, 1200px"
                  />
                  {/* Dark gradient overlay from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A17]/80 via-[#0F1A17]/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 md:px-12 pb-6 sm:pb-8">
                    <h3 className="text-white font-heading text-2xl sm:text-3xl font-semibold mb-2">
                      {banner.title}
                    </h3>
                    <p className="text-[#F3F2EE]/70 text-sm sm:text-base mb-4 max-w-md">
                      {banner.subtitle}
                    </p>
                    <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-full text-sm font-medium w-fit hover:bg-white/25 transition-colors">
                      {banner.cta}
                    </span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 w-10 h-10 bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-black/60 hover:text-white hover:border-white/30 disabled:opacity-0" />
        <CarouselNext className="right-4 w-10 h-10 bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-black/60 hover:text-white hover:border-white/30 disabled:opacity-0" />
      </Carousel>
    </section>
  )
}
