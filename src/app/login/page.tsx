'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true) // حالت جدید

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // کاربر قبلاً لاگین کرده، برو به صفحه مناسب
        await redirectBasedOnRole(session.user.id)
      } else {
        // کاربر لاگین نکرده، صفحه لاگین رو نشان بده
        setCheckingSession(false)
      }
    } catch (error) {
      console.error('خطا در بررسی session:', error)
      setCheckingSession(false)
    }
  }

  const redirectBasedOnRole = async (userId: string) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId)
        .single()

      if (!userError && userData) {
        if (userData.is_admin) {
          router.push('/panelAdmin')
        } else {
          router.push('/dashboard')
        }
      } else {
        // اگر کاربر در جدول users نبود
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('خطا در بررسی نقش:', error)
      router.push('/dashboard')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (error) {
        setError('ایمیل یا رمز عبور اشتباه است')
        return
      }

      // پس از لاگین موفق
      await redirectBasedOnRole(data.user.id)

    } catch (error) {
      setError('خطا در ورود به سیستم')
    } finally {
      setLoading(false)
    }
  }

  // اگر در حال بررسی session هستیم، لودینگ نشان بده
  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بررسی...</p>
        </div>
      </div>
    )
  }

  // صفحه اصلی لاگین
  return (
    <div className='xs:mr-10 s:mr-15 sm:mr-40 md:mr-90 mt-5 lg:flex lg:w-[1380px] ml-auto lg:mr-auto justify-around items-center text-right'>
      <div className='sm:w-[496px]'>
        <h1 className='text-[#242424] text-[24px] font-bold pr-5 mb-5'>به موچیچی خوش آمدید</h1>
        <Link href="/signup">
          <span className='text-[#434343] text-[18px] font-bold cursor-pointer pr-5'>ورود | ثبت نام</span>
        </Link>
        
        <form onSubmit={handleLogin}>
          <div className='w-[288px] mt-10'>
            <h2 className='text-[#C30000] text-[14px] mb-2'>ایمیل</h2>
            <input 
              onChange={(e)=> setEmail(e.target.value)} 
              value={email} 
              type="email" 
              placeholder='example@gmail.com' 
              className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'
              required
            />
          </div>
          <div className='w-[288px]'>
            <h2 className='text-right text-[#C30000] text-[14px] mb-2 mt-3'>رمز عبور</h2>
            <input 
              onChange={(e)=> setPassword(e.target.value)} 
              value={password} 
              type="password" 
              placeholder='رمز خود را وارد کنید'  
              className='w-[288px] h-[40px] rounded-[8px] border border-[#C30000] pr-3 text-[12px]'
              required
              maxLength={15}
            />
          </div>
          <p className='text-[#242424] text-[10px] mt-5 pr-5'>ورود و عضویت شما به منزله پذیرفتن قوانین و مقررات می باشد.</p>
          <button 
            type="submit" 
            disabled={loading}
            className='w-[288px] h-[40px] rounded-[8px] bg-[#A72F3B] text-white mt-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
        
        {error && <p className='text-red-500 pt-3'>{error}</p>}
      </div>
      <div className='hidden lg:block'>
        <Image src="/image-login/photo.png" width={500} height={486} alt='image-login' />
      </div>
    </div>
  )
}