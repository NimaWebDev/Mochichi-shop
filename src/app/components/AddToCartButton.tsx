'use client';

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import Counter from "./btn-counter-product";
import Swal from 'sweetalert2'

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = async () => {
    const userResult = await supabase.auth.getUser();
    const user = userResult.data.user;

    if (!user) {
      Swal.fire({
        title: 'ورود به حساب',
        text: 'لطفاً ابتدا وارد حساب کاربری شوید.',
        icon: 'warning',
        confirmButtonText: 'ورود',
        customClass: {
          confirmButton:
            'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      }).then(() => {
        router.push('/login')
      })
      return
    }

    dispatch(addToCart({ ...product, quantity }));

    const { error } = await supabase
      .from('cart')
      .insert({
        user_id: user.id,
        user_email: user.email,
        product_id: product.id,
        quantity,
        image_product: product.image,
        name_product: product.name,
        
      });

      if (error) {
        console.error('خطا در ذخیره در Supabase:', error)
      } else {
        Swal.fire({
          title: 'موفقیت 🎉',
          text: 'محصول به سبد خرید اضافه شد ✅',
          icon: 'success',
          confirmButtonText: 'باشه',
          customClass: {
            confirmButton:
              'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
          },
          buttonsStyling: false,
        })
      }

  };

  const formatNumberToPersian = (num: number): string => {
    return num.toLocaleString('fa-IR');
  };

  return (
    <div className="lg:flex relative">
      <button 
        className='bg-[#EC6880] w-[340px] md:w-[458px] h-[56px] rounded-[56px] text-white flex gap-8 justify-center items-center text-center mt-10 cursor-pointer'
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید <span className='text-[#FFFFFF33]'>|</span>
        <span>{formatNumberToPersian(product.price)} تومان</span>
      </button>
      <div className="absolute lg:mr-140 mt-10">
        <Counter value={quantity} onChange={setQuantity} />
      </div>
    </div>
  );
}