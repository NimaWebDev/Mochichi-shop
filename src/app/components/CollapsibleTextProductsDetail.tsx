'use client';

import React, { useState } from 'react';

const CollapsibleText = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const fullText = "چراغ خواب گربه سیلیکونی یک وسیله دکوراتیو و کاربردی است که از جنس سیلیکون نرم ساخته شده و به شکل گربه طراحی شده است. این چراغ با نور ملایم و قابل تنظیم، فضایی آرام برای خواب ایجاد می‌کند. معمولاً از طریق پورت USB شارژ می‌شود و به دلیل طراحی نرم و ایمن، مناسب برای کودکان است. شکل بامزه این چراغ آن را به گزینه‌ای جذاب برای تزئین اتاق تبدیل می‌کند.چراغ خواب گربه سیلیکونی یک وسیله دکوراتیو و کاربردی است که از جنس سیلیکون نرم ساخته شده و به شکل گربه طراحی شده است. این چراغ با نور ملایم و قابل تنظیم، فضایی آرام برای خواب ایجاد می‌کند. معمولاً از طریق پورت USB شارژ می‌شود و به دلیل طراحی نرم و ایمن، مناسب برای کودکان است. شکل بامزه این چراغ آن را به گزینه‌ای جذاب برای تزئین اتاق تبدیل می‌کند.";

  const shortText = fullText.slice(0, 150) + "...";

  return (
    <div className="mt-5 text-center w-[342px] mr-10">
      <div className={`overflow-hidden transition-all duration-1500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-[96px]'}`}>
        <p className="text-[16px] leading-[32px] font-[400]">
          {isExpanded ? fullText : shortText}
        </p>
      </div>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 text-[#30303D] font-medium hover:text-[#50505D] transition-colors flex items-center justify-center mx-auto"
      >
        {isExpanded ? (
          <>
            <span className='cursor-pointer'>بستن</span>
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            <span className='cursor-pointer'> مطالعه بیشتر</span>
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default CollapsibleText;