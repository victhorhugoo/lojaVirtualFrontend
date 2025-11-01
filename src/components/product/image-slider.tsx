'use client'

import { useState } from "react";
import Image from 'next/image';

type Props ={
    images: string[]
}

export const ImageSlider = ({ images }: Props) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const handleThumbnailClick = (index: number) => {
        setSelectedImageIndex(index);
    }
    return (
        <div className="max-w-sm mx-auto md:mx-0">
            <div className="border-2 border-gray-200 rounded-2xl bg-gray-800 p-10">
                <Image 
                    src={images[selectedImageIndex]}
                    alt=''
                    width={380}
                    height={380}
                    className="max-w-full "
                />
            </div>
            <div className="mt-8 grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div 
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`cursor-pointer border-2 rounded-2xl p-2  bg-gray-800 ${index === selectedImageIndex ? 'border-blue-500' : 'border-gray-300'} `}
                    >
                        <Image 
                            src={image}
                            alt=''
                            width={120}
                            height={120}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}