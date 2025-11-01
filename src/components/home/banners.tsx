'use client'

import { Banner } from '@/types/banner';
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    list: Banner[];
}

let bannerTimer: NodeJS.Timeout;
let bannerTime = 4000;

export const Banners = ({ list }: Props) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage(currentImage => {
            if (currentImage + 1 >= list.length) {
                return 0;
            } else {
                return currentImage + 1;
            }
        });
    }

    const handleBannerclick = (index: number ) => {
        setCurrentImage(index);
        clearInterval(bannerTimer);
        bannerTimer = setInterval(nextImage, bannerTime);
    }

    useEffect(() => {
        bannerTimer = setInterval(nextImage, bannerTime);
        return () => clearInterval(bannerTimer);

    }, [])

    return (
        <div>
            <div className='relative aspect-[3/1]'>
                {list.map((banner, index) => (
                    <Link 
                        href={''} 
                        key={index}
                        className='transition-all absolute inset-0'
                        style={{ opacity: currentImage === index ? 1 : 0 }}
                    >
                        <Image
                            src={banner.img}
                            alt=''
                            width={1200}
                            height={400}
                            className='rounded-sm '
                        />             
                    </Link>
                ))}
            </div>
            <div className='mt-4 flex justify-center gap-4 cursor-pointer'>
                {list.map((banner, index) => (
                    <div key={index} className='size-4 bg-blue-600 rounded-full' style={{ opacity: currentImage === index ? 1 : 0.3 }} onClick={() => handleBannerclick(index)}>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}