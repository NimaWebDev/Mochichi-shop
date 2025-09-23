import Image from "next/image";
import Link from "next/link";

import Category from "./parts/category";
import FavoriteItems from "./parts/favoriteItems";
import OffProducts from "./parts/offProducts";
import Ad from "./parts/ourAd";
import Article from "./parts/article";
import WebTitle from "./components/webTitle";


export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center mt-15">
        <div className="relative">
          <Image src="/logo-home/logo-bg-home.png" width={40} height={40} alt="logo"></Image>
          <Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " src="/logo-home/logo-home.png" width={18} height={18} alt="logo"></Image>
        </div>
        <h1 className="bg-[#FFF0F7] text-[14px] text-[#2D2728] font-bold w-[130px] h-[29px] rounded-[29px] pr-5 pt-0.5">موچیچی شاپ</h1>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <WebTitle />
        <Image className="ml-auto mr-auto" src="/logo-home/logo-title-home.png" width={179} height={19} alt="logo"></Image>
        <p className="w-[322px] leading-[180%] lg:w-[498px] ml-auto mr-auto text-[14px] text-[#A89C9F] lg:leading-[1.8]">موچیچی وارد کننده انواع اکسسوری - لوازم جانبی و لوازم تحریر خارجی میباشد و این یک متن تستی است جهت نمایش موچیچی</p>
        <Link href="/shop">
          <button className="w-[244px] h-[44px] bg-[#FF6687] rounded-[43px] text-[#FFFFFF] cursor-pointer mt-10">مشاهده محصولات</button>
        </Link>
      </div>
      <div className="relative justify-center items-center mt-30">
        <Image data-aos="fade-down" className='hidden lg:block absolute mr-100 mt-38' src="/image-category/image-right-category.png" width={100} height={100} alt='logo'></Image>
        <Image data-aos="fade-down" className='hidden lg:block absolute mr-350 mt-35' src="/image-category/image-left-category.png" width={100} height={100} alt='logo'></Image>
        <Image className="h-[204px] w-[270px] md:h-[300px] md:w-[1039px] ml-auto mr-auto" src="/image-home/image-bg-home.png" width={1039} height={300} alt="image"></Image>
        <div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image data-aos="fade-left" className="left-15 top-0 bottom-10 absolute md:left-35 md:top-10" src="/image-home/image-right-home.png" width={306} height={306} alt="image"></Image>
          <Image data-aos="zoom-in" className="w-[147px] h-[189px] bottom-55 md:w-[298px] md:h-[381px]" src="/image-home/image-main-home.png" width={298} height={381} alt="image"></Image>
          <Image data-aos="fade-right" className="right-15 top-0 bottom-10 absolute md:right-35 md:top-10" src="/image-home/image-left-home.png" width={306} height={306} alt="image"></Image>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-140 w-[342px] lg:w-[1400px]">
        <Category />
      </div>
        <FavoriteItems />
        <OffProducts />
        <Ad />
        <Article />
    </div>
  );
}
