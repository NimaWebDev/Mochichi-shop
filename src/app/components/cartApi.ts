import { supabase } from "../lib/supabase";

export interface CartDBItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartProductItem {
  cart_id: string;
  product_id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

// اضافه کردن یا افزایش تعداد محصول
export async function addOrIncrementCartItem(userId: string, productId: string) {
  const { data, error } = await supabase
    .from<CartDBItem>('cart')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  if (data) {
    // اگر محصول وجود داره تعدادش رو افزایش بده
    const { error: updateError } = await supabase
      .from('cart')
      .update({ quantity: data.quantity + 1 })
      .eq('id', data.id);

    if (updateError) throw updateError;
    return;
  } else {
    // اگر وجود نداشت اضافه کن
    const { error: insertError } = await supabase
      .from('cart')
      .insert({ user_id: userId, product_id: productId, quantity: 1 });

    if (insertError) throw insertError;
  }
}

// حذف محصول از سبد
export async function removeCartItem(cartItemId: string) {
  const { error } = await supabase.from('cart').delete().eq('id', cartItemId);
  if (error) throw error;
}

// تغییر تعداد محصول
export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  if (quantity < 1) throw new Error('تعداد باید حداقل ۱ باشد');
  const { error } = await supabase.from('cart').update({ quantity }).eq('id', cartItemId);
  if (error) throw error;
}

// گرفتن سبد خرید کاربر به همراه اطلاعات محصول
export async function getCartItemsWithProduct(userId: string): Promise<CartProductItem[]> {
  const { data, error } = await supabase
    .from('cart')
    .select(`
      id,
      product_id,
      quantity,
      products (
        id,
        name,
        price,
        image
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;

  return data.map(item => ({
    cart_id: item.id,
    product_id: item.product_id,
    quantity: item.quantity,
    name: item.products.name,
    price: item.products.price,
    image: item.products.image,
  }));
}
