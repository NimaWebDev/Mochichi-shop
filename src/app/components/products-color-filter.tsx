"use client"

import React, { useState } from 'react';

interface Props {
  onFilter: (color: string[]) => void; // چون چند چک‌باکس ممکنه تیک بخوره، آرایه می‌فرستیم
}

const colorsLabels: Record<string, string> = {
  'pink': 'صورتی',
  'red': 'قرمز',
  'blue': 'آبی',
  'yellow': 'زرد',
  'black': 'مشکی',
  'white': 'سفید',
};

const FilterColors = ({ onFilter }: Props) =>{
    const colors = Object.keys(colorsLabels);
    const [selectColor, setSelectedColor] = useState<string[]>([]);

    const handleCheckboxChange = (col: string, checked: boolean) => {
    let updatedColors = checked
      ? [...selectColor, col]               // اضافه می‌کنه
      : selectColor.filter((c) => c !== col); // حذف می‌کنه

    setSelectedColor(updatedColors);
    onFilter(updatedColors); // دسته‌بندی‌های انتخاب‌شده رو می‌فرسته
  };

    return (
    <div className="bg-[#FAFAFA] w-[285px] h-[341px] rounded-[12px]">
        <h2 className="text-[#121111] text-[14px] font-medium pt-5 pr-3">رنگ</h2>
        <div className='mt-10 mr-3'>
            {colors.map((col) => (
                <label key={col} className="flex items-center gap-2 mt-5">
                <input
                    type="checkbox"
                    checked={selectColor.includes(col)}
                    onChange={(e) => handleCheckboxChange(col, e.target.checked)}
                    className="accent-[#FF6687] w-[16px] h-[16px]"
                />
                <span className='text-[#404040] text-[14px] '>{colorsLabels[col]}</span>
                </label>
            ))}
        </div>
    </div>
  );
}

export default FilterColors