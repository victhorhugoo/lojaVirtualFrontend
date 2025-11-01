'use client'

import { useState } from "react";
import { FilterItem } from "./filter-item";
import Image from 'next/image';

type Props = { 
    id: string;
    name: string;
}

export const FilterGroup = ({ id, name }: Props) => {
    const [opened, setOpened] = useState(true);
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center border-b border-b-gray-500 pb-4">
                <div className="flex-1 font-bold text-xl">{name}</div>
                <div onClick={() => setOpened(!opened)} className="size-8 flex justify-center items-center cursor-pointer">
                    <Image 
                        src={'/assets/ui/arrow-left-s-line.png'}
                        alt=''
                        width={24}
                        height={24}
                        className={opened ? 'rotate-0' : 'rotate-180'}
                    />
                </div>
            </div>
            <div className={` flex flex-col overflow-y-hidden ${opened ? 'max-h-96' : 'max-h-0'} transition-all duration-250 delay-200`}>
                <FilterItem groupId={id} item={{ id: 'node', label: 'NodeJS'}}/>
                <FilterItem groupId={id} item={{ id: 'react', label: 'React'}}/>
                <FilterItem groupId={id} item={{ id: 'rn', label: 'React Native'}}/>
                
            </div>
        </div>
    );
}