"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import LoginBTN from '../components/login-btn'

function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <div>
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setOpen(false)}
        ></div>
        <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold">منوی موچیچی شاپ</h2>
            <button 
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-2xl"
            >
              &times;
            </button>
          </div>
          
          <div className="p-5 overflow-y-auto h-full pb-20">
            <div className="flex flex-col space-y-6 mt-5 mr-2">
              <Link href="/" className="text-lg py-2 border-b border-gray-100" onClick={() => setOpen(false)}>
                صفحه اصلی
              </Link>
              
              <Link href="/abaut_us" className="text-lg py-2 border-b border-gray-100" onClick={() => setOpen(false)}>
                درباره ما
              </Link>
              
              <Link href="/gallary" className="text-lg py-2 border-b border-gray-100" onClick={() => setOpen(false)}>
                گالری
              </Link>
              
              <div className="text-lg py-2 border-b border-gray-100">
                کیف و کوله
              </div>
              
              <div className="text-lg py-2 border-b border-gray-100">
                چراغ خواب
              </div>

              <div className="text-lg py-2 border-b border-gray-100">
                اکسسوری خاص
              </div>
              
              <Link href="/contact-us" className="text-lg py-2 border-b border-gray-100 flex items-center" onClick={() => setOpen(false)}>
                ارتباط با مجموعه
              </Link>
              
              <div className="pt-4 flex text-center gap-2">
                <LoginBTN />
                <p className='text-lg pt-1.5'>ثبت نام</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className='hidden md:flex justify-around mt-5'>
        <div className='flex justify-center gap-5'>
          <h1 className='font-bold mt-2'>
            موچیچی <span className='text-[#FF6687]'>شاپ</span>
          </h1>
          <div className='flex w-[476px] h-[44px] bg-[#F6F6F6] rounded-[43px]'>
            <input
              className='pr-5 w-[440px] h-[44px] rounded-xl bg-[#F6F6F6] focus:outline-none'
              type="text"
              placeholder='جستجو در فروشگاه ...'
            />
            <Image
              className='w-[22px] h-[22px] mt-3 cursor-pointer'
              src="/logo-nav/search.png"
              width={22}
              height={22}
              alt='search'
            />
          </div>
        </div>
        <div className='flex gap-5'>
          <div className='flex w-[150px] h-[44px] bg-[#FFF0F7] rounded-[43px] justify-center items-center'>
            <Link className='flex' href="/cart">
              <Image className='ml-5' src="/logo-nav/shopping-cart-logo.png" width={20} height={20} alt='cart' />
              <h2>سبد خرید</h2>
            </Link>
          </div>
        </div>
      </header>
      <div className='hidden md:flex w-[1380px] h-[60px] bg-[#30303D] ml-auto mr-auto rounded-[66px] mt-5'>
        <div className='flex pt-4 pr-5 gap-3'>
          <Link href="/">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>صفحه اصلی</h3>
          </Link>
          <p className='pt-1 text-[#ACACB1]'>*</p>
          <Link href="/abaut_us">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>درباره ما</h3>
          </Link>
          <p className='pt-1 text-[#ACACB1]'>*</p>
          <Link href="/gallary">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>گالری</h3>
          </Link>
          <p className='pt-1 text-[#ACACB1]'>*</p>
          <Link href="/shop">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>کیف و کوله</h3>
          </Link>
          <p className='pt-1 text-[#ACACB1]'>*</p>
          <Link href="/shop">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>چراغ خواب</h3>
          </Link>
          <p className='pt-1 text-[#ACACB1]'>*</p>
          <Link href="/shop">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>لوازم آرایشی</h3>
          </Link>
          <p className='pt-1 text-[#ACACB1]'>*</p>
          <Link href="/shop">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>لوازم جانبی</h3>
          </Link>
          <p className='pt-1 text-[#ACACB1]'>*</p>
          <Link href="/shop">
            <h3 className='text-[14px] text-[#ACACB1] hover:text-white cursor-pointer'>اکسسوری خاص</h3>
          </Link>
        </div>
        <div className='w-[167px] h-[40px] bg-[#434355] rounded-[35px] mr-110 mt-2.5 '>
          <Link className='flex justify-center items-center mt-2' href="/contact-us">
            <Image src="/logo-nav/headphone.png" width={20} height={20} alt='logo'></Image>
            <h2 className='text-white text-[14px] mr-2'>ارتباط با مجموعه</h2>
          </Link>
        </div>
      </div>

      <header className='md:hidden flex flex-col items-center mt-5'>
        <div className='flex justify-between items-center w-full px-5'>
          <button
            onClick={() => setOpen(true)}
            className='w-[44px] h-[44px] bg-[#FF6687] rounded-full flex justify-center items-center cursor-pointer'
          >
            <Image src="/logo-nav/logo-responsive-menu.png" width={48} height={48} alt='menu' />
          </button>
          <h1 className='font-bold text-lg'>
            موچیچی <span className='text-[#FF6687]'>شاپ</span>
          </h1>
          <Link href="/cart">
            <div className='w-[44px] h-[44px] bg-[#FF6687] rounded-full flex justify-center items-center'>
              <Image src="/logo-nav/logo-responsive-shop.png" width={48} height={48} alt='cart' />
            </div>
          </Link>

        </div>
        <div className='flex w-[90%] h-[44px] bg-[#F6F6F6] rounded-[43px] mt-4'>
          <input
            className='pr-5 w-full h-[44px] rounded-xl bg-[#F6F6F6] focus:outline-none'
            type="text"
            placeholder='جستجو در فروشگاه ...'
          />
          <Image
            className='w-[22px] h-[22px] mt-3 ml-2 cursor-pointer'
            src="/logo-nav/search.png"
            width={22}
            height={22}
            alt='search'
          />
        </div>
      </header>
    </div>
  )
}

export default Navbar