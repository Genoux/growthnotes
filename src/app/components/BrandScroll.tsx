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

interface BrandScrollProps {
  slidesPerView?: number;
  className?: string;
}

const BrandScroll: React.FC<BrandScrollProps> = ({ slidesPerView = 8, className = '' }) => {
  return (
    <div className={`relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] ${className}`}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={slidesPerView}
        loop={true}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: Math.min(3, slidesPerView),
            spaceBetween: 10,
          },
          480: {
            slidesPerView: Math.min(4, slidesPerView),
            spaceBetween: 15,
          },
          767: {
            slidesPerView: Math.min(6, slidesPerView),
            spaceBetween: 0,
          },
          992: {
            slidesPerView: slidesPerView,
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