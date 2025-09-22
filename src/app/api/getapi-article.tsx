import React from 'react'

import { supabase } from '../lib/supabase';

export interface ArticleINT {
    id: number;
    name: string;
    image: string;
    content: string;
    category: string;
    slug: string
}

export const GetapiArticle = async (): Promise<ArticleINT[]> =>{
  const { data, error } = await supabase
    .from('article')
    .select('id, name , image , slug ,category')

  if (error) {
    console.error('خطا در گرفتن دسته‌بندی‌ها:', error.message)
    return []
  }

  return data as ArticleINT[]
}