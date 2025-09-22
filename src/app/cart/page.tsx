'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { useDispatch } from 'react-redux';

import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string;
}

interface CartItem {
  id: number;
  quantity: number;
  products: Product;
}

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.warn('User not logged in:', userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cart')
        .select('id, quantity, products(*)')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching cart:', error);
      } else {
        setCart(data || []);
      }

      setLoading(false);
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      return sum + item.quantity * item.products.price;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleRemoveItem = async (cartId: number) => {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartId);

    if (error) {
      console.error('خطا در حذف محصول:', error);
    } else {
      setCart(prev => prev.filter(item => item.id !== cartId));
    }
  };

  const formatNumberToPersian = (num: number): string => {
    return num.toLocaleString('fa-IR');
  };

  if (loading) {
    return <div className='text-center font-bold mt-20'>در حال بارگذاری...</div>;
  }

  if (cart.length === 0) {
    return <div className='text-center text-red-500 font-bold mt-20'>سبد خرید شما خالی است.</div>;
  }

  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4 mt-10">
      <h1 className="text-xl font-semibold text-slate-900">سبد خرید</h1>

      <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200"
            >
              <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
                <div className="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                  <Image
                    src={item.products.image}
                    width={100}
                    height={50}
                    alt="image-product"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      {item.products.name}
                    </h3>
                    <p className="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2">
                      رنگ: <span>{item.products.colors}</span>
                    </p>
                    <p className="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2">
                      تعداد: <span>{item.quantity}</span>
                    </p>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-sm font-semibold text-slate-900">
                      قیمت : {formatNumberToPersian(item.products.price)}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex flex-col">
                <div className="flex items-start gap-4 justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                  </svg>
                  <svg
                    onClick={() => handleRemoveItem(item.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-md px-4 py-6 shadow-sm border border-gray-200 lg:sticky lg:top-6 h-fit">
          <p className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
            قیمت کل : <span className="ml-auto">{formatNumberToPersian(totalPrice)}</span>
          </p>
          <div className="mt-8 space-y-4">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md cursor-pointer"
            >
              پرداخت
            </button>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <img
              src="https://readymadeui.com/images/master.webp"
              alt="card1"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/visa.webp"
              alt="card2"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/american-express.webp"
              alt="card3"
              className="w-10 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}