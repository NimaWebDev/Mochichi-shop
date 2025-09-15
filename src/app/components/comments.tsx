'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase'; 
import Image from 'next/image';

interface CommentFormProps {
  productSlug: string;
}

export default function CommentForm({ productSlug }: CommentFormProps) {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);

  const { error } = await supabase.from('comments').insert([
    {
      product_slug: productSlug,
      user_name: userName,
      phone_number: phoneNumber,
      content: content,
    },
  ]);

  setLoading(false);

  if (error) {
    console.error('Error adding comment:', error);
    return;
  }

  setSuccess(true);

  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

  return (
    <form onSubmit={handleSubmit} className="mr-5 md:w-[1312px] h-[337px] ml-auto lg:mr-auto">
        <div className='md:flex gap-5'>
            <div className='relative'>
                <input type='text' placeholder='نام و نام خانوادگی' value={userName} onChange={(e)=> {setUserName(e.target.value)}} className='w-[342px] lg:w-[636px] h-[56px] bg-[#FFF0F7] rounded-[56px] pr-3 text-[#100E0C]'></input>
                <Image className='hidden md:block absolute top-1/2 -translate-y-1/2 mr-140' src="/logo-comment/user.png" width={24} height={24} alt='logo'></Image>
            </div>
            <div className='relative'>
                <input type='text' placeholder='شماره تماس' value={phoneNumber} onChange={(e)=> {setPhoneNumber(e.target.value)}} maxLength={11} className='w-[342px] mt-5 lg:mt-0 lg:w-[636px] h-[56px] bg-[#FFF0F7] rounded-[56px] pr-3 text-[#100E0C]'></input>
                <Image className='hidden md:block absolute top-1/2 -translate-y-1/2 mr-140' src="/logo-comment/mobile.png" width={24} height={24} alt='logo'></Image>
            </div>
        </div>
        <div className='mt-5'>
            <textarea placeholder='متن دیدگاه خود را وارد کنید' value={content} onChange={(e)=> {setContent(e.target.value)}} required className='w-[342px] lg:w-[1296px] h-[207px] bg-[#FFF0F7] rounded-[26px] text-[#100E0C] p-3'></textarea>
        </div>
        <button type='submit' disabled={loading} className='w-[250px] h-[44px] rounded-[43px] bg-[#FF6687] text-white transition-all mr-10 lg:mr-260 mt-5 hover:bg-green-500 cursor-pointer'>
            {loading ? 'در حال ارسال ...' : 'ثبت دیدگاه'}
        </button>
        {success && <p className="text-green-600 mt-10 text-center">✅ نظر شما ثبت شد!</p>}
    </form>
  );
}
