import React from 'react'

import { supabase } from '../lib/supabase';

export interface favoriteProductsINT {
    id: number;
    name: string;
    image: string;
    orgPrice: number;
    offPrice: number;
    slug: string
}

export const GetapiFavoriteProducts = async (): Promise<favoriteProductsINT[]> =>{
  const { data, error } = await supabase
    .from('favoriteProducts')
    .select('*')

  if (error) {
    console.error('خطا در گرفتن دسته‌بندی‌ها:', error.message)
    return []
  }

  return data as favoriteProductsINT[]
}
