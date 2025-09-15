"use client"
import React from 'react'
import Image from 'next/image'

import { useState , useEffect } from 'react';
import { GetapiArticle , ArticleINT } from '../api/getapi-article';
import Link from 'next/link';

function Article() {

    const [articles , setArticle] = useState<ArticleINT[]>([])

    useEffect(()=>{
        const fetch = async ()=>{
            const data = await GetapiArticle()
            setArticle(data)
        }
        fetch()
    }, [])

  return (
    <div className='mt-20 justify-center items-center text-center'>   
        <div className='flex justify-center items-center text-center gap-5'>
            <Image src="/logo-article/logo-article-1.png" width={36} height={32} alt='logo'></Image>
            <h2 className='text-[#2D2728] text-[24px] font-semibold'>مقالات آموزشی موچیچی</h2>
            <Image src="/logo-article/logo-article-2.png" width={36} height={32} alt='logo'></Image>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:flex justify-center items-center gap-20 mt-20'>
            {articles.slice(0, 3).map((article)=>(
                <div data-aos="fade-down" className='w-[342px] h-[218px] mx-auto mt-5 lg:w-[354px] lg:h-[218px] lg:mt-0 lg:mx-0' key={article.id}>
                    <Image src={article.image} width={354} height={218} alt='image'></Image>
                    <h2 className='text-[#2D2728] text-[18px] pt-5 pr-2'>{article.name}</h2>
                    <div className='flex justify-between pt-5'>
                        <p className='pr-2 text-[#A89C9F] text-[14px]'>{article.category}</p>
                        <Link href={`/articleDetail/${article.slug}`}>
                            <Image className='pl-2' src="/logo-article/arrow-left.png" width={24} height={24} alt='logo'></Image>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        <Link href="/articles">
            <button className='bg-[#FF6687] w-[203px] h-[44px] rounded-[43px] text-white mt-40 cursor-pointer'>مقالات بیشتر </button>
        </Link>
    </div>
  )
}

export default Article