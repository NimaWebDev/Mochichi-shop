import Link from 'next/link';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br  flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
        
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-4">
            <div className="w-full h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-6 h-4 bg-pink-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 "></div>
          </div>
          <div className="w-64 h-2 bg-red-400 mx-auto rounded-full opacity-80 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-200 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        <h1 className="text-8xl md:text-9xl font-black text-gray-800 mb-4">
          4<span className="text-red-500 animate-pulse">0</span>4
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          صفحه مورد نظر پیدا نشد!
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          به نظر می‌رسد آدرسی که دنبالش هستید، یا پاک شده، جابه‌جا شده، یا شاید هم هیچ وقت وجود نداشته!
        </p>
        <p className="text-lg text-gray-600 mb-8">
          مثل این می‌مونه که تو یه داستان، یه صفحه رو پاره کرده باشن!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link
            href="/shop"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-amber-400"
          >
            بریم به فروشگاه
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          اگر فکر می‌کنید این یک خطاست، لطفاً به ما اطلاع دهید.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;