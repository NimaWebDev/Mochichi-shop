"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { GetapiProducts, ProductsINT } from '../api/get-api-products'
import FilterCategories from '../components/product-filter-btn'
import FilterColors from '../components/products-color-filter'
import Link from 'next/link'

function Shop() {
    const [products, setProducts] = useState<ProductsINT[]>([])
    const [minPrice, setMinPrice] = useState<number | undefined>()
    const [maxPrice, setMaxPrice] = useState<number | undefined>()
    const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['همه'])
    const [selectedColors, setSelectedColors] = useState<string[]>(['همه'])
    const [isLoading, setIsLoading] = useState(false)
    const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none')
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                const data = await GetapiProducts(
                    minPrice,
                    maxPrice,
                    onlyAvailable,
                    selectedCategories.includes('همه') ? undefined : selectedCategories,
                    selectedColors.includes('همه') ? undefined : selectedColors
                )
                setProducts(data)
            } catch (error) {
                console.error("خطا در دریافت محصولات:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [minPrice, maxPrice, onlyAvailable, selectedCategories, selectedColors])

    const sortedProducts = [...products].sort((a, b) => {
    if (priceSort === 'asc') return a.price - b.price;
    if (priceSort === 'desc') return b.price - a.price;
    return 0; 
    });

    const resetFilters = () => {
        setSelectedCategories(['همه'])
        setSelectedColors(['همه'])
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setOnlyAvailable(false)
    }

    function formatNumberToPersian(num: number): string {
        return num.toLocaleString('fa-IR')
    }

    return (
        <div className="max-w-[1370px] mx-auto px-4">
            <div className="md:hidden flex justify-between items-center mt-6 mb-4">
                <button 
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="bg-[#FAFAFA] flex items-center justify-center gap-2 w-full h-[56px] rounded-[12px]"
                >
                    <Image className='w-[20px] h-[20px]' src="/logo-products/logo-filter-1.png" width={20} height={20} alt='filter' />
                    <span className='text-[#121111] text-[14px]'>فیلترها</span>
                </button>
            </div>

            <header className='w-full flex flex-col md:flex-row gap-5 mt-10'>
                <div className='hidden md:flex bg-[#FAFAFA] justify-between w-full md:w-[285px] h-[56px] rounded-[12px]'>
                    <div className='flex gap-2 pr-3 mt-4'>
                        <Image className='w-[20px] h-[20px]' src="/logo-products/logo-filter-1.png" width={20} height={20} alt='logo'></Image>
                        <h1 className='text-[#121111] text-[14px]'>فیلتر</h1>
                    </div>
                    <div className='mt-4 pl-3'>
                        <h2 onClick={resetFilters} className='text-[#FF6687] text-[14px] cursor-pointer'>حذف فیلتر </h2>
                    </div>
                </div>
                <div className='hidden md:flex bg-[#FAFAFA] gap-10 w-full md:w-[1095px] h-[56px] rounded-[12px]'>
                    <div className='flex mt-4 pr-3 gap-3'>
                        <Image className='w-[20px] h-[20px]' src="/logo-products/logo-filter-2.png" width={20} height={20} alt='logo'></Image>
                        <h2 className='text-[#121111] text-[16px]'>مرتب سازی :</h2>
                    </div>
                    <div className='flex gap-3 mt-4 text-[#EC6880] text-[14px]'>
                        <span className='cursor-pointer'>پربازدیدترین</span>
                        <p>|</p>
                        <span className='cursor-pointer'>جدیدترین</span>
                        <p>|</p>
                        <span className='cursor-pointer'>پرفروش ترین</span>
                        <p>|</p>
                        <span  onClick={() => setPriceSort(priceSort === 'asc' ? 'none' : 'asc')} className={`cursor-pointer ${priceSort === 'asc' ? 'text-black font-medium' : 'text-EC6880'}`}>ارزان ترین</span>
                        <p>|</p>
                        <span onClick={() => setPriceSort(priceSort === 'desc' ? 'none' : 'desc')} className={`cursor-pointer ${priceSort === 'desc' ? 'text-black font-medium' : 'text-[#EC6880]'}`}>گران ترین</span>
                        <p>|</p>
                        <span className='cursor-pointer'>منتخب</span>
                    </div>
                    <div className='mt-4 mr-auto ml-4'>
                        <p className='text-[#404040] text-[14px]'>{formatNumberToPersian(products.length)} عدد محصول موجود است</p>
                    </div>
                </div>
            </header>

            {showMobileFilters && (
                <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">فیلترها</h2>
                        <button 
                            onClick={() => setShowMobileFilters(false)}
                            className="text-[#FF6687] text-[14px]"
                        >
                            بستن
                        </button>
                    </div>

                    <div className="bg-[#FAFAFA] w-full h-[235px] rounded-[12px] p-4 mb-4">
                        <h2 className='text-[#121111] text-[14px] font-medium'>بازه قیمتی</h2>
                        <div className='mt-5'>
                            <Image src="/logo-products/logo-filter-price.png" width={253} height={12} alt='logo' />
                            <div className='w-full flex justify-between mt-2'>
                                <span>
                                    {minPrice !== undefined ? formatNumberToPersian(minPrice) : '0'} تومان
                                </span>
                                <span>
                                    {maxPrice !== undefined ? formatNumberToPersian(maxPrice) : '0'} تومان
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-between mt-3'>
                            <span className='text-[#929292] text-[14px] pt-3'>از قیمت :</span>
                            <input type="number" className="w-[180px] h-[40px] border border-[#FF6687] rounded-[8px] p-2" onChange={(e) => setMinPrice(Number(e.target.value))}/>
                        </div>
                        <div className='flex justify-between mt-3'>
                            <span className='text-[#929292] text-[14px] pt-3'>تا قیمت :</span>
                            <input type="number" className="w-[180px] h-[40px] border border-[#FF6687] rounded-[8px] p-2" onChange={(e) => setMaxPrice(Number(e.target.value))}/>
                        </div>
                    </div>

                    <div className='bg-[#FAFAFA] w-full h-[56px] rounded-[12px] p-4 mb-4'>
                        <div className="flex justify-between">
                            <span className="text-[#121111] text-[14px] font-medium">نمایش کالاهای موجود</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={onlyAvailable} onChange={() => setOnlyAvailable(!onlyAvailable)} />
                                <div className="w-11 h-6 bg-[#FF6687] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-200"></div>
                            </label>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <FilterCategories onFilter={setSelectedCategories} />
                    </div>

                    <div className='mb-6'>
                        <FilterColors onFilter={setSelectedColors} />
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={resetFilters}
                            className="flex-1 bg-gray-100 text-[#FF6687] h-[56px] rounded-[12px]"
                        >
                            حذف فیلتر
                        </button>
                        <button 
                            onClick={() => setShowMobileFilters(false)}
                            className="flex-1 bg-[#FF6687] text-white h-[56px] rounded-[12px]"
                        >
                            اعمال فیلترها
                        </button>
                    </div>
                </div>
            )}

            <div className='flex flex-col md:flex-row gap-5 mt-5'>
                <nav className='hidden md:block md:w-[285px] flex-shrink-0'>
                    <div className="bg-[#FAFAFA] w-full h-[235px] rounded-[12px]">
                        <h2 className='text-[#121111] text-[14px] font-medium pr-3 pt-5'>بازه قیمتی</h2>
                        <div className='mt-5 mr-3'>
                            <Image src="/logo-products/logo-filter-price.png" width={253} height={12} alt='logo' />
                            <div className='w-[253px] flex justify-between'>
                                <span className='pt-2 pr-5'>
                                    {minPrice !== undefined ? formatNumberToPersian(minPrice) : '0'} تومان
                                </span>
                                <span className='pt-2 pr-5'>
                                    {maxPrice !== undefined ? formatNumberToPersian(maxPrice) : '0'} تومان
                                </span>
                            </div>
                        </div>
                        <div className='flex w-[253px] justify-between mt-3 mr-3'>
                            <span className='text-[#929292] text-[14px] pt-3'>از قیمت :</span>
                            <input type="number" className="w-[180px] h-[40px] border border-[#FF6687] rounded-[8px] p-5" onChange={(e) => setMinPrice(Number(e.target.value))}/>
                        </div>
                        <div className='flex w-[253px] justify-between mt-3 mr-3'>
                            <span className='text-[#929292] text-[14px] pt-3'>تا قیمت :</span>
                            <input type="number" className="w-[180px] h-[40px] border border-[#FF6687] rounded-[8px] p-5" onChange={(e) => setMaxPrice(Number(e.target.value))}/>
                        </div>
                    </div>
                    <div className='bg-[#FAFAFA] w-full h-[56px] rounded-[12px] mt-6'>
                        <div className="flex justify-between pt-4 pr-3 pl-3">
                            <span className="text-[#121111] text-[14px] font-medium">نمایش کالاهای موجود</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={onlyAvailable} onChange={() => setOnlyAvailable(!onlyAvailable)} />
                                <div className="w-11 h-6 bg-[#FF6687] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-200"></div>
                            </label>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <FilterCategories onFilter={setSelectedCategories} />
                    </div>
                    <div className='mt-6'>
                        <FilterColors onFilter={setSelectedColors} />
                    </div>
                </nav>
                
                <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : sortedProducts.length === 0 ? (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <p className="text-[#FF6687] text-lg">محصولی با این فیلترها یافت نشد!</p>
                            <button onClick={resetFilters} className="mt-4 bg-[#FF6687] text-white px-4 py-2 rounded-lg">حذف همه فیلترها</button>
                        </div>
                    ) : (
                        sortedProducts.map((product) => (
                            <Link href={`/productDetails/${product.slug}`} key={product.id}>
                                <div className='bg-[#FFF8FD] w-full max-w-[239px] h-[320px] rounded-[16px] mx-auto mb-10 cursor-pointer'>
                                  <div className="flex justify-center pt-2">
                                    <Image src={product.image} width={220} height={223} alt='image' />
                                  </div>
                                  <h2 className='text-right p-2 text-[#2D2728] text-[14px]'>{product.name}</h2>
                                  <div className='flex justify-between'>
                                    <div className='pr-2 pt-2'>
                                      <Image src="/logo-favorite-products/logo-shop.png" width={28} height={28} alt='logo' />
                                    </div>
                                    <div className='pl-5'>
                                      <h2 className='text-[14px]'>ت {formatNumberToPersian(product.price)}</h2>
                                    </div>
                                  </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Shop