"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabase"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function Settings() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authInfo, setAuthInfo] = useState<any>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) throw new Error("User not authenticated")

        setAuthInfo({
          email: user.email ?? null,
          created_at: user.created_at ? new Date(user.created_at).toLocaleDateString('fa-IR') : null,
          last_sign_in_at: user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('fa-IR') : null,
        })

        const { data, error } = await supabase
          .from("users")
          .select("id, first_name, last_name")
          .eq("id", user.id)
          .single()

        if (error || !data) throw error || new Error("User data not found")

        setUserInfo({ ...data, email: user.email ?? "" })
        setFirstName(data.first_name)
        setLastName(data.last_name)
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  // 📌 تغییر اسم و فامیل
  const handleUpdateProfile = async () => {
    if (!userInfo) return
    
    if (!firstName.trim() || !lastName.trim()) {
      Swal.fire({
        title: 'خطا',
        text: 'لطفاً نام و نام خانوادگی را وارد کنید',
        icon: 'error',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#ef4444'
      })
      return
    }

    const { error } = await supabase
      .from("users")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", userInfo.id)

    if (error) {
      console.error("خطا در تغییر اطلاعات:", error)
      Swal.fire({
        title: 'خطا',
        text: 'خطا در تغییر اطلاعات پروفایل',
        icon: 'error',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#ef4444'
      })
    } else {
      Swal.fire({
        title: 'موفقیت آمیز',
        text: 'پروفایل با موفقیت به روز شد',
        icon: 'success',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#10b981'
      })
    }
  }

  // 📌 تغییر پسورد
  const handleChangePassword = async () => {
    if (!newPassword.trim()) {
      Swal.fire({
        title: 'خطا',
        text: 'لطفاً رمز عبور جدید را وارد کنید',
        icon: 'error',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#ef4444'
      })
      return
    }
    
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'خطا',
        text: 'رمز عبور و تکرار آن مطابقت ندارند',
        icon: 'error',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#ef4444'
      })
      return
    }
    
    if (newPassword.length < 6) {
      Swal.fire({
        title: 'خطا',
        text: 'رمز عبور باید حداقل 6 کاراکتر باشد',
        icon: 'error',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#ef4444'
      })
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      console.error("خطا در تغییر پسورد:", error)
      Swal.fire({
        title: 'خطا',
        text: 'خطا در تغییر رمز عبور',
        icon: 'error',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#ef4444'
      })
    } else {
      Swal.fire({
        title: 'موفقیت آمیز',
        text: 'رمز عبور با موفقیت تغییر کرد',
        icon: 'success',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#10b981'
      })
      setNewPassword("")
      setConfirmPassword("")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* هدر */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-2xl font-bold">تنظیمات حساب کاربری</h1>
            <p className="mt-2 opacity-90">مدیریت اطلاعات شخصی و امنیت حساب</p>
          </div>
          
          <div className="p-6">
            {/* اطلاعات حساب */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">اطلاعات حساب</h2>
              
              {authInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">ایمیل</p>
                    <p className="text-gray-800">{authInfo.email}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">تاریخ عضویت</p>
                    <p className="text-gray-800">{authInfo.created_at}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">آخرین ورود</p>
                    <p className="text-gray-800">{authInfo.last_sign_in_at}</p>
                  </div>
                </div>
              )}
            </div>

            {/* ویرایش پروفایل */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">ویرایش پروفایل</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نام</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <button 
                  onClick={handleUpdateProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center"
                >
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  ذخیره تغییرات پروفایل
                </button>
              </div>
            </div>

            {/* تغییر رمز عبور */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">تغییر رمز عبور</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور جدید</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="رمز عبور جدید را وارد کنید"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور جدید</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="رمز عبور جدید را تکرار کنید"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <button 
                  onClick={handleChangePassword}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center"
                >
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  تغییر رمز عبور
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}