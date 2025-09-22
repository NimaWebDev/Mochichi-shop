import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="w-full">
      <div className='w-[347px] md:w-[1380px] bg-[#30303D] rounded-tl-[64px] rounded-tr-[64px] mx-auto mt-20 px-4 md:px-6 lg:px-8 py-10 box-border'>
        <div className='justify-center items-center text-center'>
          <Image 
            className='mx-auto pt-4 md:pt-6 lg:pt-10 w-[180px] md:[220px] lg:w-[253px]' 
            src="/logo-footer/logo-header-footer.png" 
            width={253} 
            height={76} 
            alt='logo footer'
          />
          <p className='text-[#F6F6F6] text-[12px] md:text-[14px] mt-2 md:mt-3 px-4 md:px-0'>
            لورم ایپسوم متن ساختگی برای طراحان میباشد که با استفاده از آن متن تستی مینویسند!
          </p>
        </div>
        
        <nav className='flex flex-wrap justify-center items-center text-center gap-3 md:gap-5 mt-5 text-[#E7E7E7] text-[12px] md:text-[14px]'>
          <span className='cursor-pointer transition-all hover:text-white hover:font-bold'>صفحه اصلی</span>
          <Link href="/shop">
            <span className='cursor-pointer transition-all hover:text-white hover:font-bold'>فروشگاه</span>
          </Link>
          <span className='cursor-pointer transition-all hover:text-white hover:font-bold'>مجله</span>
          <Link href="abaut_us">
            <span className='cursor-pointer transition-all hover:text-white hover:font-bold'>درباره با ما</span>
          </Link>
          <Link href="/contact-us">
            <span className='cursor-pointer transition-all hover:text-white hover:font-bold'>تماس با ما</span>
          </Link>
        </nav>
        
        <div className='w-full max-w-[1192px] h-[1px] bg-[#FFFFFF33] mt-8 md:mt-10 mx-auto'></div>
        
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start mt-8 md:mt-12 gap-8 md:gap-0'>
          <div className='md:mr-4 lg:mr-20 order-2 md:order-1'>
            <div className='flex items-center justify-center md:justify-start'>
              <Image 
                className='w-10 h-10 md:w-14 md:h-14' 
                src="/logo-footer/logo-call.png" 
                width={56} 
                height={56} 
                alt='logo'
              />
              <h2 className='text-[#E7E7E7] text-[14px] md:text-[16px] pr-2'>098-123-456</h2>
            </div>
            <div className='flex items-center justify-center md:justify-start mt-4'>
              <Image 
                className='w-10 h-10 md:w-14 md:h-14' 
                src="/logo-footer/logo-location.png" 
                width={56} 
                height={56} 
                alt='logo'
              />
              <h2 className='text-[#E7E7E7] text-[14px] md:text-[16px] pr-2'>ایران ، تهران ، خیابان فرشته</h2>
            </div>
          </div>
          
          <div className='order-1 md:order-2'>
            <Image 
              className='w-[120px] md:w-[150px] lg:w-[187px] h-auto' 
              src="/image-footer/image-enamad-footer.png" 
              width={187} 
              height={99} 
              alt='image-footer'
            />
          </div>
        </div>
      </div>
      
      <div className='w-[347px] md:w-[1380px] bg-[#FF6687] mx-auto flex flex-col sm:flex-row justify-between items-center py-3 px-4 md:px-6 lg:px-8 box-border'>
        <h3 className='text-[#FFFFFF] text-[12px] md:text-[14px] text-center sm:text-right order-2 sm:order-1 mt-2 sm:mt-0'>
          تمام حقوق این وب سایت متعلق به موچیچی میباشد
        </h3>
        <Image 
          className='w-[60px] md:w-[70px] h-auto order-1 sm:order-2' 
          src="/logo-footer/logo-last-footer.png" 
          width={70} 
          height={20} 
          alt='logo'
        />
      </div>
    </footer>
  )
}

export default Footer