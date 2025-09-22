import React from 'react';
import { supabase } from '@/app/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import CommentForm from '@/app/components/comments';
import CommentList from '@/app/components/commentList';

interface ArticleDetailINT {
  id: number;
  name: string;
  category: string;
  image: string;
  content: string;
  content_2: string;
  slug: string;
  created_at: number;
}

export default async function ArticleDetail({ params }: any) {
  const { slug } = params;

const { data, error } = await supabase
  .from('article')
  .select('*')
  .eq('slug', slug)
  .single();

const article = data as ArticleDetailINT | null;

if (!article || error) {
  return notFound();
}


  return (
    <div className='mt-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-[1357px] h-auto mx-auto'>
        <Image 
          className='w-full h-auto max-h-[603px] object-cover' 
          src={article.image} 
          width={1357} 
          height={603} 
          alt='image-article'
        />
      </div>

      <div className='max-w-[1357px] mx-auto'>
        <h1 className='mt-10 text-[#2A2E2C] text-[24px] font-bold text-right'>{article.name}</h1>
      </div>

      <div className='max-w-[1357px] mx-auto'>
        <div className='flex flex-wrap justify-end items-center mt-10 gap-5 text-[#A89C9F] text-[14px]'>
          <p>{article.category}</p>
          <div className='flex items-center gap-2'>
            <Image src="/logo-article/calendar 01.png" width={24} height={24} alt='logo' />
            <span>{new Date(article.created_at).toLocaleDateString('fa-IR')}</span>
          </div>
        </div>
      </div>

      <div className='max-w-[1357px] w-full mx-auto text-right mt-10 leading-10 text-[#2A2E2C] px-4 sm:px-0'>
        <p>{article.content}</p>
      </div>

      <div className='max-w-[1357px] w-full mx-auto text-right mt-10 leading-10 text-[#2A2E2C] px-4 sm:px-0'>
        <h2 className='text-[20px] text-[#FF6687] font-semibold'>لورم ایپسوم متن ساختگی برای این متن سمپل میباشد که باید جایگزین شود!</h2>
        <p>{article.content_2}</p>
      </div>

      <div className='mt-20 max-w-[1357px] mx-auto'>
        <div className='mr-15 md:mr-0 flex gap-2 mb-10'>
          <Image src="/logo-comment/Frame 1261157127.png" width={96} height={73} alt='logo-comments'/>
          <h2 className='text-[#2D2728] text-[24px] pt-3'>دیدگاه کاربران</h2>
        </div>
        <CommentForm productSlug={article.slug}/>
        <CommentList productSlug={article.slug}/>
      </div>
    </div>
  )
}