'use client'

import React from 'react'
import Image from 'next/image'

import { useState , useEffect } from 'react';
import { GetapiArticle , ArticleINT } from '../api/getapi-article';
import Link from 'next/link';

function Articles() {

    const [articles , setArticle] = useState<ArticleINT[]>([])

    useEffect(()=>{
        const fetch = async ()=>{
            const data = await GetapiArticle()
            setArticle(data)
        }
        fetch()
    }, [])

  return (
    <div>
        <header className='flex gap-2 justify-center items-center text-center mt-20'>
            <Image src="/logo-article/Frame 1261157316.png" width={57} height={56} alt='logo'></Image>
            <h1 className='text-[#100E0C] text-[24px] font-bold'>همه مقالات</h1>
        </header>
        <main className='grid w-max gap-5 md:gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-[1312px] ml-auto mr-auto mt-20'>
            {articles.map((article)=>(
                <Link href={`/articleDetail/${article.slug}`} key={article.id}>
                    <div data-aos="fade-down" className='cursor-pointer w-[300px] mb-10'>
                        <Image src={article.image} width={300} height={218} alt='image'></Image>
                        <h2 className='text-[#2D2728] text-[18px] pt-5 pr-2'>{article.name}</h2>
                        <div className='flex justify-between pt-5'>
                            <p className='pr-2 text-[#A89C9F] text-[14px]'>{article.category}</p>
                                <Image className='pl-2' src="/logo-article/arrow-left.png" width={24} height={24} alt='logo'></Image>
                        </div>
                    </div>
                </Link>
            ))}
        </main>
    </div>
  )
}

export default Articles