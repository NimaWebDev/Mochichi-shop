"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GetapiOffProducts, OffProductsINT } from '../api/getapi-off-products'
import Timer from '../components/timer'
import Image from 'next/image'
import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'


function OffProducts() {
  const [offProducts, setOffProducts] = useState<OffProductsINT[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      const data = await GetapiOffProducts()
      setOffProducts(data)
    }
    fetch()
  }, [])

  function formatNumberToPersian(num: number): string {
    return num.toLocaleString('fa-IR')
  }

  return (
    <div className="relative mt-40">
      <div className="absolute flex">
        <div className="flex gap-5 mr-10 lg:mr-195">
          <Image src="/logo-off-products/logo-off-products-1.png" width={20} height={20} alt="logo" />
          <h2 className="text-[18px] lg:text-[24px] font-semibold">جشنواره پر تخفیف موچیچی</h2>
          <Image src="/logo-off-products/logo-off-products-2.png" width={20} height={20} alt="logo" />
        </div>
      </div>

      <Image
        className="hidden md:block ml-auto mr-auto"
        src="/image-off-products/image-off-products.png"
        width={1380}
        height={497}
        alt="image"
      />
      <Image
        className="pt-15 md:hidden ml-auto mr-auto"
        src="/image-off-products/image-off-product-responsive.png"
        width={342}
        height={549}
        alt="image"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <Timer />
        <div className="hidden lg:flex justify-center items-center gap-10 mt-10">
          {offProducts.map((product) => (
            <Link href="/shop" key={product.id}>
              <div className="bg-[#FFF8FD] w-[200px] h-[320px] rounded-[16px]">
                <Image className="mt-2 mr-1" src={product.image} width={190} height={223} alt="image" />
                <h2 className="text-right p-2 text-[#2D2728] text-[14px]">{product.name}</h2>
                <div className="flex justify-between">
                  <div className="pr-2 pt-2 cursor-pointer">
                    <Image src="/logo-favorite-products/logo-shop.png" width={28} height={28} alt="logo" />
                  </div>
                  <div className="pl-5">
                    <h2 className="text-[14px]">ت {formatNumberToPersian(product.offPrice)}</h2>
                    <h2 className="text-[14px] text-[#DFDFDF] line-through">
                      ت {formatNumberToPersian(product.orgPrice)}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="block ml-auto mr-auto lg:hidden mt-10 relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            navigation
          >
            {offProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Link href="/shop">
                  <div className="bg-[#FFF8FD] w-[239px] h-[320px] rounded-[16px] mx-auto">
                    <Image className="ml-auto mr-auto" src={product.image} width={220} height={223} alt="image" />
                    <h2 className="text-right p-2 text-[#2D2728] text-[14px]">{product.name}</h2>
                    <div className="flex justify-between">
                      <div className="pr-2 pt-2 cursor-pointer">
                        <Image src="/logo-favorite-products/logo-shop.png" width={28} height={28} alt="logo" />
                      </div>
                      <div className="pl-5">
                        <h2 className="text-[14px]">ت {formatNumberToPersian(product.offPrice)}</h2>
                        <h2 className="text-[14px] text-[#DFDFDF] line-through">
                          ت {formatNumberToPersian(product.orgPrice)}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default OffProducts
