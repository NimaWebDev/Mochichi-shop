'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PanelAdminButtons from '../components/panelAdmin-Buttons'
import PanelAdminHeader from '../components/panelAdmin-header'


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
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*')

    if (error) {
      console.error('خطا در گرفتن کاربران:', error)
    } else {
      setUsers(data as User[])
    }
    setLoading(false)
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
        // حذف کاربر از لیست محلی
        setUsers(users.filter(user => user.id !== userId))
      }
    } catch (error) {
      console.error('خطا:', error)
      alert('خطا در حذف کاربر')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="text-center mt-10">در حال بارگذاری...</p>
  }

  return (
    <div className="md:flex justify-center mt-20 gap-10">
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
                      <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium ${user.is_admin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.is_admin ? (
                        <>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                          بله
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          خیر
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      {new Date(user.created_at).toLocaleDateString('fa-IR')}
                      <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deletingId === user.id}
                      className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-900 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      <span className="relative z-10 flex items-center">
                        {deletingId === user.id ? (
                          <>
                            <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            در حال حذف...
                          </>
                        ) : (
                          <>
                            حذف
                            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-rose-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            
          {users.length === 0 && (
            <div className="bg-white rounded-b-lg p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-700">کاربری یافت نشد</h3>
              <p className="mt-2 text-gray-500">هیچ کاربری در سیستم ثبت نشده است.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default PanelAdmin