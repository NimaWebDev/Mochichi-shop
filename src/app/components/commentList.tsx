'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Image from 'next/image';

interface Comment {
  id: string;
  user_name: string;
  content: string;
  created_at: string;
}

interface CommentListProps {
  productSlug: string;
}

export default function CommentList({ productSlug }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('id, user_name, content, created_at')
        .eq('product_slug', productSlug)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }

      setLoading(false);
    };

    fetchComments();
  }, [productSlug]);

  if (loading) return <p className="mt-4 text-sm text-gray-500">در حال دریافت نظرات...</p>;

  if (comments.length === 0)
    return <p className="mt-30 lg:mt-20 text-lg text-red-600 font-bold italic text-center">هنوز نظری ثبت نشده است.</p>;

  return (
    <div className="mt-30 mr-5 lg:mr-0 lg:mt-20">
        <div className='flex gap-2'>
            <Image src="/logo-comment/message-text.png" width={24} height={24} alt='logo'></Image>
            <h2>دیدگاه های کاربران</h2>
        </div>
        {comments.map((comment)=>(
            <div key={comment.id} className='w-[342px] lg:w-[1312px] h-[320px] lg:h-[212px] bg-[#E7E7E7] rounded-[24px] mt-5'>
                <div className='flex gap-3 p-5'>
                    <Image src="/logo-comment/icons8-user-16.png" width={38} height={38} alt='logo-user'></Image>
                    <span className='text-[#100E0C] text-[16px] font-bold pt-1.5'>{comment.user_name}</span>
                    <p className='text-[#929292] text-[12px] pt-2'>
                        {new Date(comment.created_at).toLocaleDateString('fa-IR')}
                    </p>
                </div>
                <div className='p-5 text-[#100E0C] text-[16px]'>
                    <p>{comment.content}</p>
                </div>
            </div>
        ))}
    </div>
  );
}
