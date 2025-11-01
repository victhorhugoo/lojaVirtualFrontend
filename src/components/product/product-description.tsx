'use client'

import { useState } from "react";
import Image from 'next/image';

type Props = {
    text: string;
}

export const ProductDescription = ({ text }: Props) => {
    const [opened, setOpened] = useState(false);
    return (
        <div className="bg-gray-300 border border-gray-200 px-6 md:px-12 rounded-2xl mt-14">
            <div className={`flex justify-between items-center py-7  ${opened ? 'border-b' : 'border-b-0'} border-gray-500`}>
                <div className="text-2xl text-gray-800">informação do produto</div>
                <div 
                    className={`size-14 cursor-pointer border border-gray-500 flex justify-center items-center rounded-2xl`}
                    onClick={() => setOpened(!opened)}>
                    <Image 
                        src={'/assets/ui/arrow-left-s-line.png'}
                        alt=''
                        width={24}
                        height={24}
                        className={`${opened ? 'rotate-0' : 'rotate-180'} transition-all`}
                    />
                </div>
            </div>
            {opened &&
                <div className="text-gray-800 my-8">
                    {text}
                </div>
            }
        </div>
    );
}