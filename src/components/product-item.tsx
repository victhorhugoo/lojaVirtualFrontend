'use client'

import { Product } from '@/types/product';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    data: Product;
}

export const ProductItem = ({ data }: Props) => {
    const [liked, setLiked] = useState(data.liked);
    const link = `/product/${data.id}`;
    const toggleLiked = () => {
        setLiked(!liked);
    }
    return (
        <div className='bg-gray-500 border border-gray-600 rounded-sm p-6'>
            <div className='flex justify-end'>
                <div onClick={toggleLiked} className='bg-gray-200/30 cursor-pointer size-10 border border-gray-200 rounded-sm  flex justify-center items-center '>
                    {liked &&
                        <Image 
                            src={'/assets/ui/heart-3-fill.png'}
                            alt="like"
                            width={32}
                            height={32}
                        />
                    }
                    {!liked &&
                        <Image 
                            src={'/assets/ui/heart-3-line.png'}
                            alt='like'
                            width={32}
                            height={32}
                        />
                    }
                </div>
            </div>
            <div className='flex justify-center'>
                <Link href={link}>
                    <Image
                        src={data.image}
                        alt={data.label}
                        width={200}
                        height={200}
                        className='max-w-full h-48'
                    />
                </Link>
            </div>
            <div className='mt-9 text-lg font-bold'><Link href={link}>{data.label}</Link></div>
            <div className='mt-3 text-2xl font-bold text-blue-800'>R$ <Link href={link}>{data.price.toFixed(2)}</Link></div>
            <div className='mt-5 font-bold text-gray-800'>Em até 12x no cartão</div>
        </div>
    );
}