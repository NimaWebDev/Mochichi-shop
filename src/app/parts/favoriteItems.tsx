'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GetapiCategory , categoryINT } from '../api/getapi-category';
import { GetapiFavoriteProducts , favoriteProductsINT } from '../api/getapi-favorite-products';

function FavoriteItems() {

    const [categories, setCategories] = useState<categoryINT[]>([])
    const [favoriteProducts , setFavoriteProducts] = useState<favoriteProductsINT[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetch = async () => {
        const data = await GetapiCategory()
        setCategories(data)
    }
        fetch()        
    }, [])

        const handleClick = (slug: string) => {
        router.push(`/category/${slug}`)
    }
    useEffect(()=>{
        const fetch = async ()=>{
            const data = await GetapiFavoriteProducts()
            setFavoriteProducts(data)
        }
        fetch()
    }, [])

    useEffect(() => {
    if (window.innerWidth > 768) {
      AOS.init({ duration: 1000 });
    } else {
      AOS.init({ disable: true });
    }
  }, []);

    function formatNumberToPersian(num: number): string {
        return num
        .toLocaleString('fa-IR')
    }

  return (
    <div className='mt-200 lg:mt-120 justify-center items-center text-center'>
        <div className='flex justify-center items-center text-center gap-2 '>
            <Image src="/logo-favorite-products/logo-right-favorite-products.png" width={20} height={20} alt='logo'></Image>
            <h1 className='text-[24px] text-[#2D2728] font-semibold'>محبوب ترین محصولات</h1>
            <Image src="/logo-favorite-products/logo-left-favorite-products.png" width={20} height={20} alt='logo'></Image>
        </div>
        <nav className='hidden lg:block bg-[#FFF0F7] w-[1003px] h-[44px] rounded-[49px] ml-auto mr-auto mt-10'>
            <div className='flex justify-center items-center text-center gap-3'>
                {categories.map((item)=>(
                    <div className='w-[130px] h-[34px] rounded-[43px] mt-1.5 cursor-pointer transition-all hover:bg-[#FF6687]' key={item.id} onClick={() => handleClick(item.slug)}>
                        <h2 className='text-[14px] text-[#A89C9F] p-1 hover:text-white'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </nav>
        <div className='grid grid-cols-2 xs:mr-3 s:mr-8 md:grid-cols-3 gap-2 lg:flex justify-center items-center lg:gap-10 mt-10'>
            {favoriteProducts.map((product)=>(
                <Link href='/shop' key={product.id}>
                    <div data-aos="fade-down" className='bg-[#FFF8FD] w-[169px] h-[226px] sm:w-[239px] sm:h-[320px] rounded-[16px]'>
                        <Image className='w-[156px] h-[140px] sm:w-[220px] sm:h-[223px] mt-2' src={product.image} width={220} height={223} alt='image'></Image>
                        <h2 className='text-right p-2 text-[#2D2728] text-[14px]'>{product.name}</h2>
                        <div className='flex justify-between'>
                            <div className='pr-2 pt-2 cursor-pointer'>
                                <Image src="/logo-favorite-products/logo-shop.png" width={28} height={28} alt='logo'></Image>
                            </div>
                            <div className='pl-5'>
                                <h2 className='text-[14px]'>ت {formatNumberToPersian(product.offPrice)}</h2>
                                <h2 className='text-[14px] text-[#DFDFDF] line-through'>ت {formatNumberToPersian(product.orgPrice)}</h2>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        <div className='flex-wrap xs:mr-3 s:mr-8 md:mr-0 md:flex justify-center items-center gap-17 mt-20'>
            <Image data-aos="fade-left" className='w-[342px] h-[166px] md:w-[642px] md:h-[166px]' src="/image-favorite-products/image-favorite-products-1.png" width={642} height={166} alt='image'></Image>
            <Image data-aos="fade-right" className='w-[342px] h-[166px] mt-5 md:mt-0 md:w-[642px] md:h-[166px]' src="/image-favorite-products/image-favorite-products-2.png" width={642} height={166} alt='image'></Image>
        </div>
    </div>
  )
}

export default FavoriteItems