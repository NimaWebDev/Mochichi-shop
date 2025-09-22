'use client';

import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 ساعت = 43200 ثانیه

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToPersian = (num: number | string) => {
    return num
      .toString()
      .replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: convertToPersian(hours.toString().padStart(2, '0')),
      minutes: convertToPersian(minutes.toString().padStart(2, '0')),
      seconds: convertToPersian(seconds.toString().padStart(2, '0')),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div dir='ltr' className="flex justify-center gap-4 lg:mt-15 font-bold">
      {/* ساعت */}
      <div className="bg-[#FFFFFF0D] text-white rounded-xl w-[62px] h-[64px] flex flex-col items-center justify-center shadow-md">
        <span className="text-[18px] font-semibold">{hours}</span>
        <span className="text-[12px] mt-1">ساعت</span>
      </div>
        <p className='text-white pt-5'>:</p>       
      {/* دقیقه */}
      <div className="bg-[#FFFFFF0D] text-white rounded-xl w-[62px] h-[64px] flex flex-col items-center justify-center shadow-md">
        <span className="text-[18px] font-semibold">{minutes}</span>
        <span className="text-[12px] mt-1">دقیقه</span>
      </div>
        <p className='text-white pt-5'>:</p>
      {/* ثانیه */}
      <div className="bg-[#FFFFFF0D] text-white rounded-xl w-[62px] h-[64px] flex flex-col items-center justify-center shadow-md">
        <span className="text-[18px] font-semibold">{seconds}</span>
        <span className="text-[12px] mt-1">ثانیه</span>
      </div>
    </div>
  );
};

export default Timer;


