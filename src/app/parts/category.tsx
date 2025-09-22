'use client';

import React from 'react'
import Image from 'next/image';

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GetapiCategory , categoryINT } from '../api/getapi-category';
import AOS from "aos";
import "aos/dist/aos.css";

function Category() {

    const [categories, setCategories] = useState<categoryINT[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetch = async () => {
        const data = await GetapiCategory()
        setCategories(data)
    }
        fetch()        
    }, [])

    const handleClick = (slug: string) => {
    router.push(`/shop`)
    }
    
    useEffect(() => {
    if (window.innerWidth > 768) {
      AOS.init({ duration: 1000 });
    } else {
      AOS.init({ disable: true });
    }
    }, []);

  return (
    <div className='relative'>
        <Image className='hidden md:block ml-auto mr-auto' src="/image-category/image-category.png" width={1380} height={497} alt='image'></Image>
        <Image className='md:hidden ml-auto mr-auto' src="/image-category/image-category-responsive.png" width={342} height={874} alt='image'></Image>
        <div className='absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='flex justify-center items-center mb-5 md:mb-20'>
            <Image src="/logo-category/logo-right-category.png" width={37} height={14} alt='logo' ></Image>
            <h1 className='text-[18px] md:text-[24px] text-white font-semibold'>دسته بندی محصولات</h1>
            <Image src="/logo-category/logo-left-category.png" width={37} height={14} alt='logo' ></Image>
        </div>
        <div className='w-[342px] lg:w-[1400px] mr-15 gap-y-5 grid grid-cols-2 md:flex justify-center items-center md:gap-10'>
            {categories.map((item)=>(
                <div data-aos="fade-down" className='bg-white w-[113px] h-[138px] md:w-[137px] md:h-[161px] rounded-[20px] justify-center items-center text-center cursor-pointer transition-all md:hover:w-[148px] hover:h-[170px] hover:mb-5' key={item.id} onClick={() => handleClick(item.slug)}>
                    <Image className='bg-[#FFF0F7] rounded-[20px] w-[86px] h-[78px] md:w-[100px] md:h-[91px] ml-auto mr-auto mt-5' src={item.logo} width={76} height={76} alt='logo'></Image>
                    <h2 className='text-[14px] text-[#2D2728] pt-3 font-medium'>{item.name}</h2>
                </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default Category;