'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export interface UserInfo {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at?: string | null
  last_sign_in_at?: string | null
}

export interface AuthInfo {
  email: string | null
  created_at?: string | null
  last_sign_in_at?: string | null
}

export default function UserProfile() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          throw new Error('User not authenticated')
        }

        setAuthInfo({
          email: user.email ?? null,
          created_at: user.created_at ?? null,
          last_sign_in_at: user.last_sign_in_at ?? null,
        })

        const { data, error } = await supabase
          .from('users')
          .select('id, first_name, last_name')
          .eq('id', user.id)
          .single()

        if (error || !data) throw error || new Error('User data not found')

        setUserInfo({
          ...data,
          email: user.email ?? '', 
        })
      } catch (error) {
        console.error('Error fetching user data:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) return <div>در حال بارگذاری...</div>

  return (
    <div className='xs:w-[300px] xs:mr-5 s:w-[392px] h-[700px] shadow-lg rounded-2xl bg-white mt-20 justify-center items-center text-center'>
      <div>
        <Image
          className='ml-auto mr-auto mt-10'
          src="/image-dashboard/icons8-profile-picture-50.png"
          width={144}
          height={144}
          alt='image-user'
        />
      </div>
      {userInfo ? (
        <div key={userInfo.id}>
          <p>{userInfo.first_name} {userInfo.last_name}</p>
          <span>{userInfo.email}</span>
        </div>
      ) : (
        <p>کاربر پیدا نشد !</p>
      )}
      <div>
        <div className='flex gap-3 w-[322px] h-[60px] rounded-2xl border-b border-b-[#EDEDED] mb-5 mt-10 justify-center items-center text-center ml-auto mr-auto'>
          <Image src="/image-dashboard/icons8-dashboard.png" width={24} height={24} alt='logo-dashboard' />
          <span>داشبورد</span>
        </div>
        <Link href="/cart">
          <div className='flex gap-3 w-[322px] h-[60px] rounded-2xl border-b border-b-[#EDEDED] mb-5 justify-center items-center text-center cursor-pointer ml-auto mr-auto transition-all hover:font-bold'>
            <Image src="/image-dashboard/icons8-cart.png" width={24} height={24} alt='logo-dashboard' />
            <span>خرید ها</span>
          </div>
        </Link>
        <Link href="/gallary">
          <div className='flex gap-3 w-[322px] h-[60px] rounded-2xl border-b border-b-[#EDEDED] mb-5 justify-center items-center text-center cursor-pointer ml-auto mr-auto transition-all hover:font-bold'>
            <Image src="/image-dashboard/icons8-gallery.png" width={24} height={24} alt='logo-dashboard' />
            <span>گالری</span>
          </div>
        </Link>
        <Link href="/dashboard/userSettings">
          <div className='flex gap-3 w-[322px] h-[60px] rounded-2xl border-b border-b-[#EDEDED] mb-5 justify-center items-center text-center cursor-pointer ml-auto mr-auto transition-all hover:font-bold'>
            <Image src="/image-dashboard/icons8-settings.png" width={24} height={24} alt='logo-dashboard' />
            <span>تنظیمات</span>
          </div>
        </Link>
        <div
          onClick={handleLogout}
          className='flex gap-3 w-[322px] h-[60px] rounded-2xl border-b border-b-[#EDEDED] mb-5 justify-center items-center text-center cursor-pointer ml-auto mr-auto transition-all hover:bg-red-500 hover:text-white'
        >
          <Image src="/image-dashboard/icons8-log-out.png" width={24} height={24} alt='logo-dashboard' />
          <span>خروج از حساب</span>
        </div>
      </div>
    </div>
  )
}

