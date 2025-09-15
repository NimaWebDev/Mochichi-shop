import { supabase } from '@/app/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import CommentForm from '@/app/components/comments';
import CommentList from '@/app/components/commentList';
import AddToCartButton from '@/app/components/AddToCartButton';
import FeaturesSection from '@/app/components/featuresSection';
import CollapsibleText from '@/app/components/CollapsibleTextProductsDetail';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  options: string;
}

export default async function ProductDetails({ 
  params
}: { 
  params: { slug: string } 
}) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single(); 

  console.log("Supabase error:", error);
  console.log("Searching for slug:", params.slug);
  console.log("Product found:", product);

  if (!product || error) {
    return notFound();
  }

  function formatNumberToPersian(num: number): string {
    return num.toLocaleString('fa-IR')
  }

  return (
    <div className="lg:w-[1336px] ml-auto mr-auto mt-10">
      <div className='mr-5 md:mr-100 lg:mr-0 lg:flex'>
        <Image src={product.image} className='w-[342px] lg:w-[533px]' width={533} height={498} alt='image-product'></Image>
        <div className='pr-5'>
          <h1 className='text-[#100E0C] text-[32px] font-bold mt-10'>{product.name}</h1>
          <div className='flex gap-8 mt-5'>
            <p className='text-[#929292] text-[14px]'>شناسه کالا : <span className='text-[#14151B]'>1245987</span></p>
            <p className='text-[#929292] text-[14px]'>برچسب : <span>چراغ خواب</span></p>
          </div>
          <h3 className='text-[#14151B] text-[16px] font-medium mt-5'>ویژگی های محصول</h3>
          <p className='text-[#606060] text-[12px] w-[120px] mt-2 leading-6'>{product.options}</p>
          <h3 className='text-[#14151B] text-[16px] font-medium mt-5'>انتخاب رنگ</h3>
          <div className='flex gap-5 mt-5'>
            <div className='flex gap-2 bg-[#FAFAFA] w-[90px] h-[36px] rounded-[24px] cursor-pointer'>
              <Image className='w-[20px] h-[20px] mt-2 mr-2' src="/logo-detail-products/logo-blue.png" width={20} height={20} alt='logo'></Image>
              <p className='text-[#100E0C] text-[14px] pt-2 mr-3'>آبی</p>
            </div>
            <div className='flex gap-2 mr-2 bg-[#FAFAFA] w-[90px] h-[36px] rounded-[24px] cursor-pointer'>
              <Image className='w-[20px] h-[20px] mt-2 mr-2' src="/logo-detail-products/logo-orange.png" width={20} height={20} alt='logo'></Image>
              <p className='text-[#100E0C] text-[14px] pt-2 mr-3'>نارنجی</p>
            </div>
            <div className='flex gap-2 mr-2 bg-[#FAFAFA] w-[90px] h-[36px] rounded-[24px] cursor-pointer'>
              <Image className='w-[20px] h-[20px] mt-2 mr-2' src="/logo-detail-products/logo-green.png" width={20} height={20} alt='logo'></Image>
              <p className='text-[#100E0C] text-[14px] pt-2 mr-3'>سبز</p>
            </div>
          </div>
            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              image: product.image,
              price: product.price
            }} />        
          </div>
        <div className='hidden lg:block lg:mr-10'>
          <div>
            <div className='flex'>
              <h2 className='mt-5'> امتیاز 4.5</h2>
              <Image className='mr-30' src="/logo-detail-products/logo-star.png" width={50} height={50} alt='logo'></Image>
            </div>
            <div className='flex mt-5'>
              <h2 className='mt-5'>ضمانت اصالت و کیفیت کالا</h2>
              <Image className='mr-2' src="/logo-detail-products/logo-safe.png" width={50} height={50} alt='logo'></Image>
            </div>
          </div>
        </div>
      </div>
      <FeaturesSection />
      <div className='mt-20'>
        <div>
          <div className='flex justify-center items-center text-center gap-5'>
              <Image src="/logo-article/logo-article-1.png" width={36} height={32} alt='logo'></Image>
              <h2 className='text-[#2D2728] text-[24px] font-semibold'>درباره محصول</h2>
              <Image src="/logo-article/logo-article-2.png" width={36} height={32} alt='logo'></Image>
          </div>
          <p className='hidden md:block text-[16px] leading-[32px] text-center mt-5 font-[400]'>
            چراغ خواب گربه سیلیکونی یک وسیله دکوراتیو و کاربردی است که از جنس سیلیکون نرم ساخته شده و به شکل گربه طراحی شده است. این چراغ با نور ملایم و قابل تنظیم، فضایی آرام برای خواب ایجاد می‌کند. معمولاً از طریق پورت USB شارژ می‌شود و به دلیل طراحی نرم و ایمن، مناسب برای کودکان است. شکل بامزه این چراغ آن را به گزینه‌ای جذاب برای تزئین اتاق تبدیل می‌کند.چراغ خواب گربه سیلیکونی یک وسیله دکوراتیو و کاربردی است که از جنس سیلیکون نرم ساخته شده و به شکل گربه طراحی شده است. این چراغ با نور ملایم و قابل تنظیم، فضایی آرام برای خواب ایجاد می‌کند. معمولاً از طریق پورت USB شارژ می‌شود و به دلیل طراحی نرم و ایمن، مناسب برای کودکان است. شکل بامزه این چراغ آن را به گزینه‌ای جذاب برای تزئین اتاق تبدیل می‌کند.
          </p>
          <div className='md:hidden'>
            <CollapsibleText />
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='mr-15 md:mr-0 flex gap-2 mb-10'>
          <Image src="/logo-comment/Frame 1261157127.png" width={96} height={73} alt='logo-comments'></Image>
          <h2 className='text-[#2D2728] text-[24px] pt-3'>دیدگاه کاربران</h2>
        </div>
        <CommentForm productSlug={product.slug} />
        <CommentList productSlug={product.slug} />
      </div>
    </div>
  );
}