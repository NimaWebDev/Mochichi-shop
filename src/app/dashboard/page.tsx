"use client"
import UserProfile from "../components/user-profile"
import { useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabase"

// تعریف تایپ‌ها
interface Product {
  id: number
  name: string
  price: number
  image: string
  colors: string
}

interface CartItem {
  id: number
  quantity: number
  products: Product
  user_id: string
  created_at: string
}


export default function Dashboard() {
  const [activeOrders, setActiveOrders] = useState<number>(0)
  const [lastOrder, setLastOrder] = useState<Product | null>(null)
  const [joinDate, setJoinDate] = useState<string>("")

  useEffect(() => {
    fetchUserData()
    fetchCartData()
  }, [])

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.created_at) {
      const date = new Date(user.created_at)
      setJoinDate(date.toLocaleDateString('fa-IR'))
    }
  }

  const fetchCartData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // تعداد آیتم‌های سبد خرید
    const { data: cartData, error } = await supabase
      .from('cart')
      .select('id, quantity, products(*)')
      .eq('user_id', user.id)

    if (!error && cartData) {
      // تعداد سفارشات فعال = تعداد آیتم‌های سبد خرید
      setActiveOrders(cartData.length)
      
      // آخرین محصول اضافه شده به سبد خرید
      if (cartData.length > 0) {
        const lastItem = cartData[cartData.length - 1]
        setLastOrder(lastItem.products)
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center md:justify-around max-w-6xl mx-auto px-4">
      {/* سایدبار پروفایل */}
      <div className="w-full md:w-auto">
        <UserProfile />
      </div>
      
      {/* بخش اصلی داشبورد کاربر */}
      <div className="w-full md:w-[800px] mt-6 md:mt-20 shadow-lg rounded-2xl bg-white p-6">
        {/* هدر */}
        <div className="mb-8 text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">داشبورد کاربری</h1>
          <p className="text-gray-600">به حساب کاربری خود خوش آمدید</p>
        </div>

        {/* کارت‌های اطلاعات کاربر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#EDEDED] p-4 rounded-xl border border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">تعداد آیتم‌های سبد خرید</p>
                <p className="text-2xl font-bold mt-1">{activeOrders}</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>

          <div className="bg-[#EDEDED] p-4 rounded-xl border border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">تاریخ عضویت</p>
                <p className="text-lg font-bold mt-1">{joinDate || "در حال بارگذاری..."}</p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>
        </div>

        {/* آخرین سفارش */}
        <div className="gap-6 mb-8">
          <div className="bg-[#EDEDED] p-6 rounded-xl border border-gray-300">
            <h3 className="font-semibold mb-3 text-right">آخرین محصول اضافه شده به سبد خرید</h3>
            
            {lastOrder ? (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <img 
                    src={lastOrder.image} 
                    alt={lastOrder.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 text-right">
                    <h4 className="font-semibold">{lastOrder.name}</h4>
                    <p className="text-gray-600 mt-1">قیمت: {lastOrder.price.toLocaleString('fa-IR')} تومان</p>
                    <p className="text-sm text-gray-500 mt-1">رنگ: {lastOrder.colors}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>هنوز محصولی به سبد خرید اضافه نکرده‌اید</p>
                <button className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                  مشاهده محصولات
                </button>
              </div>
            )}
          </div>
        </div>

        {/* پیام خوشامدگویی */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-xl mb-6">
          <h3 className="font-semibold mb-2 text-right">به خانواده ما خوش آمدید! 👋</h3>
          <p className="text-right text-gray-700">
            از طریق این پنل می‌توانید سفارشات خود را مدیریت کرده و از تخفیف‌های ویژه اعضا استفاده کنید.
          </p>
        </div>

        {/* دکمه‌های اقدام سریع */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.location.href = '/shop'}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition cursor-pointer"
          >
            مشاهده محصولات
          </button>
          <button 
            onClick={() => window.location.href = '/cart'}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            مشاهده سبد خرید
          </button>
        </div>
      </div>
    </div>
  )
}