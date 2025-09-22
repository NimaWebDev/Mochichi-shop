'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PanelAdminButtons from '../components/panelAdmin-Buttons'
import PanelAdminHeader from '../components/panelAdmin-header'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  first_name: string
  last_name: string
  email: string
  is_admin: boolean
  created_at: string
}

function PanelAdmin() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      // بررسی اینکه کاربر ادمین است
      const { data: userData, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single()

      if (error || !userData?.is_admin) {
        router.push('/unauthorized')
        return
      }

      setAuthLoading(false)
      fetchUsers()
    } catch (error) {
      console.error('خطا در بررسی احراز هویت:', error)
      router.push('/login')
    }
  }

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from('users').select('*')

      if (error) {
        console.error('خطا در گرفتن کاربران:', error)
      } else {
        setUsers(data as User[])
      }
    } catch (error) {
      console.error('خطا:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setDeletingId(userId)
    
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) {
        console.error('خطا در حذف کاربر:', error)
        alert('خطا در حذف کاربر')
      } else {
        setUsers(users.filter(user => user.id !== userId))
      }
    } catch (error) {
      console.error('خطا:', error)
      alert('خطا در حذف کاربر')
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="md:flex justify-center pt-20 gap-10">
        <div>
          <PanelAdminButtons />
        </div>

        <div>
          <div className='hidden md:block'>
            <PanelAdminHeader />
          </div>

          <div className="w-full max-w-6xl bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl shadow-gray-200/70 mt-8 p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-500 to-black bg-clip-text text-transparent">
                مدیریت کاربران
              </h2>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {users.length} کاربر
                </span>
              </div>
            </div>

            <div className="relative overflow-x-auto rounded-xl shadow-sm">
              <table className="w-full text-sm text-right text-gray-700">
                <thead className="text-xs uppercase bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600">
                  <tr>
                    <th scope="col" className="px-6 py-4 rounded-tl-lg">نام</th>
                    <th scope="col" className="px-6 py-4">نام خانوادگی</th>
                    <th scope="col" className="px-6 py-4">ایمیل</th>
                    <th scope="col" className="px-6 py-4">ادمین</th>
                    <th scope="col" className="px-6 py-4">تاریخ عضویت</th>
                    <th scope="col" className="px-6 py-4 rounded-tr-lg">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="bg-white border-b border-gray-200 hover:bg-gray-50/80 transition-all duration-200">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.first_name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.last_name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          {user.email}
                          <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium ${user.is_admin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.is_admin ? 'بله' : 'خیر'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {new Date(user.created_at).toLocaleDateString('fa-IR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={deletingId === user.id}
                          className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-900 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                          {deletingId === user.id ? 'در حال حذف...' : 'حذف'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && (
                <div className="bg-white rounded-b-lg p-12 text-center">
                  <h3 className="mt-4 text-lg font-medium text-gray-700">کاربری یافت نشد</h3>
                  <p className="mt-2 text-gray-500">هیچ کاربری در سیستم ثبت نشده است.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin