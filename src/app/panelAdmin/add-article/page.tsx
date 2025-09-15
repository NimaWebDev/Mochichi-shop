'use client'

import { useState } from 'react'
import { supabase } from '@/app/lib/supabase'

const AddArticle = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    slug: '',
    content: '',
    content_2: ''
  })

  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      // ایجاد پیش‌نمایش تصویر
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(objectUrl)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    let imageUrl = null

    // 🔹 اگر فایلی انتخاب شده باشه، میره توی Storage
    if (file) {
      try {
        const fileName = `${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('image-article')
          .upload(fileName, file)

        if (uploadError) {
          setMessage(`❌ خطا در آپلود عکس: ${uploadError.message}`)
          setIsLoading(false)
          return
        }

        const { data } = supabase.storage.from('image-article').getPublicUrl(fileName)
        imageUrl = data.publicUrl
      } catch (error) {
        setMessage('❌ خطا در آپلود تصویر')
        setIsLoading(false)
        return
      }
    }

    // 🔹 ذخیره در جدول articles
    try {
      const { error } = await supabase.from('article').insert([
        {
          name: form.name,
          image: imageUrl,
          category: form.category,
          slug: form.slug,
          content: form.content,
          content_2: form.content_2,
          created_at: new Date().toISOString()
        }
      ])

      if (error) {
        setMessage(`❌ خطا: ${error.message}`)
      } else {
        setMessage('✅ مقاله با موفقیت اضافه شد!')
        setForm({
          name: '',
          category: '',
          slug: '',
          content: '',
          content_2: ''
        })
        setFile(null)
        setPreviewUrl(null)
      }
    } catch (error) {
      setMessage('❌ خطا در ثبت مقاله. لطفا سیاست های امنیتی Supabase را بررسی کنید.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">افزودن مقاله جدید</h2>
          <p className="text-gray-500 mt-2">اطلاعات مقاله جدید را در فرم زیر وارد کنید</p>
          
          {/* راهنمای خطا */}
          {message && message.includes('row-level security policy') && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
              <p className="font-medium">مشکل دسترسی شناسایی شد</p>
              <p className="text-sm">لطفا سیاست های امنیتی Supabase را برای جدول articles بررسی کنید.</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* بخش آپلود تصویر */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تصویر مقاله</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">برای آپلود کلیک کنید</span></p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (حداکثر 5MB)</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  required 
                />
              </label>
            </div>
          </div>

          {/* فیلدهای اصلی */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: 'name', placeholder: 'عنوان مقاله', type: 'text' },
              { name: 'slug', placeholder: 'اسلاگ مقاله', type: 'text' },
              { name: 'category', placeholder: 'دسته‌بندی', type: 'select', options: ['تکنولوژی', 'سلامتی', 'آموزشی', 'سبک زندگی', 'سفر', 'دیگر'] },
            ].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">{field.placeholder}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {field.options?.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                    required
                  />
                )}
              </div>
            ))}
          </div>

          {/* محتوای اصلی */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">محتوای اصلی</label>
            <textarea
              name="content"
              placeholder="محتوای اصلی مقاله را اینجا بنویسید..."
              value={form.content}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all resize-none"
              rows={6}
              required
            />
          </div>

          {/* محتوای دوم */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">محتوای تکمیلی</label>
            <textarea
              name="content_2"
              placeholder="محتوای تکمیلی مقاله را اینجا بنویسید..."
              value={form.content_2}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all resize-none"
              rows={6}
            />
          </div>

          {/* دکمه ثبت */}
          <div className="mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال پردازش...
                </>
              ) : (
                'ثبت مقاله'
              )}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-6 p-3 rounded-lg text-center ${message.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddArticle