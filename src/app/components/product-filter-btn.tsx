'use client';
import React, { useState } from 'react';

interface Props {
  onFilter: (category: string[]) => void; // چون چند چک‌باکس ممکنه تیک بخوره، آرایه می‌فرستیم
}

const categoryLabels: Record<string, string> = {
  'cheragh-khab': 'چراغ خواب',
  'lavazem-tahrir': 'لوازم تحریر',
  'accesory-khas': 'اکسسوری های خاص',
  'lavazem-Arayeshi': 'لوازم آرایشی',
  'kif-koole': 'کیف و کوله',
  'stiker': 'استیکر',
};

const FilterCategories = ({ onFilter }: Props) => {
  const categories = Object.keys(categoryLabels);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (cat: string, checked: boolean) => {
    let updatedCategories = checked
      ? [...selectedCategories, cat]               // اضافه می‌کنه
      : selectedCategories.filter((c) => c !== cat); // حذف می‌کنه

    setSelectedCategories(updatedCategories);
    onFilter(updatedCategories); // دسته‌بندی‌های انتخاب‌شده رو می‌فرسته
  };

  return (
    <div className="bg-[#FAFAFA] w-[285px] h-[338px] rounded-[12px]">
        <h2 className="text-[#121111] text-[14px] font-medium pt-5 pr-3">دسته بندی</h2>
        <div className='mt-10 mr-3'>
            {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 mt-5">
                <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={(e) => handleCheckboxChange(cat, e.target.checked)}
                    className="accent-[#FF6687] w-[16px] h-[16px]"
                />
                <span className='text-[#404040] text-[14px] '>{categoryLabels[cat]}</span>
                </label>
            ))}
        </div>
    </div>
  );
};

export default FilterCategories;
