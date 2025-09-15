import React from 'react'
import { supabase } from '../lib/supabase';

export interface ProductsINT {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  available: boolean;
  colors: string;
  slug: string;
}

export const GetapiProducts = async (
  minPrice?: number,
  maxPrice?: number,
  onlyAvailable?: boolean,
  categories?: string[], // تغییر از string به string[]
  colors?: string[]
): Promise<ProductsINT[]> => {
  let query = supabase.from('products').select('*');

  // فیلتر قیمت
  if (minPrice !== undefined && maxPrice !== undefined) {
    query = query.gte('price', minPrice).lte('price', maxPrice);
  }

  // فیلتر موجود بودن
  if (onlyAvailable) {
    query = query.eq('available', true);
  }

  // فیلتر دسته‌بندی‌ها
  if (categories && categories.length > 0 && !categories.includes('همه')) {
    query = query.in('category', categories); // استفاده از in() برای آرایه
  }

  // فیلتر رنگ بندی

  if (colors && colors.length > 0 && !colors.includes('همه')) {
    query = query.in('colors' , colors);
  }

  const { data, error } = await query;
  if (error) console.error('خطا:', error.message);
  return (data || []) as ProductsINT[];
};
