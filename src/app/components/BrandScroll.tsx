'use client'

import 'swiper/css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const brands = [
  'ogilvy', 'squattypotty', 'bluehousesalmon', 'deloittedigital', 'tbwa',
  'havasmedia', 'cossette', 'prose', 'adventurereadybrands', 'soylent',
  'cycle', 'crispin'
];

const BrandScroll = () => {
  return (
    <div className="relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={8}
        loop={true}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          767: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
          992: {
            slidesPerView: 8,
            spaceBetween: 0,
          }
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
              className="h-12 w-24 flex mx-auto object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandScroll;