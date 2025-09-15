'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      image: "/logo-detail-products/logo-poshtibani.png",
      title: "پشتیبانی آنلاین"
    },
    {
      id: 2,
      image: "/logo-detail-products/logo-tazmin.png",
      title: "تضمین کیفیت"
    },
    {
      id: 3,
      image: "/logo-detail-products/logo-ersal.png",
      title: "ارسال سریع"
    },
    {
      id: 4,
      image: "/logo-detail-products/logo-takhfif.png",
      title: "تخفیف خرید بالای 4 محصول"
    }
  ];

  return (
    <>
      {/* Desktop Version - Hidden on Mobile */}
      <div className='hidden md:flex bg-[#30303D] w-full max-w-[1336px] h-[96px] rounded-[160px] mt-20 gap-4 md:gap-10 lg:gap-20 justify-center items-center text-center text-white text-[16px] mx-auto'>
        {features.map((feature) => (
          <div key={feature.id} className='flex items-center justify-center'>
            <Image 
              src={feature.image} 
              width={56} 
              height={56} 
              alt={feature.title}
              className="flex-shrink-0"
            />
            <p className='pr-2 pt-1'>{feature.title}</p>
          </div>
        ))}
      </div>

      {/* Mobile Version - Hidden on Desktop */}
      <div className='md:hidden w-full mt-20 px-4 mx-auto'>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.id}>
              <div className='mt-20 lg:mt-0 bg-[#30303D] w-full h-[96px] rounded-[160px] flex gap-4 justify-center items-center text-center text-white text-[16px]'>
                <Image 
                  src={feature.image} 
                  width={56} 
                  height={56} 
                  alt={feature.title}
                  className="flex-shrink-0"
                />
                <p className='pr-2 pt-1'>{feature.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default FeaturesSection;