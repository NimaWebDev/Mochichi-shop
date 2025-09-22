'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import Image from 'next/image'

export default function LoginBTN() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }

    checkUser()
  }, [])

  if (isLoggedIn === null) {
    return null
  }

  const handleLoginClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <div onClick={handleLoginClick} className='cursor-pointer'>
        <Image src="/logo-nav/logo-login.png" width={44} height={44} alt="logo" />
    </div>
  )
}
