"use client"
import { useState } from 'react';

interface StationeryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const StationeryGallery = () => {
  const [selectedImage, setSelectedImage] = useState<StationeryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('همه');

  // داده‌های نمونه برای گالری
  const stationeryItems: StationeryItem[] = [
    {
      id: 1,
      title: "مداد طراحی حرفه‌ای",
      description: "مداد با گرافیت نرم برای طراحی‌های ظریف",
      image: "/image-Gallary/image-gallary-1.jpg",
      category: "نوشت‌افزار"
    },
    {
      id: 2,
      title: "خودکار تمام رنگی",
      description: "مجموعه‌ای از خودکارهای رنگی برای یادداشت‌های زیبا",
      image: "/image-Gallary/image-gallary-2.jpg",
      category: "نوشت‌افزار"
    },
    {
      id: 3,
      title: "دفتر یادداشت چرمی",
      description: "دفتری با جنس چرم طبیعی برای یادداشت‌های مهم",
      image: "/image-Gallary/image-gallary-3.jpg",
      category: "کاغذی"
    },
    {
      id: 4,
      title: "خط‌کش استیل",
      description: "خط‌کش فلزی با دقت بالا برای ترسیم‌های دقیق",
      image: "/image-Gallary/image-gallary-4.jpg",
      category: "ترسیم"
    },
    {
      id: 5,
      title: "پاک‌کن طرح‌دار",
      description: "پاک‌کن با طرح‌های زیبا و کارایی بالا",
      image: "/image-Gallary/image-gallary-5.jpg",
      category: "نوشت‌افزار"
    }
  ];

  // دسته‌بندی‌های منحصر به فرد
  const categories = ['همه', ...new Set(stationeryItems.map(item => item.category))];

  // فیلتر کردن آیتم‌ها بر اساس دسته‌بندی
  const filteredItems = activeCategory === 'همه' 
    ? stationeryItems 
    : stationeryItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">گالری لوازم تحریر</h1>
      
      {/* فیلتر دسته‌بندی */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* گالری تصاویر */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* مودال برای نمایش تصویر بزرگ */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-700 mb-4">{selectedImage.description}</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationeryGallery;