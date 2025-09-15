'use client'

import React from 'react'
import Image from 'next/image'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

function ContactUs() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string) => {
        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        
        if (value === '') {
        } else if (!validateEmail(value)) {
            setEmailError('لطفا یک ایمیل معتبر وارد کنید');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (email === '') {
            return;
        } else if (!validateEmail(email)) {
            setEmailError('لطفا یک ایمیل معتبر وارد کنید');
            return;
        }
        
        setLoading(true);
        setSuccess(false);

        const { error } = await supabase.from('contact_us').insert([
            {
                user_name: userName,
                email: email,
                subject: subject,
                message: message,
            }
        ]);

        setLoading(false);

        if (error) {
            console.error('Error adding comment:', error);
            return;
        }

        setSuccess(true);
        setUserName('');
        setEmail('');
        setSubject('');
        setMessage('');

        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    }

    return (
        <form onSubmit={handleSubmit} className='md:flex w-[342px] h-[1110px] md:w-[1306px] md:h-[653px] bg-[#FFF0F7] rounded-[32px] ml-auto mr-auto mt-20'>
            <div className='w-[320px] md:w-[374px] mt-10 m-5 md:mr-20'>
                <h1 className='text-[#2D2728] pt-5 md:pt-0 text-[20px] md:text-[32px] font-bold'>راه ارتباطی با موچیچی <span className='font-normal'>شاپ</span></h1>
                <p className='text-[#383838] text-[14px] md:text-[16px] leading-[24px] mt-5'>از اینکه با ما در ارتباط هستید سپاسگزاریم لطفا از یکی از روش های زیر با ما تماس بگیرید یا از طریق فرم تماس پیغام حود را ارسال کنید.</p>
                <div className='flex w-[320px] md:w-[374px] h-[56px] rounded-[56px] gap-5 mt-10'>
                    <Image className='w-[24px] h-[24px] mt-3.5 mr-2' src="/logo-contact-us/call-calling.png" width={24} height={24} alt='logo'></Image>
                    <span className='text-[#30303D] text-[16px] pt-3.5'>پشتیبانی تلفنی : 321-123-021</span>
                </div>
                <div className='bg-[#EC6880] flex w-[310px] md:w-[374px] h-[56px] rounded-[56px] gap-5 mt-10'>
                    <Image className='w-[24px] h-[24px] mt-3.5 mr-2' src="/logo-contact-us/sms.png" width={24} height={24} alt='logo'></Image>
                    <span className='text-white text-[16px] pt-3.5'>ایمیل : shikland@info.com </span>
                </div>
                <div className='flex w-[320px] md:w-[374px] h-[56px] rounded-[56px] gap-5 mt-10'>
                    <Image className='w-[24px] h-[24px] mt-3.5 mr-2' src="/logo-contact-us/location.png" width={24} height={24} alt='logo'></Image>
                    <span className='text-[#30303D] text-[16px] pt-3.5'>آدرس : ایران ، تهران ، خیابان زعفرانیه </span>
                </div>
            </div>
            <div className='w-[342px] md:w-[724px] h-[525px] mt-10 ml-20'>
                <div className='mr-5 md:mr-0 md:flex gap-5'>
                    <div className='mt-5 md:mt-0'>
                        <h3 className='text-[#2D2728] text-[14px] font-medium mr-3'>ایمیل</h3>
                        <input 
                            value={email} 
                            onChange={handleEmailChange} 
                            className='w-[310px] md:w-[348px] h-[48px] rounded-[48px] bg-[#FFFAFB] pr-3 text-[#5C5045] text-[12px] mt-2' 
                            placeholder='مثلا ali1234@gmail.com' 
                            type='email'
                        />
                        {emailError && <p className="text-red-500 text-xs mt-1 mr-2">{emailError}</p>}
                    </div>
                    <div className='mt-5 md:mt-0'>
                        <h3 className='text-[#2D2728] text-[14px] font-medium mr-3'>نام و نام خانوادگی</h3>
                        <input 
                            value={userName} 
                            onChange={(e) => { setUserName(e.target.value) }} 
                            className='w-[310px] md:w-[348px] h-[48px] rounded-[48px] bg-[#FFFAFB] pr-3 text-[#5C5045] text-[12px] mt-2' 
                            placeholder='مثلا حسین علیمردانی' 
                            type='text'
                        />
                    </div>
                </div>
                <div className='mr-5 md:mr-0'>
                    <h3 className='text-[#2D2728] text-[14px] font-medium mt-5 md:mt-10 mr-3'>موضوع</h3>
                    <input 
                        value={subject} 
                        onChange={(e) => { setSubject(e.target.value) }} 
                        className='w-[310px] md:w-[348px] h-[48px] rounded-[48px] bg-[#FFFAFB] pr-3 text-[#5C5045] text-[12px] mt-2' 
                        placeholder='موضوع' 
                        type='text'
                    />
                </div>
                <div className='mr-5 md:mr-0'>
                    <h3 className='text-[#2D2728] text-[14px] font-medium mr-3 mt-5 mb-2'>پیام شما</h3>
                    <textarea 
                        value={message} 
                        onChange={(e) => { setMessage(e.target.value) }} 
                        className='w-[310px] md:w-[724px] h-[202px] rounded-[16px] bg-[#FFFAFB] p-3 text-[#5C5045] text-[12px]' 
                        placeholder='پیام خود را بنویسید...'
                    />
                </div>
                <button 
                    type='submit' 
                    disabled={loading || emailError !== ''} 
                    className={`w-[224px] h-[48px] rounded-[40px] text-white text-[16px] cursor-pointer mr-14 md:mr-0 mt-5 transition-all 
                        ${loading || emailError !== '' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#EC6880] hover:bg-green-500'}`}
                >
                    {loading ? 'در حال ارسال ...' : 'ارسال پیام'}
                </button>
                {success && <p className="text-green-600 mt-10 text-center">✅ پیام شما ثبت شد</p>}
            </div>
        </form>
    )
}

export default ContactUs