'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('حسابی با این نام وجود ندارم لطفا ثبت نام کنید')
    } else if (email === "nimatajik39@gmail.com" && password === "nima1234"){
      router.push('/panelAdmin')
    } else{
      router.push('dashboard')
    }
  }

  return (
    <div className='xs:mr-10 s:mr-15 sm:mr-40 md:mr-90 mt-5 lg:flex lg:w-[1380px] ml-auto lg:mr-auto justify-around items-center text-right'>
      <div className='sm:w-[496px]'>
        <h1 className='text-[#242424] text-[24px] font-bold pr-5 mb-5'>به موچیچی خوش آمدید</h1>
        <Link href="/signup">
          <span className='text-[#434343] text-[18px] font-bold cursor-pointer pr-5'>ورود | ثبت نام</span>
        </Link>
        <div className='w-[288px] mt-10'>
          <h2 className='text-[#C30000] text-[14px] mb-2'>ایمیل</h2>
          <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder='مثل example@gmail.com' className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'/>
        </div>
        <div className='w-[288px]'>
          <h2 className='text-right text-[#C30000] text-[14px] mb-2 mt-3'>رمز</h2>
          <input onChange={(e)=> setPassword(e.target.value)} maxLength={8} value={password} type="password" placeholder='...'  className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'/>
        </div>
        <p className='text-[#242424] text-[10px] mt-5 pr-5'>ورود و عضویت شما به منزله پذیرفتن قوانین و مقررات می باشد.</p>
        <button onClick={handleLogin} className='w-[288] h-[40] rounded-[8px] bg-[#A72F3B] text-white mt-5 cursor-pointer'>ورود</button>
        {error && <p className='text-red-500 pt-3'>{error}</p>}
      </div>
      <div className='hidden lg:block'>
        <Image src="/image-login/photo.png" width={500} height={486} alt='image-login'></Image>
      </div>
    </div>
  )
}