import React from 'react'

import { supabase } from '../lib/supabase';

export interface categoryINT {
    id: number;
    name: string;
    logo: string;
    slug: string
}

export const GetapiCategory = async (): Promise<categoryINT[]> =>{
  const { data, error } = await supabase
    .from('category')
    .select('id, name, slug, logo')

  if (error) {
    console.error('خطا در گرفتن دسته‌بندی‌ها:', error.message)
    return []
  }

  return data as categoryINT[]
}

