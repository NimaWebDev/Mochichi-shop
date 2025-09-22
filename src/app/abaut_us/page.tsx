'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Ad from '../parts/ourAd'
import AOS from "aos";
import "aos/dist/aos.css";

function AbautUs() {

    useEffect(() => {
    if (window.innerWidth > 768) {
      AOS.init({ duration: 1000 });
    } else {
      AOS.init({ disable: true });
    }
  }, []);


  return (
    <div>
      <h1 className='text-center mt-10 text-[20px] md:text-[32px] text-[#EC6880] font-semibold'>موچیچی <span className='text-black'> جایی برای رنگ و شادی در هر لحظه‌ی زندگی</span></h1>
      <div className='xs:mr-3 s:mr-10 md:mr-0 md:flex justify-center items-center gap-10 mt-10'>
        <div data-aos="fade-left" className='flex'>
          <div>
            <Image className='hidden md:block ml-10 mt-20' src="/image-abaut-us/image-abaut-us-1.png" width={195} height={190} alt='image'></Image>
          </div>
          <div className='flex gap-2 md:gap-0 md:block'>
            <Image className='mb-10 w-[127px] h-[128px] md:w-[195px] md:h-[127px]' src="/image-abaut-us/image-abaut-us-2.png" width={195} height={127} alt='image'></Image>
            <Image src="/image-abaut-us/image-abaut-us-3.png" className='w-[197px] h-[128px] md:w-[195px] md:h-[190px]' width={195} height={190} alt='image'></Image>
          </div>
        </div>
        <div data-aos="zoom-in-down">
          <Image src="/image-abaut-us/Frame 1261157340.png" className='hidden md:block' width={212} height={474} alt='image'></Image>
          <Image src="/image-abaut-us/Frame 1261157345-responsive.png" className='md:hidden' width={346} height={187} alt='image'></Image>
        </div>
        <div data-aos="fade-right" className='flex'>
          <div className='flex gap-2 md:gap-0 md:block'>
            <Image className='mb-10 w-[197px] h-[128px] md:w-[195px] md:h-[127px]' src="/image-abaut-us/image-abaut-us-4.png" width={195} height={127} alt='image'></Image>
            <Image src="/image-abaut-us/image-abaut-us-5.png" className='w-[127px] h-[128px] md:w-[195px] md:h-[190px]' width={195} height={190} alt='image'></Image>
          </div>
          <div>
            <Image className='hidden md:block mr-10 mt-20' src="/image-abaut-us/image-abaut-us-6.png" width={195} height={190} alt='image'></Image>
          </div>
        </div>
      </div>
      <div>
        <Ad hideBanner={true}/>
        <div className='w-[342px] md:w-[1227px] ml-auto mr-auto mt-20'>
          <div className='mt-10'>
            <div className='flex gap-3'>
              <Image src="/image-abaut-us/logo-abaut-us-1.png" width={32} height={32} alt='logo'></Image>
              <h2 className='text-[#100E0C] text-[24px] font-semibold'>ماموریت ما</h2>
            </div>
            <p className='text-[#100E0C] text-[14px] md:text-[18px] font-normal leading-[40px]'>هدف موچی‌چی ایجاد دنیایی شاد و رنگارنگ است. این فروشگاه با ارائه محصولات فانتزی و خاص، سعی در زیباسازی زندگی روزمره مشتریان دارد. موچی‌چی به دنبال ایجاد تجربه‌ای متفاوت است که بتواند لحظاتی شاد و خلاقانه برای مشتریان خود به ارمغان بیاورد.</p>
          </div>
          <div className='mt-10'>
            <div className='flex gap-3'>
              <Image src="/image-abaut-us/logo-abaut-us-2.png" width={32} height={32} alt='logo'></Image>
              <h2 className='text-[#100E0C] text-[24px] font-semibold'>چشم انداز ما</h2>
            </div>
            <p className='text-[#100E0C] text-[14px] md:text-[18px] font-normal leading-[40px]'>تبدیل شدن به برندی الهام‌بخش در ایران و منطقه که با محصولات فانتزی و منحصربه‌فرد خود، لحظات شادی و خلاقیت را به زندگی مشتریان وارد می‌کند و دنیایی رنگارنگ را در خانه و محل کار افراد ایجاد می‌کند</p>
          </div>
        </div>
      </div>
      <Image className='mt-20 cursor-pointer mr-auto ml-auto'src="/logo-ads/Frame 1261157128IMG.png" onClick={() => window.open('https://www.instagram.com/username', '_blank')} width={1380} height={92} alt='image'/>
    </div>
  )
}

export default AbautUs