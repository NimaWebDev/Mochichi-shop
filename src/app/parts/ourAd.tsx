"use client"
import React from 'react'
import Image from 'next/image'

function Ad({ hideBanner = false }: { hideBanner?: boolean }) {
  return (
    <div>
        <div  className='mr-10 mt-20 lg:mr-90'>
            <div className='lg:flex'>
                <Image src="/logo-off-products/Frame 1261157127.png" width={96} height={74} alt='logo'></Image>
                <h2 className='pt-5 text-[#2D2728] text-[24px] font-semibold'>خیالت از <span className='text-[#FF6687]'>موچیچی</span> راحت باشه چون ...</h2>
            </div>
            <div className='grid grid-cols-1 gap-10 lg:flex justify-center items-center lg:gap-50 ml-50 mt-10'>
                <div data-aos="fade-down" className='w-[310px] h-[165px]'>
                    <Image src="/logo-ads/wallet-check.png" width={35} height={35} alt='logo'></Image>
                    <h2 className='text-[#121111] text-[16px] font-semibold pt-5'>پرداخت امن با درگاه امن</h2>
                    <p className='text-[#929292] xs:w-[280px] text-[13px] leading-5	pt-5'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله است</p>
                </div>
                <div data-aos="fade-down" className='w-[310px] h-[165px]'>
                    <Image src="/logo-ads/grammerly.png" width={35} height={35} alt='logo'></Image>
                    <h2 className='text-[#121111] text-[16px] font-semibold pt-5'>رضایت بیش از ۱ میلیون مشتری</h2>
                    <p className='text-[#929292] xs:w-[280px] text-[13px] leading-5	pt-5'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله است</p>
                </div>
                <div data-aos="fade-down" className='w-[280px] h-[165px]'> 
                    <Image src="/logo-ads/24-support.png" width={35} height={35} alt='logo'></Image>
                    <h2 className='text-[#121111] text-[16px] font-semibold pt-5'>پشتیبانی ۲۴ ساعته</h2>
                    <p className='text-[#929292] xs:w-[280px] text-[13px] leading-5	pt-5'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله است</p>
                </div>
            </div>
        </div>
        {!hideBanner && (
          <Image
            className='hidden lg:block mt-20 cursor-pointer mr-auto ml-auto'
            src="/logo-ads/Frame 1261157128IMG.png"
            onClick={() => window.open('https://www.instagram.com/username', '_blank')}
            width={1380}
            height={92}
            alt='image'
          />
        )}
        {!hideBanner && (
          <Image
            className='lg:hidden mt-20 cursor-pointer mr-auto ml-auto'
            src="/logo-ads/image-responsive-ads.png"
            onClick={() => window.open('https://www.instagram.com/username', '_blank')}
            width={1380}
            height={92}
            alt='image'
          />
        )}
    </div>
  )
}

export default Ad