import React from 'react'

import { supabase } from '../lib/supabase';

export interface OffProductsINT {
    id: number;
    name: string;
    image: string;
    orgPrice: number;
    offPrice: number;
    slug: string
}

export const GetapiOffProducts = async (): Promise<OffProductsINT[]> =>{
  const { data, error } = await supabase
    .from('offProducts')
    .select('*')

  if (error) {
    console.error('خطا در گرفتن دسته‌بندی‌ها:', error.message)
    return []
  }

  return data as OffProductsINT[]
}