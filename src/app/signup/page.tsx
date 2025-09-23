'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignupPage() {
  const router = useRouter()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

const handleSignup = async () => {
  try {
    const { data, error: signupError } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    })

    if (signupError) {
      setError(signupError.message)
      return
    }

    // اطمینان از وجود user
    if (!data || !data.user) {
      setError('خطا در ایجاد کاربر')
      return
    }
    
    const userId = data.user.id; // اینجا user رو جدا کردیم

    setTimeout(async () => {
      const { error: insertError } = await supabase.from('users').insert({
        id: userId,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim(),
        is_admin: false,
      }).select()

      if (insertError) {
        if (insertError.code === '23505') { 
          router.push('/login')
        } else {
          setError('خطا در ذخیره اطلاعات کاربر')
        }
      } else {
        router.push('/login')
      }
    }, 1000)

  } catch (err) {
    setError('خطای غیرمنتظره')
    console.error('Signup error:', err)
  }
}


  return (
    <div className='xs:mr-10 s:mr-15 sm:mr-40 md:mr-90 mt-5 lg:flex lg:w-[1380px] ml-auto lg:mr-auto justify-around items-center text-right'>
      <div className='md:w-[496px]'>
        <h1 className='text-[#242424] text-[24px] font-bold pr-5 mb-5'>به موچیچی خوش آمدید</h1>
        <div className='w-[288px]'>
          <h2 className='text-right text-[#C30000] text-[14px] mb-2 mt-3'>نام</h2>
          <input onChange={(e)=> setFirstName(e.target.value)} value={first_name} type="text" placeholder='نام خود را وارد کنید'  className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'/>
        </div>
        <div className='w-[288px]'>
          <h2 className='text-right text-[#C30000] text-[14px] mb-2 mt-3'>نام خانوادگی</h2>
          <input onChange={(e)=> setLastName(e.target.value)} value={last_name} type="text" placeholder='نام خانوادگی خود را وارد کنید'  className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'/>
        </div>
        <div className='w-[288px]'>
          <h2 className='text-[#C30000] text-[14px] mb-2 mt-3'>ایمیل</h2>
          <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder='مثل example@gmail.com' className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'/>
        </div>
        <div className='w-[288px]'>
          <h2 className='text-right text-[#C30000] text-[14px] mb-2 mt-3'>رمز</h2>
          <input onChange={(e)=> setPassword(e.target.value)} maxLength={15} value={password} type="password" placeholder='...'  className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'/>
        </div>
        <p className='text-[#242424] text-[10px] mt-5 pr-5'>ثبت نام و عضویت شما به منزله پذیرفتن قوانین و مقررات می باشد.</p>
        <button onClick={handleSignup} className='w-[288] h-[40] rounded-[8px] bg-[#A72F3B] text-white mt-5 cursor-pointer'>ثبت نام</button>
        {error && <p className='text-red-500 pt-3'>{error}</p>}
      </div>
      <div className='hidden lg:block'>
        <Image src="/image-login/photo.png" width={500} height={486} alt='image-login'></Image>
      </div>
    </div>
  )
}
