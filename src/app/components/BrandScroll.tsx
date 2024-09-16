'use client'

import 'swiper/css'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

const brands = [
  'ogilvy',
  'squattypotty',
  'bluehousesalmon',
  'deloittedigital',
  'tbwa',
  'havasmedia',
  'cossette',
  'prose',
  'adventurereadybrands',
  'soylent',
  'cycle',
  'crispin',
]

interface BrandScrollProps {
  className?: string
}

const BrandScroll: React.FC<BrandScrollProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_128px,black_calc(100%-128px),transparent)] ${className}`}
    >
      <Swiper
        modules={[Autoplay]}
        loop
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 5, spaceBetween: 20 },
          1024: { slidesPerView: 7, spaceBetween: 30 },
        }}
        className="trusted-by-swiper"
      >
        {[...brands, ...brands].map((brand, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <Image
              src={`/brands/${brand}.svg`}
              alt={brand}
              width={100}
              height={50}
              priority
              className="h-12 w-24 mx-auto object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BrandScroll
